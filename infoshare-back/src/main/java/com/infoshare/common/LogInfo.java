package main.java.com.infoshare.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class LogInfo {

    /**
     * 일반 정보 로깅
     */
    public void info(String message, Object... args) {
        log.info(message, args);
    }

    /**
     * 오류 로깅
     */
    public void error(String message, Object... args) {
        log.error(message, args);
    }

    /**
     * 경고 로깅
     */
    public void warn(String message, Object... args) {
        log.warn(message, args);
    }

    /**
     * 디버그 로깅
     */
    public void debug(String message, Object... args) {
        log.debug(message, args);
    }
}
