import React from 'react';
import { WRITE_POST } from '../../constants/Texts';
import { getCategoriesApi } from '../../api/getApiList';
import { useFetch } from '../../hooks/useFetch';

interface CategoryData {
    id: number;
    name: string;
}

export interface WriteCategoryFormProps {
    categoryId: number;
    setCategoryId: React.Dispatch<React.SetStateAction<number>>;
}

export const WriteCategoryForm: React.FC<WriteCategoryFormProps> = ({ categoryId, setCategoryId }) => {
    // 서버에서 카테고리 목록을 가져옵니다.
    const { data: categories, isLoading } = useFetch(getCategoriesApi);
    return (
        <div className="write-post-form-group">
            <label className="write-post-form-label">
                {WRITE_POST.FORM.CATEGORY_LABEL}
            </label>
            <select
                className="write-post-input-tags write-post-select-category"
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                disabled={isLoading || !categories || categories.length === 0}
            >
                {isLoading ? (
                    <option value={0}>로딩 중...</option>
                ) : (
                    categories?.map((category: CategoryData) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))
                )}
            </select>
        </div>
    );
};
