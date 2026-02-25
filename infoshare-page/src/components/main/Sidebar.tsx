import React from 'react';
import '../../styles/Main/Sidebar.css';
import { GUIDE } from '../../constants/MainText';
import { MaterialIcon } from '../../utils/MaterialIcon';
import { MAIN_TEXT_TEST } from '../../tests/Mainpagedata';

export const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar-container">
            {/* Stats Section */}
            <div className="sidebar-card">
                <h3 className="sidebar-card-title">{MAIN_TEXT_TEST.SIDEBAR.STATS_TITLE}</h3>
                <div className="sidebar-stats-grid">
                    {MAIN_TEXT_TEST.SIDEBAR.STATS.map((stat: any, index: number) => (
                        <div key={index} className="sidebar-stat-item">
                            <p className="sidebar-stat-value">{stat.value}</p>
                            <p className="sidebar-stat-label">{stat.label}</p>
                        </div>
                    ))}
                </div>
                <button className="sidebar-join-btn">
                    {MAIN_TEXT_TEST.SIDEBAR.JOIN_BTN}
                </button>
            </div>

            {/* Top Contributors Section */}
            <div className="sidebar-card">
                <h3 className="sidebar-card-title">{MAIN_TEXT_TEST.SIDEBAR.CONTRIBUTORS_TITLE}</h3>
                <div className="sidebar-contributors-list">
                    {MAIN_TEXT_TEST.SIDEBAR.CONTRIBUTORS.map((user: any, index: number) => (
                        <div key={index} className="sidebar-contributor-item">
                            <div className="sidebar-contributor-info-wrapper">
                                <div className="sidebar-contributor-avatar">
                                    <img alt={user.name} src={user.avatar} />
                                </div>
                                <div className="sidebar-contributor-info">
                                    <p className="sidebar-contributor-name">{user.name}</p>
                                    <p className="sidebar-contributor-points">{user.points}</p>
                                </div>
                            </div>
                            <MaterialIcon
                                icon="stars"
                                className="sidebar-contributor-icon"
                                style={{ opacity: user.iconOpacity }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Guide Section */}
            <div className="sidebar-guide-card">
                <h3 className="sidebar-guide-title">{GUIDE.TITLE}</h3>
                <p className="sidebar-guide-desc">{GUIDE.DESC}</p>
                <a href="#" className="sidebar-guide-link">
                    {GUIDE.LEARN_MORE}
                    <MaterialIcon icon="arrow_forward" className="sidebar-guide-link-icon" />
                </a>
            </div>
        </aside>
    );
};
