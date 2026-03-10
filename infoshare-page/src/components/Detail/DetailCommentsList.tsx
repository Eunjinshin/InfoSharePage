import React, { useState } from 'react';
import '../../styles/Detail/DetailCommentsList.css';
import { COMMENT_FORM } from '../../constants/Texts';
import { COMMENT_ICONS } from '../../constants/Icons';
import { DetailCommentForm } from './DetailCommentForm';
import { DetailReComments } from './DetailReComments';
import { useMutation } from '../../hooks/useMutation';
import { deleteCommentApi } from '../../api/deleteApi';
import { toggleCommentLikeApi } from '../../api/postApiList';
import { Avatar } from '../common/Avatar';

interface Comment {
    id: number;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    timeAgo?: string;
    createdAt?: string;
    likeCount?: number;
    liked?: boolean;
    isAuthor?: boolean;
    replies?: any[];
}

interface DetailCommentsListProps {
    comments: Comment[];
    totalCount: number;
    onCommentAdded?: () => void;  // 답글/수정 등 후 목록 갱신 콜백
}

export const DetailCommentsList: React.FC<DetailCommentsListProps> = ({ comments, onCommentAdded }) => {
    // 답글달기 버튼 상태 관리
    const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

    // 좋아요 카운트 로컬 상태 (낙관적 업데이트 / 서버 응답으로 동기화)
    const [likeCounts, setLikeCounts] = useState<Record<number, number>>(
        () => Object.fromEntries(comments.map(c => [c.id, c.likeCount ?? 0]))
    );
    // 어떤 댓글에 좋아요를 눌렀는지 추적
    const [likedIds, setLikedIds] = useState<Set<number>>(
        new Set(comments.filter(c => c.liked).map(c => c.id))
    );

    // 댓글 삭제 Mutation
    const { mutate: mutateDeleteComment, isLoading: isDeleteLoading } = useMutation(deleteCommentApi);
    // 댓글 좋아요 Mutation
    const { mutate: mutateLike } = useMutation(toggleCommentLikeApi);

    const handleReplyClick = (commentId: number) => {
        setActiveReplyId(prev => prev === commentId ? null : commentId);
    };

    // 좋아요: 낙관적 업데이트 후 API 호출 → 서버 카운트로 동기화
    const handleLike = async (commentId: number) => {
        // 1. 먼저 UI에 즉시 반영
        setLikedIds(prev => {
            const next = new Set(prev);
            if (next.has(commentId)) next.delete(commentId);
            else next.add(commentId);
            return next;
        });
        try {
            const res = await mutateLike(commentId);
            // 2. 서버 응답으로 정확한 카운트 동기화
            if (res?.totalLikes !== undefined) {
                setLikeCounts(prev => ({ ...prev, [commentId]: res.totalLikes }));
            }
        } catch {
            // 3. 실패 시 낙관적 업데이트 롤백
            setLikedIds(prev => {
                const next = new Set(prev);
                if (next.has(commentId)) next.delete(commentId);
                else next.add(commentId);
                return next;
            });
        }
    };

    // confirm 창 없이 바로 삭제 처리합니다.
    const handleDelete = async (commentId: number) => {
        if (isDeleteLoading) return;
        try {
            await mutateDeleteComment(commentId);
            onCommentAdded?.(); // 삭제 후에도 목록 갱신
        } catch (error) {
            alert("댓글 삭제에 실패했습니다.");
        }
    };

    return (
        <div className="detail-comment-list">
            {comments.map((comment) => (
                <div key={comment.id} className="detail-comment-group">
                    <div className="detail-comment-item">
                        <div className="detail-comment-item-avatar">
                            <Avatar src={comment.author.avatar} alt={`${comment.author.name} avatar`} />
                        </div>
                        <div className="detail-comment-content-wrapper">
                            <div className="detail-comment-bubble">
                                <div className="detail-comment-meta">
                                    <div className="detail-comment-author-info">
                                        <span className="detail-comment-author-name">{comment.author.name}</span>
                                        {comment.isAuthor && (
                                            <span className="detail-comment-author-badge">
                                                {COMMENT_FORM.AUTHOR}
                                            </span>
                                        )}
                                    </div>
                                    <div className="detail-comment-meta-right">
                                        <span className="detail-comment-time">{comment.timeAgo || comment.createdAt}</span>
                                        {/* 작성자 본인일 경우에만 삭제 버튼 노출 */}
                                        {comment.isAuthor && (
                                            <button
                                                onClick={() => handleDelete(comment.id)}
                                                disabled={isDeleteLoading}
                                                className="detail-comment-delete-btn"
                                            >
                                                삭제
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <p className="detail-comment-text">{comment.content}</p>
                            </div>
                            <div className="detail-comment-actions">
                                {/* 좋아요: 낙관적 업데이트 + API 서버 동기화 */}
                                <button
                                    className={`detail-comment-action-btn ${likedIds.has(comment.id) ? 'liked' : ''}`}
                                    onClick={() => handleLike(comment.id)}
                                >
                                    <span
                                        className="material-symbols-outlined like-icon"
                                    >
                                        {COMMENT_ICONS.THUMB_UP}
                                    </span>
                                    <span>{likeCounts[comment.id] ?? comment.likeCount ?? 0}</span>
                                </button>
                                <button
                                    className="detail-comment-action-btn"
                                    onClick={() => handleReplyClick(comment.id)}
                                >
                                    {COMMENT_FORM.REPLY}
                                </button>
                            </div>

                            {/* 선택된 댓글의 답글 폼 렌더링 */}
                            {activeReplyId === comment.id && (
                                <div className="detail-comment-reply-form-wrap">
                                    <DetailCommentForm
                                        parentId={comment.id}
                                        onCommentAdded={onCommentAdded}
                                    />
                                </div>
                            )}

                            {/* 대댓글 목록 렌더링 */}
                            <DetailReComments replies={comment.replies} onCommentAdded={onCommentAdded} />

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};