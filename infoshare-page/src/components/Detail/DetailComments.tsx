import React from 'react';
import '../../styles/Detail/DetailComments.css';
import { DetailCommentForm } from './DetailCommentForm';
import { DetailCommentsList } from './DetailCommentsList';
import { COMMENT_FORM } from '../../constants/Texts';


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
    isAuthor: boolean;
}

export interface CommentData {
    id: number;
    author: CommentAuthor;
    timeAgo: string;
    content: string;
    likes: number;
    isAuthor: boolean;
    replies: CommentReply[];
}

interface DetailCommentsProps {
    comments: CommentData[];
    totalCount: number;
}

export const DetailComments: React.FC<DetailCommentsProps> = ({ comments, totalCount }) => {
    return (
        <section className="detail-comments-section">
            <div className="detail-comments-header">
                <h3 className="detail-comments-title">Comments</h3>
                <span className="detail-comments-count">{totalCount}</span>
            </div>

            {/* 댓글 작성 폼 */}
            <DetailCommentForm />

            {/* 댓글 목록 */}
            <DetailCommentsList
                comments={comments}
                totalCount={totalCount}
            />

            {/* 댓글 더보기 버튼 */}
            {comments.length > 0 && (
                <div className="detail-comment-load-more">
                    <button className="detail-comment-load-btn">
                        {COMMENT_FORM.LOAD_MORE}
                    </button>
                </div>
            )}
        </section>
    );
};
