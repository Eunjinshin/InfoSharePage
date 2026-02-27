import React, { useState } from 'react';
import '../../styles/Detail/DetailCommentsList.css';
import { COMMENT_FORM } from '../../constants/Texts';
import { COMMENT_ICONS } from '../../constants/Icons';
import { DetailCommentForm } from './DetailCommentForm';
import { DetailReComments } from './DetailReComments';

interface Comment {
    id: number;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    timeAgo: string;
    likes: number;
    isAuthor?: boolean;
    replies?: any[]; // DetailReCommentsProps와 맞춤
}

interface DetailCommentsListProps {
    comments: Comment[];
    totalCount: number;
}

export const DetailCommentsList: React.FC<DetailCommentsListProps> = ({ comments }) => {
    // 답글달기 버튼 상태 관리
    const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

    const handleReplyClick = (commentId: number) => {
        // 이미 폼이 열려있으면 닫고, 아니면 해당 ID로 열기
        setActiveReplyId(prev => prev === commentId ? null : commentId);
    };

    return (
        <div className="detail-comment-list">
            {comments.map((comment) => (
                <div key={comment.id} className="detail-comment-group">
                    <div className="detail-comment-item">
                        <div className="detail-comment-item-avatar">
                            <img alt={`${comment.author.name} avatar`} src={comment.author.avatar} />
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
                                    <span className="detail-comment-time">{comment.timeAgo}</span>
                                </div>
                                <p className="detail-comment-text">{comment.content}</p>
                            </div>
                            <div className="detail-comment-actions">
                                <button className="detail-comment-action-btn">
                                    <span className="material-symbols-outlined">
                                        {COMMENT_ICONS.THUMB_UP}
                                    </span>
                                    {comment.likes}
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
                                <div style={{ marginTop: '1rem' }}>
                                    <DetailCommentForm />
                                </div>
                            )}

                            {/* 대댓글 목록 렌더링 */}
                            <DetailReComments replies={comment.replies} />

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};