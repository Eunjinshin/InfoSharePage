import React from 'react';
import '../../styles/main/MainLatestPosts.css';
import { LATEST_POSTS, MAIN_TEXT } from '../../constants/Texts';
import { PostContentList } from '../common/PostContentList';
import { getLatestPostsApi } from '../../api/getApiList';
import { useFetch } from '../../hooks/useFetch';

export const MainLatestPosts: React.FC = () => {
    // API 연동: 최신 게시글(작성일 내림차순)을 가져옵니다.
    const { data: latestPosts, isLoading, error } = useFetch(getLatestPostsApi);

    if (isLoading) return <div>{MAIN_TEXT.LOADING}</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="latest-posts-container">
            <div className="latest-posts-header">
                <h2 className="latest-title">{LATEST_POSTS.SECTION_TITLE}</h2>
            </div>

            <PostContentList
                postList={latestPosts || []}
            />
        </div>
    );
};
