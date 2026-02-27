import { ALERT_FAIL } from '../constants/AlertText';

// ✅ 업로드 로직에 필요한 설정값들을 미리 상수로 정의해둡니다.
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB (바이트 단위)
const ALLOWED_EXTENSIONS = ['application/pdf', 'image/jpeg', 'image/png', 'application/zip', 'application/x-zip-compressed'];

/**
 * 첨부할 파일이 유효성(용량, 확장자, 중복 여부)을 통과하는지 검사합니다.
 * @param file 검사할 새 파일 객체
 * @param existingFiles 이미 첨부되어 있는 파일 목록 (중복 검사용)
 * @returns {string | null} 에러가 있을 경우 에러 메시지 문자열을 반환하고, 문제 없으면 null을 반환합니다.
 */
export const validateFile = (file: File, existingFiles: File[]): string | null => {
    // 1. 용량 검사 (10MB 초과 시 에러 메시지 반환)
    if (file.size > MAX_FILE_SIZE) {
        return ALERT_FAIL.FILE_UPLOAD.SIZE_EXCEEDED.replace('{fileName}', file.name);
    }

    // 2. 확장자 검사 (허용된 타입이 아닐 시 에러 메시지 반환)
    if (!ALLOWED_EXTENSIONS.includes(file.type) && !file.name.endsWith('.zip')) {
        return ALERT_FAIL.FILE_UPLOAD.UNSUPPORTED_FORMAT.replace('{fileName}', file.name);
    }

    // 3. 중복 파일 검사 (이름이 똑같은 파일이 있으면 에러 메시지 반환)
    if (existingFiles.some(f => f.name === file.name)) {
        return ALERT_FAIL.FILE_UPLOAD.DUPLICATE.replace('{fileName}', file.name);
    }

    return null; // 모든 검사를 통과하면 null 반환
};
