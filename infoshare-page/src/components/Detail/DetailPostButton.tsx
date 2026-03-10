import { useState } from 'react';
import { DETAIL_ICONS } from "../../constants/Icons";
import { DETAIL_POST } from "../../constants/Texts";
import '../../styles/Detail/DetailPostButton.css';
import { ALERT_FAIL } from '../../constants/AlertText';
import { useMutation } from '../../hooks/useMutation';
import { togglePostLikeApi } from '../../api/postApiList';

interface PostDetailData {
    id?: number; // 게시글 ID (API 호출용)
    views: string;
    commentCount: number;
    // 임시: 이 글을 쓸 권한(본인 여부)을 파악하는 필드가 
    // 나중에 백엔드에서 내려온다고 가정 (isAuthor 등)
    // 현재는 무조건 보여지도록 하거나 테스트 목적으로 true로 둡니다.
    isAuthor?: boolean;
}

interface DetailPostButtonProps {
    post: PostDetailData;
    /** 백엔드 API에서 받은 좋아요 수 입력 (초기상태 설정용) */
    initialLikeCount?: number;
    /** 백엔드 API에서 받은 현재 사용자의 좋아요 여부 */
    initialLiked?: boolean;
}

export const DetailPostButton = ({ 
    post, 
    initialLikeCount = 0, 
    initialLiked = false 
}: DetailPostButtonProps) => {
    // 좋아요 여부 + 카운트: 초기값은 서버에서 받은 props로 설정
    const [isLiked, setIsLiked] = useState<boolean>(initialLiked);
    const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
    const [isScraped, setIsScraped] = useState<boolean>(false);

    // 개별 버튼들의 로딩 상태 (연타 방어용)
    const [isScrapLoading, setIsScrapLoading] = useState<boolean>(false);
    const [isShareLoading, setIsShareLoading] = useState<boolean>(false);

    // API Mutations
    const { mutate: mutateLike, isLoading: isLikeLoading } = useMutation(togglePostLikeApi);

    // [Like] 버튼 핸들러: 낙관적 업데이트 → API 응답으로 동기화
    const handleLike = async () => {
        if (!post.id || isLikeLoading) return;

        // 1. 즉시 UI 반영 (낙관적 업데이트)
        const nextLiked = !isLiked;
        setIsLiked(nextLiked);
        setLikeCount(prev => nextLiked ? prev + 1 : Math.max(0, prev - 1));

        try {
            const res = await mutateLike(post.id);
            // 2. 서버 응답으로 정확한 값 동기화
            setIsLiked(res?.liked ?? nextLiked);
            setLikeCount(res?.totalLikes ?? likeCount);
        } catch (error) {
            // 3. 실패 시 낙관적 업데이트 롤백
            setIsLiked(isLiked);
            setLikeCount(likeCount);
            console.error("Failed to toggle Like:", error);
            alert(ALERT_FAIL.LIKE);
        }
    };

    // [Scrap] 버튼 핸들러
    const handleScrap = async () => {
        if (!post.id || isScrapLoading) return;
        setIsScrapLoading(true);

        // Optimistic Update
        setIsScraped(!isScraped);

        try {
            // TODO: [API 연동] 백엔드 스크랩 토글 처리
            // await fetch(`/api/posts/${post.id}/scrap`, { method: isScraped ? 'DELETE' : 'POST' });
            await new Promise(resolve => setTimeout(resolve, 300));
        } catch (error) {
            console.error("Failed to toggle Scrap:", error);
            setIsScraped(isScraped);
            alert(ALERT_FAIL.SCRAP);
        } finally {
            setIsScrapLoading(false);
        }
    };

    // [Share] 버튼 핸들러
    const handleShare = async () => {
        if (isShareLoading) return;
        setIsShareLoading(true);

        try {
            // TODO: [API 연동] 공유하기 기능 구현 (클립보드 복사 등)
            // ex) navigator.clipboard.writeText(window.location.href);
            await new Promise(resolve => setTimeout(resolve, 200));
            alert(ALERT_FAIL.SHARE);
        } catch (error) {
            console.error("Failed to Share:", error);
            alert(ALERT_FAIL.SHARE);
        } finally {
            setIsShareLoading(false);
        }
    };

    return (
        <div className="detail-post-actions-wrapper">
            {/* 왼쪽 액션 버튼들 (좋아요, 스크랩, 공유) */}
            <div className="detail-post-actions">
                {/* Like Button */}
                <button
                    className={`detail-action-btn like-btn ${isLiked ? 'active' : ''}`}
                    onClick={handleLike}
                    disabled={isLikeLoading}
                >
                    <span className="material-symbols-outlined action-icon">
                        {DETAIL_ICONS.LIKE}
                    </span>
                    {/* 좋아요 수: 0이면 텍스트, 이상이면 숫자 표시 */}
                    <span>{likeCount > 0 ? likeCount : DETAIL_POST.LIKE}</span>
                </button>

                {/* Scrap Button */}
                <button
                    className={`detail-action-btn ${isScraped ? 'active' : ''}`}
                    onClick={handleScrap}
                    disabled={isScrapLoading}
                >
                    <span className="material-symbols-outlined action-icon">
                        {DETAIL_ICONS.SCRAP}
                    </span>
                    <span>{DETAIL_POST.SCRAP}</span>
                </button>

                {/* Share Button */}
                <button
                    className="detail-action-btn"
                    onClick={handleShare}
                    disabled={isShareLoading}
                >
                    <span className="material-symbols-outlined">
                        {DETAIL_ICONS.SHARE}
                    </span>
                    <span>{DETAIL_POST.SHARE}</span>
                </button>
            </div>
        </div>
    );
};