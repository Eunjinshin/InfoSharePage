import React from 'react';
import '../../styles/Board/BoardTitle.css';
import { BOARD_INFO } from '../../constants/Tag';
import { BOARD } from '../../constants/Texts';
import { CHEVRON_ICONS } from '../../constants/Icons';


/**
 * @file BoardTitle.tsx
 * @description 게시판 상단의 브레드크럼(Breadcrumbs) 및 타이틀, 설명을 나타내는 컴포넌트입니다.
 */


interface BoardTitleProps {
    tag?: string;
}

export const BoardTitle: React.FC<BoardTitleProps> = ({ tag = "General Discussion" }) => {
    // tag에 해당하는 정보가 없을 경우 기본값으로 처리
    const info = BOARD_INFO[tag] || BOARD_INFO["General Discussion"];

    return (
        <div className="board-header">
            <nav className="board-breadcrumbs">
                <a href="/" className="breadcrumb-link">
                    {BOARD.HOME}
                </a>
                <span className="material-symbols-outlined breadcrumb-separator">
                    {CHEVRON_ICONS.RIGHT}
                </span>
                <a href="#" className="breadcrumb-link">
                    {BOARD.CATEGORIES}
                </a>
                <span className="material-symbols-outlined breadcrumb-separator">
                    {CHEVRON_ICONS.RIGHT}
                </span>
                <span className="breadcrumb-current">
                    {info.title}
                </span>
            </nav>

            <div className="board-title-section">
                <h1 className="board-title">
                    {info.title}
                </h1>
                <p className="board-description">
                    {info.description}
                </p>
            </div>

        </div>
    );
};
