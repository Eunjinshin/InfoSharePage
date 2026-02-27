package main.java.com.infoshare.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class PostResponse {
    private Long id;
    private String author;
    private String title;
    private String content;
    private List<PostFileResponse> files;
    private List<String> tags;
    private LocalDateTime createdAt;
}
