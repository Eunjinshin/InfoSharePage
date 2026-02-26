import React from 'react';
import '../../styles/Detail/DetailPost.css';
import { DetailPostButton } from './DetailPostButton';
import { DETAIL_ICONS } from '../../constants/Icons';
import { DETAIL_POST } from '../../constants/Texts';

interface Author {
    name: string;
    avatar: string;
}

export interface PostDetailData {
    title: string;
    category: string;
    author: Author;
    publishedAt: string;
    readTime: string;
    views: string;
    commentCount: number;
    content: string;
}

interface DetailPostProps {
    post: PostDetailData;
}

export const DetailPost: React.FC<DetailPostProps> = ({ post }) => {
    return (
        <article className="detail-post-article">
            <div className="detail-post-content">
                <h1 className="detail-post-title">
                    {post.title}
                </h1>

                <div className="detail-post-meta-container">
                    <div className="detail-post-author-box">
                        <div className="detail-post-avatar">
                            <img alt={`${post.author.name} avatar`}
                                src={post.author.avatar} />
                        </div>
                        <div>
                            <p className="detail-post-author-name">
                                {post.author.name}
                            </p>
                            <p className="detail-post-date">
                                {post.publishedAt}
                            </p>
                        </div>
                    </div>

                    <div className="detail-post-stats">
                        <div className="detail-post-stat-item">
                            <span className="material-symbols-outlined">
                                {DETAIL_ICONS.VIEW}
                            </span>
                            <span>{post.views}</span>
                        </div>
                        <div className="detail-post-stat-item">
                            <span className="material-symbols-outlined">
                                {DETAIL_ICONS.CHAT_BUBBLE}
                            </span>
                            <span>{post.commentCount} {DETAIL_POST.COMMENTS}</span>
                        </div>
                    </div>
                </div>
                <div
                    className="detail-post-body"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <DetailPostButton post={post} />
            </div>
        </article>
    );
};
