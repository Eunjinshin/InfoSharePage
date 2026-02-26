import React from 'react';
import { COMMENT_ICONS } from "../../constants/Icons";
import { COMMENT_FORM } from "../../constants/Texts";
import { Button } from "../common/Button";
import '../../styles/Detail/DetailCommentForm.css';

export const DetailCommentForm: React.FC = () => {
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
                    ></textarea>
                    <div className="detail-comment-submit-wrap">
                        {/* 기존 제출 버튼 클래스를 그대로 적용 */}
                        <Button className="detail-comment-submit-btn">
                            {COMMENT_FORM.COMMENT_BTN}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
