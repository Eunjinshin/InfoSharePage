import { useState, useCallback } from 'react';
import { validateFile } from '../utils/fileValidation';

// 💡 훅에서 반환할 데이터 타입 정의
interface UseFileUploadReturn {
    files: File[];
    isDragging: boolean;
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeFile: (fileName: string) => void;
}

interface UseFileUploadOptions {
    onError?: (errorMessage: string) => void;
}

/**
 * 훅(Hook): 파일 업로드에 관련된 모든 비즈니스 로직을 이 안에서 처리합니다.
 * @param options 선택적 옵션 (onError 등)
 * @returns {UseFileUploadReturn} 화면을 그리는 데 필요한 상태와 함수들을 객체로 묶어서 반환합니다.
 */
export const useFileUpload = (options?: UseFileUploadOptions): UseFileUploadReturn => {

    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    // 💡 내부 함수: 넘겨받은 파일들이 업로드 가능한지(용량/확장자) 검사하고 상태에 추가합니다.
    const processFiles = useCallback((newFiles: File[]) => {
        const validFiles: File[] = [];

        newFiles.forEach((file) => {
            // utils에 빼둔 검사 함수(validateFile)를 실행
            const errorMessage = validateFile(file, files);

            if (errorMessage) {
                if (options?.onError) {
                    options.onError(errorMessage);
                } else {
                    alert(errorMessage); // 콜백이 없으면 기존처럼 기본 alert 띄우기
                }
                return;
            }

            validFiles.push(file);
        });

        if (validFiles.length > 0) {
            setFiles(prev => [...prev, ...validFiles]);
        }
    }, [files]);


    // ========== [이벤트 핸들러 함수들] ========== //

    // 1️⃣ 사용자가 파일을 끌어서 박스 "위로" 가져왔을 때
    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // 웹 브라우저가 파일을 새 탭에서 열어버리는 기본 동작 방지
        setIsDragging(true); // "드래그 중이다" 상태로 변경 -> 화면 CSS 변경
    }, []);

    // 2️⃣ 사용자가 드래그하던 파일을 박스 "밖으로" 다시 빼냈을 때
    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false); // 원래 상태로 원상 복구
    }, []);

    // 3️⃣ 사용자가 드래그하던 파일을 박스 안에 "놓았을 때 (Drop)"
    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        // e.dataTransfer.files 로 드롭된 파일 정보 추출 
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) {
            processFiles(droppedFiles); // 위에서 만든 검사/저장 로직 돌리기
        }
    }, [processFiles]);

    // 4️⃣ 마우스로 박스를 "클릭"해서 파일 탐색기 창으로 파일을 선택했을 때
    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            processFiles(selectedFiles); // 파일 선택 시 내부 로직 돌리기
        }
    }, [processFiles]);

    // 5️⃣ 사용자가 X 버튼을 눌러 목록에서 특정 파일을 "삭제"할 때
    const removeFile = useCallback((fileName: string) => {
        // 지우려는 파일이랑 이름이 '다른' 파일들만 다시 모아서 저장 => 삭제 효과
        setFiles(prev => prev.filter(file => file.name !== fileName));
    }, []);


    // 🚀 화면 렌더링에 필요한 핵심 상태와 함수만 추출해서 컴포넌트(FileUpload.tsx)에 던져줍니다.
    return {
        files,
        isDragging,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleFileSelect,
        removeFile
    };
};
