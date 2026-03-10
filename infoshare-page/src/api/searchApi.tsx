import { API_ERROR } from "../constants/AlertText";
import apiClient from "./apiClient";


/**
    * 게시글 검색 및 페이징 조회 API
    * 명세서 기반 엔드포인트: /search/posts
    * 
    * @param page    페이지 번호 (기본값: 1)
    * @param size    페이지 당 게시글 수 (기본값: 10)
    * @param keyword 검색어 (제목 또는 내용)
    * @return 게시글 검색 결과 데이터 및 메타 정보
    */

export const searchPostsApi = async (page: number = 1, size: number = 10, keyword: string) => {
    try {
        const response = await apiClient.get(`/search/posts?page=${page}&size=${size}&keyword=${keyword}`);
        return response.data;
    } catch (error) {
        console.error(API_ERROR.POST.ERROR);
        throw new Error(API_ERROR.POST.ERROR);
    }
}