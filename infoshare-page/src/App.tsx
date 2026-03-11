
import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { MainPage } from './pages/MainPage';
import { BoardPage } from './pages/BoardPage';
import { DetailPage } from './pages/DetailPage';
import { WritePostPage } from './pages/WritePostPage';
import { CategoryPage } from './pages/CategoryPage';
import './App.css';

import { Layout } from './pages/Layout';

// 소셜 로그인 리다이렉트 시 전달된 토큰을 받아 저장하는 처리 컴포넌트
function OAuthRedirectHandler() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      localStorage.setItem('jwt_token', token);
      window.location.href = '/'; // 저장 후 메인페이지로 이동
    }
  }, [token]);

  return <div>로그인 처리중...</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/oauth/redirect" element={<OAuthRedirectHandler />} />
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/detail/:postId" element={<DetailPage />} />
          <Route path="/write" element={<WritePostPage />} />
          <Route path="/edit/:postId" element={<WritePostPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
