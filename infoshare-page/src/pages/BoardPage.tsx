import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BoardTitle } from '../components/Board/BoardTitle';
import { BoardContentsFilter } from '../components/Board/BoardContentsFilter';
import type { FilterType } from '../components/Board/BoardContentsFilter';
import { BoardList } from '../components/Board/BoardList';
import { Pagination } from '../components/common/Pagination';
import { WritePostButton } from '../components/common/WritePostButton';
import '../styles/pages/BoardPage.css';
import { searchPostsApi } from '../api/searchApi';
import { getLatestPostsApi, getPopularPostsApi } from '../api/getApiList';
import { useFetch } from '../hooks/useFetch';
import { MAIN_TEXT } from '../constants/Texts';

/**
 * @file BoardPage.tsx
 * @description 게시판 목록 전체 뷰를 담당하는 메인 페이지 컴포넌트입니다.
 * 내부에 BoardHeader, BoardFilter, TopicList, Pagination 컴포넌트를 조합하여 사용합니다.
 */

export const BoardPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // URL에서 keyword, category 파라미터를 읽어옵니다. (없으면 빈 문자열)
    const initialKeyword = searchParams.get('keyword') || '';
    const initialCategory = searchParams.get('category') || '';

    // 상태 관리: 현재 페이지, 검색어, 그리고 선택된 필터
    const [page, setPage] = useState<number>(1);
    const [keyword, setKeyword] = useState<string>(initialKeyword);
    const [category, setCategory] = useState<string>(initialCategory);
    const [activeFilter, setActiveFilter] = useState<FilterType>('All Posts');
    const size = 10; // 기본 페이지 사이즈

    // URL의 파라미터가 변경되면 상태를 동기화합니다.
    useEffect(() => {
        const urlKeyword = searchParams.get('keyword') || '';
        const urlCategory = searchParams.get('category') || '';

        if (urlKeyword !== keyword || urlCategory !== category) {
            setKeyword(urlKeyword);
            setCategory(urlCategory);
            setPage(1); // 조건 변경 시 첫 페이지로 리셋
            setActiveFilter('All Posts'); // 검색/카테고리 선택 시 전체 게시글 필터로 변경
        }
    }, [searchParams]);

    // 선택된 필터에 따라 호출할 API 함수를 결정합니다.
    // useMemo로 감싸서 activeFilter가 바뀔 때만 새 참조를 반환합니다.
    // 그렇지 않으면 useFetch 내부에서 매 렌더마다 refetch가 발생합니다.
    const targetApi = useMemo(() => {
        switch (activeFilter) {
            case 'Latest': return getLatestPostsApi;
            case 'Popular': return getPopularPostsApi;
            default: return searchPostsApi;
        }
    }, [activeFilter]);

    // API 연동: 필터, 페이지, 검색어에 맞는 데이터를 가져옵니다.
    const isSearchMode = activeFilter === 'All Posts';
    const { data: postsData, isLoading, error } = useFetch(
        targetApi,
        isSearchMode ? page : undefined,
        isSearchMode ? size : undefined,
        isSearchMode ? keyword : undefined,
        isSearchMode ? category : undefined
    );

    // 검색어 변경 핸들러
    const handleSearch = (newKeyword: string) => {
        if (newKeyword.trim()) {
            setSearchParams({ keyword: newKeyword.trim() });
        } else {
            setSearchParams({});
        }
        setPage(1);
    };

    // 필터 변경 핸들러
    const handleFilterChange = (filter: FilterType) => {
        setActiveFilter(filter);
        setPage(1);

        // '전체 게시글'이 아닌 필터를 선택할 때는 검색어를 초기화합니다.
        if (filter !== 'All Posts') {
            setSearchParams({});
            setKeyword('');
        }
    };

    // 페이지 변경 핸들러
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    /**
     * API에서 받아온 게시글 데이터를 BoardList 컴포넌트 형식에 맞게 변환합니다.
     */
    const mapToBoardItem = (post: any) => ({
        id: post.id,
        title: post.title,
        tags: Array.isArray(post.tags) ? post.tags : [],  // 태그 배열을 그대로 전달
        authorName: post.author || 'Guest',
        authorAvatar: '',
        views: post.viewCount || 0,
        date: post.createdAt || ''
    });

    // API 응답 데이터 구조(data, meta)에 맞춰 데이터를 추출합니다.
    const topics = Array.isArray(postsData?.data)
        ? postsData.data.map(mapToBoardItem)
        : (Array.isArray(postsData) ? postsData.map(mapToBoardItem) : []);

    const meta = postsData?.meta || {
        currentPage: 1,
        totalPages: 1,
        totalElements: 0
    };

    return (
        <main className="board-page-main">
            <BoardTitle category={category || "General Discussion"} />

            <BoardContentsFilter
                onSearch={handleSearch}
                initialKeyword={keyword}
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
            />

            {/* 데이터를 불러오는 중이거나 에러가 발생한 경우 처리 */}
            {isLoading ? (
                <div>{MAIN_TEXT.LOADING}</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <BoardList topics={topics} />
            )}

            <Pagination
                currentPage={meta.currentPage}
                totalPages={meta.totalPages}
                totalItems={meta.totalElements}
                onPageChange={handlePageChange}
            />

            <WritePostButton />
        </main>
    );
};

export default BoardPage;
