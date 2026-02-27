import React from 'react';
import '../../styles/components/CategoryTags.css';
import { MaterialIcon } from '../../utils/MaterialIcon';
import { CATEGORY_TEXT } from '../../constants/MenuText';

export const CategoryTags: React.FC = () => {
    return (
        <div className="category-tags-container">
            {/* 
              * CATEGORY_TEXT.CATEGORIES는 src/constants/MenuText.ts 파일에서 가져옵니다.
              * 이 배열을 .map() 함수로 순회하면서 아이콘과 텍스트를 화면에 렌더링합니다.
              */}
            {CATEGORY_TEXT.CATEGORIES.map((category: any, index: number) => (
                <div key={index}
                    className="category-tag"
                >
                    <MaterialIcon
                        icon={category.icon}
                        className="category-tag-icon"
                    />
                    #{category.text}
                </div>
            ))}
        </div>
    );
};
