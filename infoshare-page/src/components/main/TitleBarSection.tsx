import React from 'react';
import '../../styles/Main/TitleBarSection.css';
import { TITLE_BAR } from '../../constants/TitleBar';
import titleBgImage from '../../assets/backgroundImages/title-bar-bg.png';
import { SearchBar } from '../common/SearchBar';

export const TitleBarSection: React.FC = () => {
    return (
        <section className="title-bar-section">
            <div className="title-bar-bg-wrapper">
                <img
                    src={titleBgImage}
                    alt="Title Background"
                    className="title-bar-bg-img"
                />
            </div>
            <div className="title-bar-gradient-overlay"></div>

            <div className="title-bar-content">
                <h1 className="title-bar-title">{TITLE_BAR.TITLE}</h1>
                <p className="title-bar-subtitle">{TITLE_BAR.SUBTITLE}</p>

                <SearchBar />

            </div >
        </section >
    );
};
