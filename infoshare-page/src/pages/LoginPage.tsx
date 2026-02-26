import React from 'react';
import { LoginForm } from '../components/Login/LoginForm';
import { SocialLogin } from '../components/Login/SocialLogin';
import '../styles/pages/LoginPage.css';
import { LOGIN_TEXT } from '../constants/LoginText';

interface LoginPageProps {
    onLogin?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    return (
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
    );
};
