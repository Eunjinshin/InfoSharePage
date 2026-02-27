import React from 'react';

interface CommentAuthor {
    name: string;
    avatar: string;
}

export interface CommentReply {
    id: number;
    author: CommentAuthor;
    timeAgo: string;
    content: string;
    likes: number;
    isAuthor?: boolean;
}

interface DetailReCommentsProps {
    replies?: CommentReply[];
}

export const DetailReComments: React.FC<DetailReCommentsProps> = ({ replies }) => {
    if (!replies || replies.length === 0) return null;

    return (
        <div className="detail-comment-replies">
            {replies.map((reply) => (
                <div key={reply.id} className="detail-comment-item">
                    <div className="detail-comment-item-avatar" style={{ height: '2rem', width: '2rem' }}>
                        <img alt={`${reply.author.name} avatar`} src={reply.author.avatar} />
                    </div>
                    <div className="detail-comment-content-wrapper">
                        <div className="detail-comment-bubble reply-bubble">
                            <div className="detail-comment-meta">
                                <div className="detail-comment-author-info">
                                    <span className="detail-comment-author-name">{reply.author.name}</span>
                                    {reply.isAuthor && (
                                        <span className="detail-comment-author-badge">Author</span>
                                    )}
                                </div>
                                <span className="detail-comment-time">{reply.timeAgo}</span>
                            </div>
                            <p className="detail-comment-text">{reply.content}</p>
                        </div>
                        <div className="detail-comment-actions">
                            <button className="detail-comment-action-btn">
                                <span className="material-symbols-outlined">thumb_up</span> {reply.likes}
                            </button>
                            <button className="detail-comment-action-btn">Reply</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};