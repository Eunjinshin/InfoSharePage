import React from 'react';
import '../styles/pages/Sidebar.css';
import { GuideCard } from '../components/common/GuideCard';
import { ContributorsList } from '../components/common/ContributorsList';
import { CommunityStats } from '../components/common/CommunityStats';

export const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar-container">

            <CommunityStats />

            <ContributorsList />

            <GuideCard />

        </aside>
    );
};
