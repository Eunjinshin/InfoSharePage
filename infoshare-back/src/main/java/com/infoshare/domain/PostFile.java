package main.java.com.infoshare.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostFile {
    private Long id;
    private Long postId;
    private String originalFileName;
    private String storedFileName;
    private String filePath;
}
