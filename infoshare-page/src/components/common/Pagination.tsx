/**
 * @file Pagination.tsx
 * @description 게시글 리스트 하단의 페이지네이션(페이지 이동) 컴포넌트입니다.
 */

import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/components/Pagination.css';
import { CHEVRON_ICONS } from '../../constants/Icons';
import { PAGINATION } from '../../constants/Texts';

interface PaginationProps {
    onPageChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ onPageChange }) => {
    // 상태 관리를 내부에서 직접 수행 (백엔드 연동 준비)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const itemsPerPage = 10; // 임시: 페이지 당 노출 갯수

    // 데이터 패칭 함수 (API 연동 시 주석 해제 및 수정)
    const fetchPaginationData = useCallback(async (_page: number) => {
        try {
            // TODO: 실제 API 연동 시 백엔드 엔드포인트에 맞게 URL 수정
            // const response = await fetch(`/api/board/contents?page=${page}&limit=${itemsPerPage}`);
            // const data = await response.json();
            // setTotalPages(data.totalPages);
            // setTotalItems(data.totalItems);

            // 임시 모의 데이터
            setTotalPages(25);
            setTotalItems(248);
        } catch (error) {
            console.error("Failed to fetch pagination data:", error);
        }
    }, [itemsPerPage]);

    // currentPage가 변결될 때마다 서버에서 데이터를 다시 가져옵니다.
    useEffect(() => {
        fetchPaginationData(currentPage);
    }, [currentPage, fetchPaginationData]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
            onPageChange?.(page);
        }
    };

    // 좌우 최대 몇 개의 페이지만 보여줄지 계산 (5개)
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination-container">
            <div className="pagination-info">
                <p>
                    {PAGINATION.INFO.split('{totalItems}').map((part, index, array) => (
                        <React.Fragment key={index}>
                            {part}
                            {index < array.length - 1 && <span>{totalItems}</span>}
                        </React.Fragment>
                    ))}
                </p>
            </div>

            {/* 우측 페이지네이션 컨트롤 */}
            <div className="pagination-controls">
                <button
                    className="page-btn nav-btn"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage <= 1}
                >
                    <span className="material-symbols-outlined">
                        {CHEVRON_ICONS.FIRST}
                    </span>
                </button>
                <button
                    className="page-btn nav-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                >
                    <span className="material-symbols-outlined">{CHEVRON_ICONS.LEFT}</span>
                </button>

                {pages.map(page => (
                    <button
                        key={page}
                        className={`page-btn ${currentPage === page ? 'active-btn' : 'default-btn'}`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="page-dots">...</span>}
                        <button
                            className="page-btn default-btn"
                            onClick={() => handlePageChange(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                <button
                    className="page-btn nav-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages || totalPages === 0}
                >
                    <span className="material-symbols-outlined">
                        {CHEVRON_ICONS.RIGHT}
                    </span>
                </button>
                <button
                    className="page-btn nav-btn"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage >= totalPages || totalPages === 0}
                >
                    <span className="material-symbols-outlined">
                        {CHEVRON_ICONS.LAST}
                    </span>
                </button>
            </div>
        </div>
    );
};
