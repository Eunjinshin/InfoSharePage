import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getCategoriesApi } from '../api/getApiList';
import { MaterialIcon } from '../utils/MaterialIcon';
import { CATEGORY_ICONS } from '../constants/Icons';
import '../styles/Category/CategoryPage.css';

export const CategoryPage: React.FC = () => {
    const navigate = useNavigate();
    const { data: categories, isLoading, error } = useFetch(getCategoriesApi);

    const handleCategoryClick = (categoryName: string) => {
        navigate(`/board?category=${encodeURIComponent(categoryName)}`);
    };

    // 프론트엔드 매핑용 임시 아이콘 로직
    const getIconForCategory = (name: string) => {
        switch (name) {
            case 'Tips': return CATEGORY_ICONS.TRENDING_UP;
            case 'Tech': return CATEGORY_ICONS.COMPUTER;
            case 'News': return CATEGORY_ICONS.NEWSPAPER;
            case 'Science': return CATEGORY_ICONS.SCIENCE;
            case 'Design': return CATEGORY_ICONS.DESIGN_SERVICES;
            case 'IT': return CATEGORY_ICONS.COMPUTER;
            case 'Information': return 'info';
            case 'QnA': return 'question_answer';
            case 'Notice': return 'campaign';
            default: return 'folder';
        }
    };

    if (isLoading) return <div className="category-page-container">로딩 중...</div>;
    if (error) return <div className="category-page-container">카테고리를 불러오는데 실패했습니다.</div>;

    return (
        <div className="category-page-container">
            <h1 className="category-page-title">모든 카테고리</h1>
            <div className="category-grid">
                {categories?.map((category: { id: number, name: string }) => (
                    <div
                        key={category.id}
                        className="category-card"
                        onClick={() => handleCategoryClick(category.name)}
                    >
                        <MaterialIcon icon={getIconForCategory(category.name)} className="category-card-icon" />
                        <span className="category-card-name">{category.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
