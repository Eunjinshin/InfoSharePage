import React from 'react';
import '../styles/pages/DetailPage.css';
import { DetailPost } from '../components/Detail/DetailPost';
import { DetailComments } from '../components/Detail/DetailComments';
import { WritePostButton } from '../components/common/WritePostButton';
import { useParams } from 'react-router-dom';
import { getCommentsApi } from '../api/getApiList';
import { useFetch } from '../hooks/useFetch';

export const DetailPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();

    // 댓글 목록 가져오기
    const fetchComments = React.useCallback(async (id: number) => {
        if (!id) throw new Error('Post ID is missing');
        return getCommentsApi(id);
    }, []);

    const {
        data: comments,
        isLoading: isCommentsLoading,
        refetch: refetchComments,   // 댓글 작성 후 목록을 즉시 갱신하기 위한 함수
    } = useFetch<any>(
        fetchComments,
        postId ? Number(postId) : 0
    );

    return (
        <main className="detail-page-main">
            <div className="detail-content-container">

                <DetailPost />

                {/* 댓글 목록 */}
                {!isCommentsLoading && comments && (
                    <DetailComments
                        comments={comments}
                        totalCount={comments.length}
                        onCommentAdded={refetchComments}
                    />
                )}

                <WritePostButton />
            </div>
        </main>
    );
};

export default DetailPage;
