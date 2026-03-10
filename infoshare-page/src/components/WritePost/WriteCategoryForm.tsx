import React from 'react';
import { WRITE_POST } from '../../constants/Texts';
import { CATEGORY_TEXT } from '../../constants/MenuText';

export interface WriteCategoryFormProps {
    categoryId: number;
    setCategoryId: React.Dispatch<React.SetStateAction<number>>;
}

export const WriteCategoryForm: React.FC<WriteCategoryFormProps> = ({ categoryId, setCategoryId }) => {
    return (
        <div className="write-post-form-group">
            <label className="write-post-form-label">
                {WRITE_POST.FORM.CATEGORY_LABEL}
            </label>
            <select
                className="write-post-input-tags write-post-select-category"
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
            >
                {CATEGORY_TEXT.CATEGORIES.map((category, index) => (
                    // index + 1을 value로 사용하여 카테고리 ID를 넘깁니다.
                    <option key={index + 1} value={index + 1}>
                        {category.text}
                    </option>
                ))}
            </select>
        </div>
    );
};
