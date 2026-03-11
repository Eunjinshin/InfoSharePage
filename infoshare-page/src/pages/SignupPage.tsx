import React from 'react';
import { SignupForm } from '../components/Login/SignupForm';
import '../styles/pages/LoginPage.css'; // 기존 로그인 스타일 재사용
import { useNavigate } from 'react-router-dom';

export const SignupPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <main className="login-main">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">Sign Up</h1>
                    <p className="login-subtitle">새로운 계정을 생성하세요.</p>
                </div>

                <SignupForm />

                <p className="signup-prompt">
                    이미 계정이 있으신가요?{' '}
                    <span 
                        className="signup-link" 
                        onClick={() => navigate('/login')}
                        style={{cursor: 'pointer'}}
                    >
                        로그인하기
                    </span>
                </p>
            </div>
        </main>
    );
};
