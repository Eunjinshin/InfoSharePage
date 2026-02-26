import React from 'react';
import { MainTitleBarSection } from '../components/main/MainTitleBarSection';
import { CategoryTags } from '../components/common/CategoryTags';
import { MainPopularPosts } from '../components/main/MainPopularPosts';
import { MainLatestPosts } from '../components/main/MainLatestPosts';
import { Sidebar } from './Sidebar';
import '../styles/pages/MainPage.css';

export const MainPage: React.FC = () => {
    return (
        <main className="main-content-layout">
            <MainTitleBarSection />
            <CategoryTags />

            <div className="main-grid-layout">
                <div className="main-left-column">
                    <MainPopularPosts />
                    <MainLatestPosts />
                </div>
                <Sidebar />
            </div>
        </main>
    );
};
