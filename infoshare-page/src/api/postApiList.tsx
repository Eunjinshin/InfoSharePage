import { API_ERROR } from "../constants/AlertText";
import apiClient from "./apiClient";

/**
 * 1. 게시글 등록 API
 * 파일과 JSON 데이터(텍스트 데이터)를 함께 받기 위해 @ModelAttribute 를 사용합니다.
 */
export const createPostApi = async (formData: FormData) => {
    try {
        const response = await apiClient.post('/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error(API_ERROR.POST.ERROR);
        throw new Error(API_ERROR.POST.ERROR);
    }

}



/**2. 댓글 작성 API (대댓글 포함)
 * parentId가 null이면 최상위 댓글, 값이 있으면 대댓글
 **/
export interface CommentRequest {
    postId: number;
    content: string;
    parentId: number | null; // null이면 최상위 댓글, 값이 있으면 대댓글
}

export const createCommentApi = async (commentData: CommentRequest) => {
    try {
        const response = await apiClient.post('/posts/comment', commentData);
        return response.data;
    } catch (error) {
        console.error(API_ERROR.POST.ERROR);
        throw new Error(API_ERROR.POST.ERROR);
    }
}

/**
 * 3. 게시글 추천(좋아요) 토글 API
 * 
 * @param postId 게시글 ID
 * @returns 추천 상태 및 카운트
 */
export const togglePostLikeApi = async (postId: number) => {
    try {
        // 백엔드 엔드포인트: POST /posts/{postId}/likes
        const response = await apiClient.post(`/posts/${postId}/likes`);
        return response.data;
    } catch (error) {
        console.error(API_ERROR.POST.ERROR);
        throw new Error(API_ERROR.POST.ERROR);
    }
}

/**
 * 4. 댓글 추천(좋아요) 토글 API
 * 
 * @param commentId 댓글 ID
 * @returns 추천 상태 및 카운트
 */
export const toggleCommentLikeApi = async (commentId: number) => {
    try {
        // 백엔드 엔드포인트: POST /posts/comment/{commentId}/likes
        const response = await apiClient.post(`/posts/comment/${commentId}/likes`);
        return response.data;
    } catch (error) {
        console.error(API_ERROR.POST.ERROR);
        throw new Error(API_ERROR.POST.ERROR);
    }
}
