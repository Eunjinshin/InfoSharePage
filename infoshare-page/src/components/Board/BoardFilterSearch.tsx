import React from "react";
import { FILTER_TEXT } from "../../constants/FilterText";
import { BOARD_ICONS } from "../../constants/Icons";
import { MaterialIcon } from "../../utils/MaterialIcon";
import { Button } from "../common/Button";
import '../../styles/Board/BoardFilterSearch.css';

interface BoardFilterSearchProps {
    onSearch: (keyword: string) => void;
    initialKeyword?: string;
}

export const BoardFilterSearch: React.FC<BoardFilterSearchProps> = ({ onSearch, initialKeyword = '' }) => {
    const [keyword, setKeyword] = React.useState(initialKeyword);

    // 상위 컴포넌트나 URL 등에서 전달된 초기 검색어가 변경되면 내부 상태를 동기화합니다.
    React.useEffect(() => {
        setKeyword(initialKeyword);
    }, [initialKeyword]);

    const handleSearch = () => {
        onSearch(keyword);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="board-filter-search-wrapper">
            <div className="board-filter-search">
                <div className="board-filter-search-icon">
                    <MaterialIcon icon={BOARD_ICONS.FILTER_LIST} />
                </div>
                <input
                    type="text"
                    className="board-filter-search-input"
                    placeholder={FILTER_TEXT.FILTER_PLACEHOLDER}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <Button className="board-filter-search-btn" onClick={handleSearch}>
                {FILTER_TEXT.SEARCH_BTN}
            </Button>
        </div>
    );
};