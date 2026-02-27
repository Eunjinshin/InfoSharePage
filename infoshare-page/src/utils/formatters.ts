/**
 * 파일의 바이트(Bytes) 크기를 읽기 쉬운 단위(KB, MB, GB 등) 문자열로 변환합니다.
 * @param bytes 변환할 파일의 크기 (바이트 단위)
 * @returns {string} 변환된 포맷 문자열 (예: "1.24 MB")
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    // 로그(Math.log)를 이용해 단위 계산
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // 단위에 맞게 숫자를 나누고, 소수점 둘째 자리까지 잘라낸 뒤 단위를 붙임
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
