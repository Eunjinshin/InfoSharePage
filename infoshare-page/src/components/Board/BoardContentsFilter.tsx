import React from 'react';
import '../../styles/Board/BoardContentsFilter.css';
import { FILTER_TEXT } from '../../constants/FilterText';
import { BoardFilterSearch } from './BoardFilterSearch';

/**
 * @file BoardContentsFilter.tsx
 * @description 게시글 리스트 상단의 필터 버튼 및 검색 입력창을 포함하는 컴포넌트입니다.
 * 
 * filters 배열을 순회(.map)하면서 각각의 버튼을 화면에 그립니다.
 * activeFilter(선택된 상태)와 현재 순회중인 버튼의 id가 같다면 파란색 'active-btn' 스타일을,
 * 아니라면 회색 'default-btn' 스타일을 적용합니다.
 */

export type FilterType = 'All Posts' | 'Latest' | 'Popular';

interface BoardContentsFilterProps {
    onSearch: (keyword: string) => void;
    initialKeyword?: string;
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

export const BoardContentsFilter: React.FC<BoardContentsFilterProps> = ({ 
    onSearch, 
    initialKeyword, 
    activeFilter, 
    onFilterChange 
}) => {

    // 필터 버튼들에 들어갈 고정된 데이터 배열
    const filters = [
        { id: 'All Posts', label: FILTER_TEXT.ALL_POSTS },
        { id: 'Latest', label: FILTER_TEXT.LATEST },
        { id: 'Popular', label: FILTER_TEXT.POPULAR }
    ] as const;

    return (
        <div className="board-filter-container">
            <div className="board-filter-buttons">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        className={`board-filter-btn ${activeFilter === filter.id ? 'active-btn' : 'default-btn'}`}
                        // 버튼을 클릭하면 상위 컴포넌트로 변경된 필터 id를 전달합니다.
                        onClick={() => onFilterChange(filter.id)}
                    >
                        <span>{filter.label}</span>
                    </button>
                ))}
            </div>

            <BoardFilterSearch onSearch={onSearch} initialKeyword={initialKeyword} />
        </div>
    );
};
