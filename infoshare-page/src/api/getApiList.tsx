import { API_ERROR } from "../constants/AlertText";
import apiClient from "./apiClient";


/**
* 1. 게시글 페이징 검색 API
*/
export const getPostsApi = async () => {
    try {
        const response = await apiClient.get("/get");
        return response.data;
    } catch (error) {
        console.error(API_ERROR.GET);
        throw error;
    }
}



/**
 * 2. 인기 게시글 목록 조회 API (조회수 내림차순)
 * @param limit 가져올 게시글 수 (기본값: 6)
 */
export const getPopularPostsApi = async (limit: number = 6) => {
    try {
        const response = await apiClient.get("/get/popular", { params: { limit } });
        return response.data;
    } catch (error) {
        console.error(API_ERROR.GET);
        throw error;
    }
};


/**
 * 3. 최신 게시글 목록 조회 API (작성일 내림차순)
 * @param limit 가져올 게시글 수 (기본값: 5)
 */
export const getLatestPostsApi = async (limit: number = 5) => {
    try {
        const response = await apiClient.get("/get/latest", { params: { limit } });
        return response.data;
    } catch (error) {
        console.error(API_ERROR.GET);
        throw error;
    }
};

/**
 * 4. 카테고리 목록 가져오기
 * @returns 
 */
export const getCategoriesApi = async () => {
    try {
        const response = await apiClient.get("/get/categories");
        return response.data;
    } catch (error) {
        console.error(API_ERROR.GET);
        throw error;
    }
};

/**
* 5. 게시글 상세 조회 API
*/
export const getPostDetailApi = async (postId: number) => {
    try {
        const response = await apiClient.get(`/get/detail/${postId}`);
        return response.data;
    } catch (error) {
        console.error(API_ERROR.GET);
        throw error;
    }
};


/**
* 6. 게시글별 댓글 트리 조회 API
*/
export const getCommentsApi = async (postId: number) => {
    try {
        const response = await apiClient.get(`/get/comments/${postId}`);
        return response.data;
    } catch (error) {
        console.error(API_ERROR.GET);
        throw error;
    }
};

/**
* 7. 인기 태그 목록 추출 API
*/
export const getPopularTagsApi = async (limit: number = 10) => {
    try {
        const response = await apiClient.get(`/get/tags/popular?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error(API_ERROR.GET);
        throw error;
    }
}

