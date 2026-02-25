import React from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { LoginForm } from '../components/Login/LoginForm';
import { SocialLogin } from '../components/Login/SocialLogin';
import '../styles/pages/LoginPage.css';
import { LOGIN_TEXT } from '../constants/LoginText';

interface LoginPageProps {
    onLogin?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    return (
        <div className="login-page">
            <div className="login-background">
                <div className="bg-accent bg-accent-1"></div>
                <div className="bg-accent bg-accent-2"></div>
                <div className="bg-accent bg-accent-3"></div>
            </div>

            <Header type="login" />

            <main className="login-main">
                <div className="login-card">
                    <div className="login-header">
                        <h1 className="login-title">{LOGIN_TEXT.TITLE}</h1>
                        <p className="login-subtitle">{LOGIN_TEXT.SUBTITLE}</p>
                    </div>

                    <LoginForm onLogin={onLogin} />

                    <SocialLogin />

                    <p className="signup-prompt">
                        {LOGIN_TEXT.SIGNUP_PROMPT}{' '}
                        <a href="#" className="signup-link">{LOGIN_TEXT.SIGNUP_LINK}</a>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};
