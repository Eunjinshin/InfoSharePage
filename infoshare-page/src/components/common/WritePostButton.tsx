/**
 * @file WritePostButton.tsx
 * @description 화면 우측 하단에 고정된 떠 있는 글쓰기(Write Post) 플로팅 버튼 컴포넌트입니다.
 */

import React from 'react';
import '../../styles/components/WritePostButton.css';
import { WRITE_POST_BUTTON } from '../../constants/Texts';
import { BOARD_ICONS } from '../../constants/Icons';

export const WritePostButton = () => {
    return (
        <button
            className="write-post-btn"
            aria-label={WRITE_POST_BUTTON.WRITE_POST}
        >
            <span className="material-symbols-outlined icon-edit">
                {BOARD_ICONS.EDIT}
            </span>
            <span className="write-post-tooltip">
                {WRITE_POST_BUTTON.WRITE_POST}
            </span>
        </button>
    );
};
