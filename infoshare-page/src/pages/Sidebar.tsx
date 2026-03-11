import React from 'react';
import '../styles/pages/Sidebar.css';
import { GuideCard } from '../components/common/GuideCard';
import { CommunityStats } from '../components/common/CommunityStats';

export const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar-container">

            <CommunityStats />

            <GuideCard />

        </aside>
    );
};
