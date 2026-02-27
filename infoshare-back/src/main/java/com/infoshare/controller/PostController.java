package main.java.com.infoshare.controller;

import com.infoshare.dto.request.PostCreateRequest;
import com.infoshare.dto.response.PostResponse;
import com.infoshare.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    /**
     * 게시글 등록 API
     * 파일과 JSON 데이터(텍스트 데이터)를 함께 받기 위해 @ModelAttribute 를 사용합니다.
     */
    @PostMapping
    public ResponseEntity<PostResponse> createPost(@ModelAttribute PostCreateRequest request) {
        PostResponse response = postService.createPost(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
