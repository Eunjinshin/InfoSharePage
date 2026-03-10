import React, { useState } from 'react';
import { COMMENT_ICONS } from "../../constants/Icons";
import { COMMENT_FORM } from "../../constants/Texts";
import { Button } from "../common/Button";
import '../../styles/Detail/DetailCommentForm.css';
import { useParams } from 'react-router-dom';
import { useMutation } from '../../hooks/useMutation';
import { createCommentApi } from '../../api/postApiList';

interface DetailCommentFormProps {
    parentId?: number | null;
    onCommentAdded?: () => void;  // 댓글 등록 성공 시 호출할 콜백 (목록 새로고침)
}

export const DetailCommentForm: React.FC<DetailCommentFormProps> = ({ parentId = null, onCommentAdded }) => {
    const { postId } = useParams<{ postId: string }>();
    const [content, setContent] = useState('');
    const { mutate, isLoading } = useMutation(createCommentApi);

    const handleSubmit = async () => {
        if (!content.trim() || !postId) return;
        try {
            await mutate({
                postId: Number(postId),
                content,
                parentId
            });
            setContent(''); // 작성 후 입력창 비우기
            onCommentAdded?.(); // 상위 컴포넌트에 등록 완료 알림 → 목록 즉시 갱신
        } catch (error: any) {
            alert(error.message || '댓글 등록에 실패했습니다.');
        }
    };

    return (
        <div className="detail-comment-form">
            <div className="detail-comment-form-inner">
                <div className="detail-comment-form-avatar">
                    <span className="material-symbols-outlined">
                        {COMMENT_ICONS.PERSON}
                    </span>
                </div>
                <div className="detail-comment-input-area">
                    <textarea
                        className="detail-comment-textarea"
                        placeholder={COMMENT_FORM.PLACEHOLDER}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <div className="detail-comment-submit-wrap">
                        <Button
                            className="detail-comment-submit-btn"
                            onClick={handleSubmit}
                            disabled={isLoading || !content.trim()}
                        >
                            {isLoading ? '등록 중...' : COMMENT_FORM.COMMENT_BTN}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
