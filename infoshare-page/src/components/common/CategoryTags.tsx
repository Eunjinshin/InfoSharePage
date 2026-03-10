import React from 'react';
import '../../styles/components/CategoryTags.css';
import { MaterialIcon } from '../../utils/MaterialIcon';
import { CATEGORY_TEXT } from '../../constants/MenuText';
import { getPopularTagsApi } from '../../api/getApiList';
import { useFetch } from '../../hooks/useFetch';

interface TagData {
    name: string;
    // 태그에는 보통 아이콘 정보가 서버에서 오지 않으므로, 기본 아이콘을 매핑해주거나 제외할 수 있습니다.
    // 여기서는 기존과 형태를 맞추기 위해 임의로 기본 아이콘 처리를 추가합니다.
}

export const CategoryTags: React.FC = () => {
    // 인기 태그 API 연동 (limit 5개로 요청)
    const { data: popularTags, isLoading, error } = useFetch(getPopularTagsApi, 5);

    if (isLoading) return <div className="category-tags-container">Loading tags...</div>;
    if (error) return <div className="category-tags-container">Failed to load tags.</div>;

    // API에서 태그 목록을 배열 형태로 줬다고 가정: [{ name: 'React' }, { name: 'Spring' }, ...]
    const tags = Array.isArray(popularTags) ? popularTags : [];

    // 태그가 없을 경우 기본값 노출 (선택사항)
    const displayTags = tags.length > 0 ? tags : CATEGORY_TEXT.CATEGORIES.map(c => ({ name: c.text }));

    return (
        <div className="category-tags-container">
            {displayTags.map((tag: TagData | any, index: number) => (
                <div key={index} className="category-tag">
                    {/* 서버 태그에 아이콘이 없으면 기본 태그 아이콘 노출 */}
                    <MaterialIcon
                        icon={tag.icon || "tag"}
                        className="category-tag-icon"
                    />
                    #{tag.name || tag.text}
                </div>
            ))}
        </div>
    );
};
