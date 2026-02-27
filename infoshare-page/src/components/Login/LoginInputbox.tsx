import React, { useState } from 'react';
import { MaterialIcon } from '../../utils/MaterialIcon';
import '../../styles/components/LoginForm.css';
import { LOGIN_TEXT } from '../../constants/LoginText';

/**
 * InputBox 컴포넌트가 부모 컴포넌트(LoginForm)로부터 전달받을 수 있는 속성(Props)들을 정의합니다.
 * 기본적인 <input> 태그의 모든 속성을 사용할 수 있도록 React.InputHTMLAttributes를 확장했습니다.
 */
interface LoginInputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: string;
    showForgotPassword?: boolean;
    isPassword?: boolean;
}

export const LoginInputbox: React.FC<LoginInputBoxProps> = ({
    icon,
    showForgotPassword = false,
    isPassword = false,
    type,
    ...props
}) => {
    // 비밀번호 보이기/숨기기 상태를 관리하는 State
    const [showPassword, setShowPassword] = useState(false);

    // isPassword 속성이 켜져있을 경우: showPassword 상태에 따라 'text'와 'password'를 왔다갔다 합니다.
    // 일반 인풋일 경우: 부모가 넘겨준 type (예: 'email', 'text' 등)을 그대로 사용합니다.
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="form-group">
            {showForgotPassword ? (
                <div className="form-group-header">
                    <label>{LOGIN_TEXT.EMAIL}</label>
                    <a href="#" className="forgot-password">{LOGIN_TEXT.FORGOT_PASSWORD}</a>
                </div>
            ) : (
                <label>{LOGIN_TEXT.PASSWORD}</label>
            )}

            <div className="input-wrapper">
                <MaterialIcon icon={icon} className="input-icon" />
                <input
                    type={inputType}
                    className="form-input"
                    {...props}
                />

                {isPassword && (
                    <button
                        type="button"
                        className="visibility-btn"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <MaterialIcon icon={showPassword ? 'visibility_off' : 'visibility'} />
                    </button>
                )}
            </div>
        </div>
    );
};
