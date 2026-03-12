import React, { useState } from 'react';
import '../../styles/components/LoginForm.css';
import { LOGIN_TEXT, LOGIN_ICON } from '../../constants/LoginText';
import { Button } from '../common/Button';
import { LoginInputbox } from './LoginInputbox';
import { signupApi } from '../../api/authApiList';
import { useNavigate } from 'react-router-dom';

export const SignupForm: React.FC = () => {
    const navigate = useNavigate();

    // 폼 상태 관리
    const [name, setName] = useState('');
    const [username, _setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 입력값 검증
        if (!name || !username || !email || !password) {
            alert(LOGIN_TEXT.ERROR_MESSAGE);
            return;
        }

        try {
            // 회원가입 API 호출
            const response = await signupApi({ name, username, email, password });
            if (response) {
                alert(LOGIN_TEXT.SIGNUP_SUCCESS);
                navigate('/login');
            }
        } catch (error: any) {
            alert(error.response?.data?.error || LOGIN_TEXT.SIGNUP_ERROR);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <LoginInputbox
                icon={LOGIN_ICON.USER}
                label={LOGIN_TEXT.NAME}
                type="text"
                placeholder={LOGIN_TEXT.NAME}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <LoginInputbox
                icon={LOGIN_ICON.EMAIL}
                label={LOGIN_TEXT.EMAIL}
                type="email"
                placeholder={LOGIN_TEXT.PLACEHOLDER_EMAIL}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <LoginInputbox
                icon={LOGIN_ICON.PASSWORD}
                label={LOGIN_TEXT.PASSWORD}
                type="password"
                placeholder={LOGIN_TEXT.PLACEHOLDER_PASSWORD}
                isPassword={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" className="login-submit-btn">
                {LOGIN_TEXT.JOIN}
            </Button>
        </form>
    );
};
