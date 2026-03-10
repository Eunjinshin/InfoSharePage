package com.infoshare.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.infoshare.common.dto.PageResponseDto;
import com.infoshare.dto.response.CommentTreeResponse;
import com.infoshare.dto.response.DetailResponse;
import com.infoshare.dto.response.GetResponse;
import com.infoshare.dto.response.MainPostResponse;
import com.infoshare.service.GetService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/get")
public class GetController {
    private final GetService getService;

    /**
     * 1. 게시글 페이징 검색 API
     */
    @GetMapping
    public ResponseEntity<PageResponseDto<GetResponse>> getPosts(
            @ModelAttribute com.infoshare.common.dto.PageRequestDto request) {
        PageResponseDto<GetResponse> response = getService.getPosts(request);
        return ResponseEntity.ok(response);
    }

    /**
     * 2. 인기 게시글 목록 조회 API (조회수 내림차순)
     */
    @GetMapping("/popular")
    public ResponseEntity<List<MainPostResponse>> getPopularPosts(
            @RequestParam int limit) {
        List<MainPostResponse> response = getService.getPopularPosts(limit);
        return ResponseEntity.ok(response);
    }

    /**
     * 3. 최신 게시글 목록 조회 API (작성일 내림차순)
     */
    @GetMapping("/latest")
    public ResponseEntity<List<MainPostResponse>> getLatestPosts(
            @RequestParam int limit) {
        List<MainPostResponse> response = getService.getLatestPosts(limit);
        return ResponseEntity.ok(response);
    }

    /**
     * 4. 카테고리 목록 조회 API (사이드바, 글쓰기 폼용)
     */
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        List<String> response = getService.getCategories();
        return ResponseEntity.ok(response);
    }

    /**
     * 5. 게시글 상세 조회 API
     */
    @GetMapping("/detail/{postId}")
    public ResponseEntity<DetailResponse> getPostDetail(
            @PathVariable Long postId,
            jakarta.servlet.http.HttpServletRequest request) {
        String userIp = request.getRemoteAddr();
        DetailResponse response = getService.getPostDetail(postId, userIp);
        return ResponseEntity.ok(response);
    }

    /**
     * 6. 게시글별 댓글 트리 조회 API
     */
    @GetMapping("/comments/{postId}")
    public ResponseEntity<List<CommentTreeResponse>> getComments(
            @PathVariable Long postId,
            jakarta.servlet.http.HttpServletRequest request) {
        String userIp = request.getRemoteAddr();
        List<CommentTreeResponse> response = getService.getCommentTree(postId, userIp);
        return ResponseEntity.ok(response);
    }

    /**
     * 7. 인기 태그 목록 추출 API
     */
    @GetMapping("/tags/popular")
    public ResponseEntity<com.infoshare.common.dto.DataResponseDto<com.infoshare.dto.response.PopularTagResponse>> getPopularTags(
            @RequestParam(defaultValue = "10") int limit) {
        List<com.infoshare.dto.response.PopularTagResponse> tags = getService.getPopularTags(limit);
        com.infoshare.common.dto.DataResponseDto<com.infoshare.dto.response.PopularTagResponse> response = new com.infoshare.common.dto.DataResponseDto<>(
                tags);
        return ResponseEntity.ok(response);
    }
}
