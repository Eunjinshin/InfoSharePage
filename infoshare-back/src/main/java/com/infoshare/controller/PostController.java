package com.infoshare.controller;

import com.infoshare.dto.request.PostCreateRequest;
import com.infoshare.dto.request.CommentRequest;
import com.infoshare.dto.response.PostResponse;
import com.infoshare.dto.response.CommentResponse;
import com.infoshare.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    /**
     * 1.게시글 등록 API
     * 파일과 JSON 데이터(텍스트 데이터)를 함께 받기 위해 @ModelAttribute 를 사용합니다.
     */
    @PostMapping
    public ResponseEntity<PostResponse> createPost(@ModelAttribute PostCreateRequest request) {
        PostResponse response = postService.createPost(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * 2. 댓글 작성 API (대댓글 포함)
     * parentId가 null이면 최상위 댓글, 값이 있으면 대댓글
     */
    @PostMapping("/comment")
    public ResponseEntity<CommentResponse> createComment(@RequestBody CommentRequest request) {
        CommentResponse response = postService.createComment(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * 3. 게시글 추천(좋아요) 토글 API
     */
    @PostMapping("/{postId}/likes")
    public ResponseEntity<com.infoshare.dto.response.LikeResponse> togglePostLike(
            @org.springframework.web.bind.annotation.PathVariable("postId") Long postId,
            jakarta.servlet.http.HttpServletRequest request) {
        String userIp = request.getRemoteAddr();
        com.infoshare.dto.response.LikeResponse response = postService.togglePostLike(postId, userIp);
        return ResponseEntity.ok(response);
    }

    /**
     * 4. 댓글 추천(좋아요) 토글 API
     */
    @PostMapping("/comment/{commentId}/likes")
    public ResponseEntity<com.infoshare.dto.response.LikeResponse> toggleCommentLike(
            @org.springframework.web.bind.annotation.PathVariable("commentId") Long commentId,
            jakarta.servlet.http.HttpServletRequest request) {
        String userIp = request.getRemoteAddr();
        com.infoshare.dto.response.LikeResponse response = postService.toggleCommentLike(commentId, userIp);
        return ResponseEntity.ok(response);
    }

}
