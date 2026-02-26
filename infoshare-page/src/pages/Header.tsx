import React from 'react';
import LogoIcon from '../assets/icons/logo.svg?react'; //SVG이미지를 자동으로 변경
import '../styles/pages/Header.css';
import { HEADER_TEXT, TITLE_TEXT } from '../constants/MenuText';

/* 
 * currentMenu.map() 사용법 설명
 * 
 * 1. currentMenu는 MenuText.ts에서 가져온 배열입니다. (예: [{ text: 'About', href: '/about' }])
 * 2. 배열의 내장 함수인 .map()을 사용하면 배열 안의 데이터 갯수만큼 반복해서 태그를 생성할 수 있습니다.
 * 3. map( (데이터1개, 순번) => ( 반환할 태그 ) ) 형태입니다.
 * 
 * [주의사항]
 * React에서 map으로 태그를 여러 개 만들 때는 반드시 최상위 태그에 'key' 속성을 고유한 값으로 넣어주어야 합니다.
 * 여기서는 배열의 순번(index)을 임시로 사용했습니다. (key={index})
 */

interface HeaderProps {
    type?: 'main' | 'login' | 'board';
}

export const Header: React.FC<HeaderProps> = ({ type = 'main' }) => {
    const currentMenu = HEADER_TEXT[type];

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-logo">
                    <LogoIcon />
                    <h2>{TITLE_TEXT.TITLE}</h2>
                </div>
                <div className="header-nav-container">
                    <nav className="header-nav">
                        {currentMenu.map((menu, index) => (
                            <a key={index}
                                href={menu.href}>
                                {menu.text}
                            </a>
                        ))}
                    </nav>
                    <button className="header-signup-btn">
                        {TITLE_TEXT.SIGN}
                    </button>
                </div>
            </div>
        </header>
    );
};
