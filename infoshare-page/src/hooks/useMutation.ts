import { useState, useCallback } from 'react';

/**
 * 데이터를 생성, 수정, 삭제하는 API (POST, PUT, DELETE) 등에 사용되는 커스텀 훅입니다.
 * 중복되는 useState(로딩, 에러 상태 관리)를 줄이기 위해 사용합니다.
 * 
 * @param apiFunction 실행할 API 함수
 * @returns { mutate, isLoading, error, data }
 */
export const useMutation = <T, Args extends any[]>(apiFunction: (...args: Args) => Promise<T>) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    const mutate = useCallback(
        async (...args: Args) => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await apiFunction(...args);
                setData(result);
                return result;
            } catch (err: any) {
                const errorMessage = err.message || '요청 처리 중 오류가 발생했습니다.';
                setError(errorMessage);
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [apiFunction]
    );

    return { mutate, isLoading, error, data };
};
