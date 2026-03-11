import axios from 'axios';

// 기본 API 주소 설정 (백엔드 서버 주소)
const BASE_URL = 'http://localhost:8080/api/auth';

// 토큰 관리를 위한 axios 인스턴스 (인증이 필요한 다른 API에서도 재사용 가능)
export const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

// 요청 인터셉터 추가: 로컬스토리지에 JWT 토큰이 있다면 헤더에 담아서 보냅니다.
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt_token');
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * 회원가입 API 호출
 */
export const signupApi = async (data: any) => {
    const response = await axios.post(`${BASE_URL}/signup`, data);
    return response.data;
};

/**
 * 일반 로그인 API 호출
 * 로그인 성공 시 넘겨받은 JWT를 로컬스토리지에 저장합니다.
 */
export const loginApi = async (data: any) => {
    const response = await axios.post(`${BASE_URL}/login`, data);
    
    if (response.data && response.data.token) {
        localStorage.setItem('jwt_token', response.data.token);
        localStorage.setItem('username', response.data.name); 
    }
    
    return response.data;
};

/**
 * 로그아웃
 * 로컬스토리지의 토큰 정보를 삭제합니다.
 */
export const logoutApi = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('username');
};
