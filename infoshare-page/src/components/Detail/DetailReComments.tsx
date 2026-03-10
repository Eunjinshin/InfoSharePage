import React, { useState } from 'react';
import '../../styles/Detail/DetailCommentsList.css'; // 댓글 공통 스타일 (아바타, 버블, 액션 버튼 등)
import { COMMENT_FORM, DETAIL_AUTHOR_ACTIONS } from '../../constants/Texts';
import { COMMENT_ICONS } from '../../constants/Icons';
import { Avatar } from '../common/Avatar';
import { DetailCommentForm } from './DetailCommentForm';
import { useMutation } from '../../hooks/useMutation';
import { deleteCommentApi } from '../../api/deleteApi';
import { toggleCommentLikeApi } from '../../api/postApiList';

// 답글 작성자 타입
interface CommentAuthor {
    name: string;
    avatar: string;
}

export interface CommentReply {
    id: number;
    author: CommentAuthor;
    timeAgo?: string;
    createdAt?: string;
    content: string;
    likeCount?: number;
    liked?: boolean;
    isAuthor?: boolean;
    // 재귀 구조: 답글의 답글도 replies로 받을 수 있음
    replies?: CommentReply[];
}

interface DetailReCommentsProps {
    replies?: CommentReply[];
    onCommentAdded?: () => void; // 답글 추가/삭제 후 상위 목록 갱신 콜백
}

export const DetailReComments: React.FC<DetailReCommentsProps> = ({ replies, onCommentAdded }) => {
    // 어떤 답글에 "답글달기" 폼이 열려있는지 추적
    const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

    // 서버 응답으로 덮어쓴 좋아요 카운트만 저장 (초기값은 서버에서 온 likeCount)
    const [likeOverrides, setLikeOverrides] = useState<Record<number, number>>({});
    // 좋아요 누른 답글 ID 추적
    const [likedIds, setLikedIds] = useState<Set<number>>(
        new Set(replies?.filter(r => r.liked).map(r => r.id) || [])
    );

    // 댓글 삭제 Mutation
    const { mutate: mutateDelete, isLoading: isDeleteLoading } = useMutation(deleteCommentApi);
    // 좋아요 Mutation
    const { mutate: mutateLike } = useMutation(toggleCommentLikeApi);

    if (!replies || replies.length === 0) return null;

    // 답글달기 버튼 토글
    const handleReplyClick = (replyId: number) => {
        setActiveReplyId(prev => prev === replyId ? null : replyId);
    };

    // 좋아요: 낙관적 업데이트 → API 호출 → 서버 카운트로 동기화
    const handleLike = async (replyId: number, currentLikes: number) => {
        const isLiked = likedIds.has(replyId);

        // 1. UI 즉시 반영 (likedIds + 카운트 동시 낙관적 업데이트)
        setLikedIds(prev => {
            const next = new Set(prev);
            if (isLiked) next.delete(replyId);
            else next.add(replyId);
            return next;
        });
        setLikeOverrides(prev => ({
            ...prev,
            [replyId]: isLiked ? currentLikes - 1 : currentLikes + 1,
        }));

        try {
            const res = await mutateLike(replyId);
            // 2. 서버 응답으로 정확한 카운트 동기화
            if (res?.totalLikes !== undefined) {
                setLikeOverrides(prev => ({ ...prev, [replyId]: res.totalLikes }));
            }
        } catch {
            // 3. 실패 시 낙관적 업데이트 롤백
            setLikedIds(prev => {
                const next = new Set(prev);
                if (isLiked) next.add(replyId);
                else next.delete(replyId);
                return next;
            });
            setLikeOverrides(prev => ({ ...prev, [replyId]: currentLikes }));
        }
    };

    // 삭제 처리
    const handleDelete = async (replyId: number) => {
        if (isDeleteLoading) return;
        try {
            await mutateDelete(replyId);
            onCommentAdded?.(); // 삭제 후 상위 목록 갱신
        } catch {
            alert('답글 삭제에 실패했습니다.');
        }
    };

    return (
        <div className="detail-comment-replies">
            {replies.map((reply) => (
                <div key={reply.id} className="detail-comment-group">
                    <div className="detail-comment-item">
                        {/* 아바타 */}
                        <div className="detail-comment-item-avatar">
                            <Avatar src={reply.author.avatar} alt={`${reply.author.name} avatar`} />
                        </div>

                        <div className="detail-comment-content-wrapper">
                            {/* 말풍선 영역 */}
                            <div className="detail-comment-bubble reply-bubble">
                                <div className="detail-comment-meta">
                                    <div className="detail-comment-author-info">
                                        <span className="detail-comment-author-name">{reply.author.name}</span>
                                        {/* 작성자 배지 */}
                                        {reply.isAuthor && (
                                            <span className="detail-comment-author-badge">
                                                {COMMENT_FORM.AUTHOR}
                                            </span>
                                        )}
                                    </div>
                                    <div className="detail-comment-meta-right">
                                        <span className="detail-comment-time">{reply.timeAgo || reply.createdAt}</span>
                                        {/* 작성자 본인일 경우에만 삭제 버튼 노출 */}
                                        {reply.isAuthor && (
                                            <button
                                                onClick={() => handleDelete(reply.id)}
                                                disabled={isDeleteLoading}
                                                className="detail-comment-delete-btn"
                                            >
                                                {DETAIL_AUTHOR_ACTIONS.DELETE}
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <p className="detail-comment-text">{reply.content}</p>
                            </div>

                            {/* 액션 버튼 영역: 좋아요 + 답글달기 */}
                            <div className="detail-comment-actions">
                                {/* 좋아요: 낙관적 업데이트 + API 서버 동기화 */}
                                <button
                                    className={`detail-comment-action-btn ${likedIds.has(reply.id) ? 'liked' : ''}`}
                                    onClick={() => handleLike(reply.id, likeOverrides[reply.id] ?? reply.likeCount ?? 0)}
                                >
                                    <span
                                        className="material-symbols-outlined like-icon"
                                    >
                                        {COMMENT_ICONS.THUMB_UP}
                                    </span>
                                    {/* override 있으면 서버값, 없으면 prop의 원본 likeCount 표시 (NaN 방지로 0 fallback) */}
                                    <span>{likeOverrides[reply.id] ?? reply.likeCount ?? 0}</span>
                                </button>

                                {/* 답글달기 버튼 (계속 reply 달 수 있음) */}
                                <button
                                    className="detail-comment-action-btn"
                                    onClick={() => handleReplyClick(reply.id)}
                                >
                                    {COMMENT_FORM.REPLY}
                                </button>
                            </div>

                            {/* 답글달기 폼 (선택된 답글 아래에만 렌더링) */}
                            {activeReplyId === reply.id && (
                                <div className="detail-comment-reply-form-wrap">
                                    <DetailCommentForm
                                        parentId={reply.id}
                                        onCommentAdded={() => {
                                            setActiveReplyId(null); // 폼 닫기
                                            onCommentAdded?.();     // 목록 갱신
                                        }}
                                    />
                                </div>
                            )}

                            {/* 재귀: 답글의 답글도 렌더링 */}
                            <DetailReComments
                                replies={reply.replies}
                                onCommentAdded={onCommentAdded}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};