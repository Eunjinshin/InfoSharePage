import React from 'react';
import '../../styles/Detail/DetailPost.css';
import '../../styles/components/CategoryTags.css';
import { DetailPostButton } from './DetailPostButton';
import { DetailPostAuthorActions } from './DetailPostAuthorActions';
import { DETAIL_ICONS } from '../../constants/Icons';
import { DETAIL_POST, MAIN_TEXT } from '../../constants/Texts';
import { getPostDetailApi } from '../../api/getApiList';
import { Avatar } from '../common/Avatar';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { BreadcrumbNavigation } from '../common/BreadcrumbNavigation';
import { BREADCRUMB_NAV } from '../../constants/Texts';

interface Author {
    name: string;
    avatar: string;
}

export interface PostDetailData {
    id?: number;
    title: string;
    category: string;
    author: Author;
    publishedAt: string;
    views: string;
    commentCount: number;
    likeCount?: number;   // 게시글 좋아요 수 (백엔드에서 수신)
    liked?: boolean;      // 현재 사용자의 좋아요 여부 (백엔드에서 수신)
    content: string;
    tags?: string[];      // 게시글 태그 목록 (선택)
    isAuthor?: boolean;
}

export const DetailPost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const fetchPostDetail = React.useCallback(async (id: number) => {
        if (!id) throw new Error('Post ID is missing');
        return getPostDetailApi(id);
    }, []);

    const {
        data: post,
        isLoading,
        error
    } = useFetch<PostDetailData>(
        fetchPostDetail,
        postId ? Number(postId) : 0
    );


    // 데이터를 불러오는 중일 때의 UI 처리
    if (isLoading) {
        return <div>{MAIN_TEXT.LOADING}</div>;
    }

    // 에러가 발생했을 때의 UI 처리
    if (error) {
        return <div>{error}</div>;
    }

    // 게시글 데이터가 없는 경우의 UI 처리 (post가 null인 경우 방지)
    if (!post) {
        return null;
    }

    return (
        <>
            <BreadcrumbNavigation
                paths={[
                    { name: BREADCRUMB_NAV.CATEGORIES, url: '/categories' },
                    { 
                        name: post.category || 'Free', 
                        url: `/board?category=${encodeURIComponent(post.category || 'Free')}` 
                    },
                    { name: BREADCRUMB_NAV.POST_DETAIL }
                ]}
            />
            <article className="detail-post-article">
                <div className="detail-post-content">
                    <h1 className="detail-post-title">
                        {post.title}
                    </h1>

                    <div className="detail-post-meta-container">
                        <div className="detail-post-author-box">
                            <div className="detail-post-avatar">
                                <Avatar src={post.author.avatar} alt={`${post.author.name} avatar`} iconSize="24px" />
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
                            {/* 좋아요 수: 백엔드에서 받은 초기값 표시 */}
                            <div className="detail-post-stat-item">
                                <span className="material-symbols-outlined">
                                    {DETAIL_ICONS.LIKE}
                                </span>
                                <span>{post.likeCount ?? 0}</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className="detail-post-body"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* 태그 목록: 본문 아래 별도 섹션으로 표시 */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="detail-post-tags-section">
                            <div className="detail-post-tags-label">
                                <span className="material-symbols-outlined">
                                    label
                                </span>
                                <span className="detail-post-tags-label-text">
                                    Tags
                                </span>
                            </div>
                            <div className="category-tags-container detail-post-tags-chips">
                                {post.tags.map((tag, idx) => (
                                    <div key={idx} className="category-tag">
                                        #{tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <DetailPostButton 
                        post={post} 
                        initialLikeCount={post.likeCount ?? 0} 
                        initialLiked={post.liked ?? false} 
                    />
                    {post.isAuthor !== false && (
                        <DetailPostAuthorActions postId={post.id || postId} />
                    )}
                </div>
            </article>
        </>
    );
};
