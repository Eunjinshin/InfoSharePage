/**
 * @file BoardList.tsx
 * @description 게시판의 주요 내용인 게시글 목록을 테이블 형태로 보여주는 컴포넌트입니다.
 */

import React from 'react';
import '../../styles/Board/BoardList.css';
import { BOARD_LIST } from '../../constants/Texts';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../common/Avatar';

// 임시 데이터 타입 정의 (나중에 별도 파일로 분리 가능)
export interface BoardItem {
    id: string | number;
    title: string;
    tags: string[];          // 태그 배열 (이전의 categoryOrTags 대체)
    authorName: string;
    authorAvatar: string;
    views: string | number;
    date: string;
}

interface BoardListProps {
    topics: BoardItem[];
}

export const BoardList: React.FC<BoardListProps> = ({ topics = [] }) => {
    const navigate = useNavigate();

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
                        {(Array.isArray(topics) ? topics : []).map((topic, index) => (
                            <tr
                                key={topic.id || index}
                                className="board-row"
                                onClick={() => navigate(`/detail/${topic.id || index}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <td className="td-topic">
                                    <div className="topic-info">
                                        {/* 태그 뱃지: 제목 위에 표시 */}
                                        {topic.tags && topic.tags.length > 0 && (
                                            <div className="topic-tags-wrapper">
                                                {topic.tags.map((tag, tagIdx) => (
                                                    <span key={tagIdx} className="topic-tag-badge">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <span className="topic-title">{topic.title}</span>
                                    </div>
                                </td>
                                <td className="td-author">
                                    <div className="author-info">
                                        <div
                                            className="author-avatar"
                                            aria-label={`${topic.authorName} avatar`}
                                        >
                                            <Avatar src={topic.authorAvatar} alt={`${topic.authorName} avatar`} />
                                        </div>
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
