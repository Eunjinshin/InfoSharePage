import { createPostApi } from '../api/postApiList';
import { API_ERROR } from '../constants/AlertText';
import { useNavigate } from 'react-router-dom';
import { useMutation } from './useMutation';

export const useSubmitPost = () => {
    // 공통 커스텀 훅인 useMutation을 사용하여 로딩, 에러 상태를 쉽게 관리합니다.
    const { mutate, isLoading } = useMutation(createPostApi);
    const navigate = useNavigate();

    // 여러 개의 상태를 파라미터로 받아서 실행하는 함수
    const submitPost = async (title: string, content: string, categoryName: string, tags: string[] = []) => {
        try {
            const formData = new FormData();

            // 💡 백엔드에서 @ModelAttribute 파라미터를 사용하기 때문에
            // JSON Blob 형태가 아닌, 폼 필드 각각의 값으로 전송해야 스프링이 제대로 인식합니다.
            formData.append("title", title);
            // 백엔드에는 id가 아닌 카테고리 이름을 문자열로 전송합니다
            formData.append("category", categoryName);
            formData.append("content", content); // 복구

            // 태그 배열을 전송 (스프링 컨버터에 맞게 여러개의 tags 필드로 전송)
            tags.forEach(tag => formData.append("tags", tag));

            // 첨부파일 데이터(FileUpload) 연동하여 formData에 append 합니다.
            // files.forEach(file => formData.append("files", file));

            // 공통 API 함수 (useMutation) 실행
            const response = await mutate(formData);

            // 등록 성공
            console.log("등록 완료:", response);
            alert(API_ERROR.POST.SUCCESS);

            // 등록한 게시글의 ID를 가져옵니다. (응답 구조에 따라 data.id 또는 id 확인)
            const postId = response.data?.id || response.id;

            // 등록 후 상세 페이지로 이동
            if (postId) {
                navigate(`/detail/${postId}`);
            } else {
                navigate('/board'); // ID를 찾을 수 없으면 목록으로 이동
            }

        } catch (error: any) {
            // postApiList.tsx에서 throw 한 에러 메시지를 띄워줍니다.
            alert(error.message || '게시글 등록에 실패했습니다.');
        }
    };

    return { submitPost, isLoading };
};
