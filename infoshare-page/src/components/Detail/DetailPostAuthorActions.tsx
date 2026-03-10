import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '../../hooks/useMutation';
import { deletePostApi } from '../../api/deleteApi';
import { DETAIL_AUTHOR_ACTIONS } from '../../constants/Texts';
import { ALERT_FAIL } from '../../constants/AlertText';

interface DetailPostAuthorActionsProps {
    postId: number | string | undefined;
}

export const DetailPostAuthorActions: React.FC<DetailPostAuthorActionsProps> = ({ postId }) => {
    const navigate = useNavigate();
    const { mutate: mutateDelete, isLoading: isDeleteLoading } = useMutation(deletePostApi);

    const handleEdit = () => {
        if (postId) {
            navigate(`/edit/${postId}`);
        }
    };

    const handleDelete = async () => {
        if (!postId || isDeleteLoading) return;

        if (window.confirm(DETAIL_AUTHOR_ACTIONS.DELETE_CONFIRM)) {
            try {
                await mutateDelete(Number(postId));
                alert(DETAIL_AUTHOR_ACTIONS.DELETE_SUCCESS);
                // 삭제 후 목록으로 이동
                navigate('/board');
            } catch (error) {
                alert(ALERT_FAIL.DELETE_POST);
            }
        }
    };

    return (
        <div className="detail-post-author-actions">
            <button className="detail-author-btn" onClick={handleEdit}>
                <span className="material-symbols-outlined detail-author-icon">edit</span>
                <span>{DETAIL_AUTHOR_ACTIONS.EDIT}</span>
            </button>
            <button className="detail-author-btn delete-btn" onClick={handleDelete} disabled={isDeleteLoading}>
                <span className="material-symbols-outlined detail-author-icon">delete</span>
                <span>{isDeleteLoading ? DETAIL_AUTHOR_ACTIONS.DELETING : DETAIL_AUTHOR_ACTIONS.DELETE}</span>
            </button>
        </div>
    );
};
