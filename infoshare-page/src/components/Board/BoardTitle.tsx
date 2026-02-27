import React from 'react';
import '../../styles/Board/BoardTitle.css';
import { getCategoryInfo } from '../../constants/Tag';
import { BREADCRUMB_NAV } from '../../constants/Texts';
import { BreadcrumbNavigation } from '../common/BreadcrumbNavigation';


/**
 * @file BoardTitle.tsx
 * @description 게시판 상단의 브레드크럼(Breadcrumbs) 및 타이틀, 설명을 나타내는 컴포넌트입니다.
 */


interface BoardTitleProps {
    category: string;
}

export const BoardTitle: React.FC<BoardTitleProps> = ({ category }) => {
    // tag에 해당하는 정보가 없을 경우 기본값으로 처리된 정보를 가져옵니다
    const CategoryInfo = getCategoryInfo(category);

    return (
        <div className="board-header">
            <BreadcrumbNavigation paths={[
                { name: BREADCRUMB_NAV.CATEGORIES, url: '/board' },
                { name: CategoryInfo.title }
            ]} />

            <div className="board-title-section">
                <h1 className="board-title">
                    {CategoryInfo.title}
                </h1>
                <p className="board-description">
                    {CategoryInfo.description}
                </p>
            </div>

        </div>
    );
};
