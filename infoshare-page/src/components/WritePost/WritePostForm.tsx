import React, { useState } from 'react';
import { WRITE_POST } from '../../constants/Texts';
import { MaterialIcon } from '../../utils/MaterialIcon';
import '../../styles/WritePost/WritePostForm.css';
import { WritsEditor } from './WritsEditor';
import { WriteTagForm } from './WriteTagForm';
import { FileUpload } from '../common/FileUpload';
import { useAutoSave } from '../../hooks/useAutoSave';

export const WritePostForm: React.FC = () => {

    // 1️⃣ 지금은 테스트를 위해 제목(title) 상태만 만들어서 연결해둡니다. (추후 내용, 태그 등 추가)
    const [title, setTitle] = useState('');

    // 2️⃣ 자동 저장 훅에 연결
    const { lastSavedTime } = useAutoSave({ title });

    // 3️⃣ 저장된 시간 포맷팅 헬퍼
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit' });
    };

    return (
        <div className="write-post-form-container">
            {/* Post Title */}
            <div className="write-post-form-group">
                <label className="write-post-form-label">
                    {WRITE_POST.FORM.TITLE_LABEL}
                </label>
                <input
                    type="text"
                    className="write-post-input-title"
                    placeholder={WRITE_POST.FORM.TITLE_PLACEHOLDER}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* Content Editor */}
            <WritsEditor />

            {/* Tags */}
            <WriteTagForm />

            {/* File Upload Area */}
            <FileUpload />

            {/* Actions */}
            <div className="write-post-form-actions">
                <div className="write-post-draft-info">
                    <MaterialIcon icon="info" />
                    {lastSavedTime
                        ? `${WRITE_POST.FORM.DRAFT_SAVED} (${formatTime(lastSavedTime)})`
                        : WRITE_POST.FORM.DRAFT_SAVING_GUIDE}
                </div>
                <div className="write-post-action-buttons">
                    <button type="button" className="write-post-btn-draft">
                        <MaterialIcon icon="save" />
                        {WRITE_POST.FORM.SAVE_DRAFT_BTN}
                    </button>
                    <button type="button" className="write-post-btn-publish">
                        <MaterialIcon icon="publish" />
                        {WRITE_POST.FORM.PUBLISH_BTN}
                    </button>
                </div>
            </div>
        </div>
    );
};
