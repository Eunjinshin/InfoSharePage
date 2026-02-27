import { useState, useEffect, useRef } from 'react';
import { ALERT_FAIL } from '../constants/AlertText';

const AUTOSAVE_DELAY = 30000; // 30초 (30,000ms)

/**
 * 변경되는 데이터를 감지하여 30초 동안 변화가 없을 때 로컬 스토리지에 자동 저장하는 훅
 * @param dataToSave 저장할 데이터 객체 (예: { title, content, tags ... })
 * @param storageKey 로컬 스토리지에 저장될 고유 키 이름
 * @returns { lastSavedTime } 마지막으로 저장된 시간
 */
export const useAutoSave = (dataToSave: any, storageKey: string = 'infoshare_draft_post') => {
    const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        // 첫 렌더링 시에는 저장하지 않음
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // 사용자가 타이핑 등 무언가 변경을 할 때마다 30초 타이머 세팅
        const timer = setTimeout(() => {
            try {
                localStorage.setItem(storageKey, JSON.stringify(dataToSave));
                setLastSavedTime(new Date());
            } catch (error) {
                console.error(ALERT_FAIL.AUTOSAVE.ERROR);
            }
        }, AUTOSAVE_DELAY);

        // 만약 30초가 다 되기 전에(진행 중일 때) 사용자가 다시 타이핑을 치면!
        // 훅이 다시 실행되면서 아래 cleanup 함수가 호출됨 -> 기존 타이머 취소 (처음부터 다시 30초 계산)
        // 이것이 바로 디바운스(Debounce) 핵심 로직입니다.
        return () => clearTimeout(timer);

    }, [dataToSave, storageKey]);

    return { lastSavedTime };
};
