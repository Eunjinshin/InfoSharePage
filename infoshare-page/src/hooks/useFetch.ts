import { useState, useEffect, useCallback } from 'react';

/**
 * 컴포넌트 마운트 시 API를 호출하고 상태(데이터, 로딩, 에러)를 관리하는 커스텀 훅입니다.
 * 중복되는 useState(로딩, 에러 상태 관리)를 줄이기 위해 사용합니다.
 * 
 * @param apiFunction 데이터를 가져올 API 함수
 * @param initialArgs API 호출 시 전달할 인자 배열
 * @returns { data, isLoading, error, refetch } API 응답 데이터, 로딩 상태, 에러 메시지, 다시 호출할 수 있는 함수
 */
export const useFetch = <T,>(apiFunction: (...args: any[]) => Promise<T>, ...initialArgs: any[]) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(
        async () => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await apiFunction(...initialArgs);
                setData(result);
            } catch (err: any) {
                setError(err.message || '데이터를 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [apiFunction, JSON.stringify(initialArgs)]
    );

    useEffect(() => {
        execute();
    }, [execute]);

    return { data, isLoading, error, refetch: execute };
};
