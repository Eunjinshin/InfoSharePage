package com.infoshare.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infoshare.service.DeleteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/delete")
public class DeleteController {

    private final DeleteService deleteService;

    /**
     * 1. 게시글 삭제 API (소프트 삭제)
     * 엔드포인트: /delete/posts/{postId}
     * 
     * @param postId 삭제할 게시글 ID
     * @return 삭제 완료 메시지
     */
    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<Map<String, String>> deletePost(@PathVariable("postId") Long postId) {
        deleteService.deletePost(postId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "게시글이 삭제되었습니다.");

        return ResponseEntity.ok(response);
    }

    /**
     * 2. 댓글 삭제 API
     * 엔드포인트: /delete/comments/{commentId}
     * 
     * @param commentId 삭제할 댓글 ID
     * @return 삭제 완료 메시지
     */
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Map<String, String>> deleteComment(@PathVariable("commentId") Long commentId) {
        deleteService.deleteComment(commentId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "댓글이 삭제되었습니다.");

        return ResponseEntity.ok(response);
    }
}
