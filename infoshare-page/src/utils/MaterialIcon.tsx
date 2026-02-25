import React from 'react';
import '../styles/components/MaterialIcon.css';

interface MaterialIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    icon: string;
}

/**
 * Material Symbols Outlined 아이콘을 렌더링하는 재사용 가능한 컴포넌트입니다.
 * 
 * @param icon - 표시할 아이콘의 이름 (예: 'mail', 'lock', 'visibility' 등)
 * @param className - 추가적으로 적용할 CSS 클래스 이름
 */
export const MaterialIcon: React.FC<MaterialIconProps> = ({ icon, className = '', ...props }) => {
    return (
        <span
            className={`material-symbols-outlined ${className}`}
            {...props}
        >
            {icon}
        </span>
    );
};
