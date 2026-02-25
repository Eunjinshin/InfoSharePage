import React from 'react';
import '../../styles/components/Button.css';

/**
 * Button 컴포넌트가 부모로부터 전달받을 수 있는 속성(Props)들입니다.
 * 기본 <button> 태그의 모든 속성(onClick, type 등)을 지원합니다.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** 버튼 안에 들어갈 내용 (텍스트나 다른 요소) */
    children: React.ReactNode;
    /** 추가적으로 스타일을 덮어씌울 때 사용하는 CSS 클래스 이름 */
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
    return (
        <button className={`custom-btn ${className}`} {...props}>
            {children}
        </button>
    );
};
