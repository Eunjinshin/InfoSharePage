import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MaterialIcon } from "../../utils/MaterialIcon";
import { TITLE_BAR } from "../../constants/Texts";
import { Button } from "../common/Button";
import '../../styles/components/SearchBar.css';

export const SearchBar: React.FC = () => {
    // 사용자가 입력한 검색어를 상태로 관리합니다.
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    /**
     * 검색 폼이 제출될 때 실행되는 함수입니다.
     * 엔터 키를 누르거나 검색 버튼을 클릭했을 때 트리거됩니다.
     */
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault(); // 기본 폼 제출 동작(페이지 새로고침) 방지

        // 검색어가 비어있거나 공백만 있는 경우 처리안함
        if (!searchQuery.trim()) return;

        // 검색어와 함께 게시판 페이지로 이동합니다.
        // API 요청은 게시판 페이지(BoardPage)에서 URL 파라미터를 읽어 처리합니다.
        navigate(`/board?keyword=${encodeURIComponent(searchQuery.trim())}`);

        // 검색 실행 후 입력창 초기화 (선택 사항)
        // setSearchQuery('');
    };

    return (
        /* 검색 접근성과 편의성을 위해 div 대신 form 태그를 사용합니다. */
        <form className="title-bar-search-container" onSubmit={handleSearch}>
            <div className="title-bar-search-input-wrapper">
                <MaterialIcon
                    icon="search"
                    className="title-bar-search-icon"
                />
                <input
                    className="title-bar-search-input"
                    placeholder={TITLE_BAR.SEARCH_PLACEHOLDER}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <Button
                type="submit"
                className="title-bar-search-btn"
            >
                {TITLE_BAR.SEARCH_BTN}
            </Button>
        </form>
    );
};