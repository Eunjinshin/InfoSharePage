import { API_ERROR } from "../constants/AlertText";
import apiClient from "./apiClient";


/**
     * 1. 게시글 삭제 API (소프트 삭제)
     * 엔드포인트: /delete/posts/{postId}
     * 
     * @param postId 삭제할 게시글 ID
     * @return 삭제 완료 메시지
     */
export const deletePostApi = async (postId: number) => {
    try {
        const response = await apiClient.delete(`/delete/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error(API_ERROR.DELETE);
        throw new Error(API_ERROR.DELETE);
    }
}

/**
 * 2. 댓글 삭제 API
 * 엔드포인트: /delete/comments/{commentId}
 * 
 * @param commentId 삭제할 댓글 ID
 * @return 삭제 완료 메시지
 */
export const deleteCommentApi = async (commentId: number) => {
    try {
        const response = await apiClient.delete(`/delete/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.error(API_ERROR.DELETE);
        throw new Error(API_ERROR.DELETE);
    }
}