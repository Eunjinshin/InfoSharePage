import React from 'react';
import '../../styles/Main/LatestPosts.css';
import { LATEST_POSTS } from '../../constants/MainText';
import { PostContentList } from '../common/PostContentList';
import { MAIN_TEXT_TEST } from '../../tests/Mainpagedata';

export const LatestPosts: React.FC = () => {
    return (
        <div className="latest-posts-container">
            <div className="latest-posts-header">
                <h2 className="latest-title">{LATEST_POSTS.SECTION_TITLE}</h2>
            </div>

            <PostContentList
                postList={MAIN_TEXT_TEST.LATEST_POSTS.POSTS}
            />
        </div>
    );
};
