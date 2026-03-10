/**
 * @file Pagination.tsx
 * @description 게시글 리스트 하단의 페이지네이션(페이지 이동) 컴포넌트입니다.
 */

import React from 'react';
import '../../styles/components/Pagination.css';
import { CHEVRON_ICONS } from '../../constants/Icons';
import { PAGINATION } from '../../constants/Texts';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ 
    currentPage, 
    totalPages, 
    totalItems, 
    onPageChange 
}) => {
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    // 좌우 최대 몇 개의 페이지만 보여줄지 계산 (5개)
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }
    startPage = Math.max(1, startPage); // Ensure startPage is at least 1

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
