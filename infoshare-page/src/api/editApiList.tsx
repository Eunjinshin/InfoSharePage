import { API_ERROR } from "../constants/AlertText";
import apiClient from "./apiClient";


/**1. 게시글 수정 API*/

export interface PostRequest {
    title: string;
    content: string;
    categoryId: number;
}

export const updatePostApi = async (postId: number, postData: PostRequest) => {
    try {
        const response = await apiClient.put(`/edit/${postId}`, postData);
        return response.data;
    } catch (error) {
        console.error(API_ERROR.POST.ERROR);
        throw new Error(API_ERROR.POST.ERROR);
    }
}
