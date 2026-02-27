package main.java.com.infoshare.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class PostFileResponse {
    private String originalFileName;
    private String url;
}
