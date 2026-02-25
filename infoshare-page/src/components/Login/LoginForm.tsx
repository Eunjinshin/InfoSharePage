import React from 'react';
import '../../styles/components/LoginForm.css';
import { LOGIN_TEXT, LOGIN_ICON } from '../../constants/LoginText';
import { InputBox } from '../common/Inputbox';
import { Button } from '../common/Button';

interface LoginFormProps {
    onLogin?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload
        // 로그인 후 메인 이동 로직 주석 처리 (사용자 요청)
        /*
        if (onLogin) {
            onLogin(); // Trigger login state change
        }
        */
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <InputBox
                icon={LOGIN_ICON.EMAIL}
                type="email"
                placeholder={LOGIN_TEXT.PLACEHOLDER_EMAIL}
            />

            <InputBox
                icon={LOGIN_ICON.PASSWORD}
                type="password"
                placeholder={LOGIN_TEXT.PLACEHOLDER_PASSWORD}
                isPassword={true}
                showForgotPassword={true}
            />

            <div className="remember-me">
                <input type="checkbox" id="remember" className="checkbox-input" />
                <label htmlFor="remember">{LOGIN_TEXT.REMEMBER_ME}</label>
            </div>

            <Button type="submit" className="login-submit-btn">
                {LOGIN_TEXT.SUBMIT}
            </Button>
        </form>
    );
};
