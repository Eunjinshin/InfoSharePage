import React from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { TitleBarSection } from '../components/main/TitleBarSection';
import { CategoryTags } from '../components/common/CategoryTags';
import { PopularPosts } from '../components/main/PopularPosts';
import { LatestPosts } from '../components/main/LatestPosts';
import { Sidebar } from '../components/main/Sidebar';
import '../styles/pages/MainPage.css';

export const MainPage: React.FC = () => {
    return (
        <div className="main-page">
            <Header type="main" />

            <main className="main-content-layout">
                <TitleBarSection />
                <CategoryTags />

                <div className="main-grid-layout">
                    <div className="main-left-column">
                        <PopularPosts />
                        <LatestPosts />
                    </div>
                    <Sidebar />
                </div>
            </main>

            <Footer />
        </div>
    );
};
