import React from 'react';
import '../../styles/Main/PopularPosts.css';
import { PostContentCards } from '../common/PostContentCards';
import { POPULAR_POSTS } from '../../constants/MainText';
import { MAIN_TEXT_TEST } from '../../tests/Mainpagedata';

export const PopularPosts: React.FC = () => {
    return (
        <div className="popular-posts-container">
            <div className="popular-posts-header">
                <h2 className="popular-title">
                    {POPULAR_POSTS.SECTION_TITLE}
                </h2>
                <a href="#" className="popular-view-all">
                    {POPULAR_POSTS.VIEW_ALL}
                </a>
            </div>

            <PostContentCards
                postCards={MAIN_TEXT_TEST.POPULAR_POSTS.POSTS}
            />

        </div>
    );
};
