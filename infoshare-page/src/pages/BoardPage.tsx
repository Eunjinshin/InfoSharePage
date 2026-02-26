import { BoardTitle } from '../components/Board/BoardTitle';
import { BoardContentsFilter } from '../components/Board/BoardContentsFilter';
import { BoardList } from '../components/Board/BoardList';
import { Pagination } from '../components/common/Pagination';
import { WritePostButton } from '../components/common/WritePostButton';
import '../styles/pages/BoardPage.css';
import { MOCK_TOPICS } from '../tests/boardTestdata';

/**
 * @file BoardPage.tsx
 * @description 게시판 목록 전체 뷰를 담당하는 메인 페이지 컴포넌트입니다.
 * 내부에 BoardHeader, BoardFilter, TopicList, Pagination 컴포넌트를 조합하여 사용합니다.
 */



export const BoardPage = () => {
    return (
        <main className="board-page-main">
            <BoardTitle tag="General Discussion" />

            <BoardContentsFilter />

            <BoardList topics={MOCK_TOPICS.TopicItem} />

            <Pagination />

            <WritePostButton />
        </main>
    );
};

export default BoardPage;
