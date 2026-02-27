package main.java.com.infoshare.common;

public class LogMessage {
    // INFO Messages
    public static final String FILE_SAVED = "File saved to: {}";

    // ERROR Messages
    public static final String FILE_STORE_FAILED = "Failed to store file: {}";
    public static final String DIR_CREATE_FAILED = "Failed to create upload directory";

    // 인스턴스화 방지
    private LogMessage() {
        throw new IllegalStateException("Utility class");
    }
}
