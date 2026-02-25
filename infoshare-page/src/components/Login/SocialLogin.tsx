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
                <button className="social-btn">
                    <GoogleIcon className="social-icon-img" />
                    <span>{LOGIN_TEXT.GOOGLE}</span>
                </button>
                <button className="social-btn">
                    <AppleIcon className="social-icon-img" />
                    <span>{LOGIN_TEXT.APPLE}</span>
                </button>
            </div>
        </div>
    );
};
