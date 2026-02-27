/**
 * @file BoardList.tsx
 * @description 게시판의 주요 내용인 게시글 목록을 테이블 형태로 보여주는 컴포넌트입니다.
 */

import React from 'react';
import '../../styles/Board/BoardList.css';
import { BOARD_LIST } from '../../constants/Texts';

// 임시 데이터 타입 정의 (나중에 별도 파일로 분리 가능)
export interface BoardItem {
    id: string | number;
    title: string;
    categoryOrTags: string;
    authorName: string;
    authorAvatar: string;
    views: string | number;
    date: string;
}

interface BoardListProps {
    topics: BoardItem[];
}

export const BoardList: React.FC<BoardListProps> = ({ topics }) => {
    return (
        <div className="board-list-container">
            <div className="board-list-wrapper">
                <table className="board-table">
                    <thead className="board-table-head">
                        <tr>
                            <th className="th-topic">{BOARD_LIST.TOPIC}</th>
                            <th className="th-author">{BOARD_LIST.AUTHOR}</th>
                            <th className="th-views">{BOARD_LIST.VIEWS}</th>
                            <th className="th-date">{BOARD_LIST.DATE}</th>
                        </tr>
                    </thead>
                    <tbody className="board-table-body">
                        {topics.map((topic, index) => (
                            <tr key={topic.id || index} className="board-row">
                                <td className="td-topic">
                                    <div className="topic-info">
                                        <span className="topic-title">{topic.title}</span>
                                        <span className="topic-meta">{topic.categoryOrTags}</span>
                                    </div>
                                </td>
                                <td className="td-author">
                                    <div className="author-info">
                                        <div
                                            className="author-avatar"
                                            style={{ backgroundImage: `url('${topic.authorAvatar}')` }}
                                            aria-label={`${topic.authorName} avatar`}
                                        ></div>
                                        <span className="author-name">{topic.authorName}</span>
                                    </div>
                                </td>
                                <td className="td-views">{topic.views}</td>
                                <td className="td-date">{topic.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
