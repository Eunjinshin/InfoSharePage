import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * @file Layout.tsx
 * @description 메인 레이아웃 컴포넌트입니다.
 * @returns {React.FC} 메인 레이아웃 컴포넌트
 */
export const Layout: React.FC = () => {
    const location = useLocation();

    // 경로에 따라 Header 타입과 부모 레이아웃 클래스를 결정합니다.
    let headerType: 'main' | 'login' | 'board' = 'main';
    let layoutClass = 'main-page';

    if (location.pathname === '/login') {
        headerType = 'login';
        layoutClass = 'login-page';
    } else if (location.pathname.startsWith('/board')) {
        headerType = 'board';
        layoutClass = 'board-page-layout';
    }

    return (
        <div className={layoutClass}>
            {/* 로그인 페이지일 때만 나타나는 특별한 배경장식 */}
            {headerType === 'login' && (
                <div className="login-background">
                    <div className="bg-accent bg-accent-1"></div>
                    <div className="bg-accent bg-accent-2"></div>
                    <div className="bg-accent bg-accent-3"></div>
                </div>
            )}

            <Header type={headerType} />

            {/* Outlet 자리에 자식 페이지 컴포넌트들(MainPage, BoardPage 등)이 주입됩니다. */}
            <Outlet />

            <Footer />
        </div>
    );
};
