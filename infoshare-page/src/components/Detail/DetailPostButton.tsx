import React, { useState } from 'react';
import { DETAIL_ICONS } from "../../constants/Icons";
import { DETAIL_POST } from "../../constants/Texts";
import '../../styles/Detail/DetailPostButton.css';
import { ALERT_FAIL } from '../../constants/AlertText';

interface PostDetailData {
    id?: number; // 게시글 ID (API 호출용)
    views: string;
    commentCount: number;
}

interface DetailPostButtonProps {
    post: PostDetailData;
}

export const DetailPostButton = ({ post }: DetailPostButtonProps) => {
    // 1. 상태 관리: 서버에서 받아온 초기 상태(좋아요, 스크랩 여부)를 세팅한다고 가정
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isScraped, setIsScraped] = useState<boolean>(false);

    // 개별 버튼들의 로딩 상태 (연타 방어용)
    const [isLikeLoading, setIsLikeLoading] = useState<boolean>(false);
    const [isScrapLoading, setIsScrapLoading] = useState<boolean>(false);
    const [isShareLoading, setIsShareLoading] = useState<boolean>(false);

    // [Like] 버튼 핸들러
    const handleLike = async () => {
        if (!post.id || isLikeLoading) return;
        setIsLikeLoading(true);

        // Optimistic Update (낙관적 UI 접근)
        setIsLiked(!isLiked);

        try {
            // TODO: [API 연동] 백엔드 좋아요 토글 처리
            // await fetch(`/api/posts/${post.id}/like`, { method: isLiked ? 'DELETE' : 'POST' });
            await new Promise(resolve => setTimeout(resolve, 300)); // API 시뮬레이션

            // 성공 시 필요한 부가 로직...
        } catch (error) {
            console.error("Failed to toggle Like:", error);
            // 에러 발생 시 UI 롤백
            setIsLiked(isLiked);
            alert(ALERT_FAIL.LIKE);
        } finally {
            setIsLikeLoading(false);
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
        <div className="detail-post-actions">
            {/* Like Button */}
            <button
                className={`detail-action-btn like-btn ${isLiked ? 'active' : ''}`}
                onClick={handleLike}
                disabled={isLikeLoading}
            >
                <span className="material-symbols-outlined"
                    style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}>
                    {DETAIL_ICONS.LIKE}
                </span>
                <span>{DETAIL_POST.LIKE}</span>
            </button>

            {/* Scrap Button */}
            <button
                className={`detail-action-btn ${isScraped ? 'active' : ''}`}
                onClick={handleScrap}
                disabled={isScrapLoading}
            >
                <span className="material-symbols-outlined"
                    style={{ fontVariationSettings: isScraped ? "'FILL' 1" : "'FILL' 0" }}>
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
    );
};