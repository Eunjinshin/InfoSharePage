package main.java.com.infoshare.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class PostCreateRequest {
    private String author;
    private String title;
    private String content;
    private List<String> tags;
    private List<MultipartFile> files;
}
