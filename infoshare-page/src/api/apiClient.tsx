import axios from "axios";

// Vite에서는 환경변수를 import.meta.env 로 가져와야 합니다. (REACT_APP_ 대신 VITE_ 접두사 사용)
const API_BASE_URL = import.meta.env.VITE_API_URL;
const default_header = {
    'Content-Type': 'application/json',
}

const apiClient = axios.create({
    baseURL: '/',
    headers: default_header,
});

// 요청(Request) 인터셉터
apiClient.interceptors.request.use(function (config) {
    // request가 서버에 보내지기 전에 실행 (예: 로컬 스토리지에서 토큰을 가져와 헤더에 추가)
    // console.log("요청 전송 전:", config);
    return config;
}, function (error) {
    // 요청 오류 처리
    return Promise.reject(error);
});

// 응답(Response) 인터셉터
apiClient.interceptors.response.use(function (response) {
    // 응답 데이터를 가공하거나 처리 (예: response.data 만 바로 반환하도록 수정 가능)
    // console.log("응답 데이터:", response);
    return response;
}, function (error) {
    // 응답 오류 처리 (예: 401 권한 없음 에러 시 로그인 페이지로 튕겨내기 등)
    // console.error("API 오류 발생:", error);
    return Promise.reject(error);
});

export default apiClient;
