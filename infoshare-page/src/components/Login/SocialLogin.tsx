import React from 'react';
import '../../styles/components/SocialLogin.css';
import { LOGIN_TEXT } from '../../constants/LoginText';
import GoogleIcon from '../../assets/icons/google.svg?react';
import AppleIcon from '../../assets/icons/apple.svg?react';

export const SocialLogin: React.FC = () => {
    return (
        <div className="social-login-container">
            <div className="divider-wrapper">
                <div className="divider-line"></div>
                <div className="divider-text">
                    <span>{LOGIN_TEXT.SOCIAL_LOGIN}</span>
                </div>
            </div>

            <div className="social-buttons">
                {/* 
                  * 소셜 로그인 버튼 클릭 시 백엔드의 OAuth2 인증 엔드포인트로 이동합니다.
                  * 인증이 완료되면 OAuth2SuccessHandler를 통해 다시 프론트엔드로 리다이렉트 됩니다.
                  */}
                <button 
                    className="social-btn"
                    onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
                >
                    <GoogleIcon className="social-icon-img" />
                    <span>{LOGIN_TEXT.GOOGLE}</span>
                </button>
                <button 
                    className="social-btn"
                    onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/apple'}
                >
                    <AppleIcon className="social-icon-img" />
                    <span>{LOGIN_TEXT.APPLE}</span>
                </button>
            </div>
        </div>
    );
};
