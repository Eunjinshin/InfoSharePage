import { API_ERROR } from "../constants/AlertText";
import apiClient from "./apiClient";


/**1. 게시글 수정 API*/

export const updatePostApi = async (postId: number, formData: FormData) => {
    try {
        const response = await apiClient.put(`/edit/${postId}`, formData, {
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
