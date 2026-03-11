import React, { useState } from 'react';
import '../../styles/components/LoginForm.css';
import { LOGIN_TEXT, LOGIN_ICON } from '../../constants/LoginText';
import { Button } from '../common/Button';
import { LoginInputbox } from './LoginInputbox';
import { loginApi } from '../../api/authApiList';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
    onLogin?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // 페이지 새로고침 방지

        if (!username || !password) {
            alert('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            // 로그인 API 호출
            const response = await loginApi({ username, password });
            if (response && response.token) {
                // 부모에서 넘겨준 콜백이 있다면 실행 (예: 헤더 상태 업데이트)
                if (onLogin) {
                    onLogin();
                }
                navigate('/'); // 로그인 성공 시 메인으로 이동
            }
        } catch (error: any) {
            alert(error.response?.data?.error || '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <LoginInputbox
                icon={LOGIN_ICON.EMAIL}
                type="text"
                placeholder={LOGIN_TEXT.PLACEHOLDER_EMAIL}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <LoginInputbox
                icon={LOGIN_ICON.PASSWORD}
                type="password"
                placeholder={LOGIN_TEXT.PLACEHOLDER_PASSWORD}
                isPassword={true}
                showForgotPassword={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
