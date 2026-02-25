import React from 'react';
import '../../styles/Main/Sidebar.css';
import { GuideCard } from '../common/GuideCard';
import { ContributorsList } from '../common/ContributorsList';
import { CommunityStats } from '../common/CommunityStats';

export const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar-container">

            <CommunityStats />

            <ContributorsList />

            <GuideCard />

        </aside>
    );
};
