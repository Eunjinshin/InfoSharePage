import React from 'react';
import '../../styles/main/MainPopularPosts.css';
import { PostContentCards } from '../common/PostContentCards';
import { POPULAR_POSTS, MAIN_TEXT } from '../../constants/Texts';
import { getPopularPostsApi } from '../../api/getApiList';
import { useFetch } from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

export const MainPopularPosts: React.FC = () => {
    // API 연동: 인기 게시글(조회수 내림차순)을 가져옵니다.
    const { data: popularPosts, isLoading, error } = useFetch(getPopularPostsApi);

    if (isLoading) return <div>{MAIN_TEXT.LOADING}</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="popular-posts-container">
            <div className="popular-posts-header">
                <h2 className="popular-title">
                    {POPULAR_POSTS.SECTION_TITLE}
                </h2>
                <Link to="/board" className="popular-view-all">
                    {POPULAR_POSTS.VIEW_ALL}
                </Link>
            </div>

            <PostContentCards
                postCards={popularPosts || []}
            />

        </div>
    );
};
