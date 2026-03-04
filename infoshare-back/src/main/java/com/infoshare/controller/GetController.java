package com.infoshare.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.infoshare.common.dto.PageResponseDto;
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
            @RequestParam(defaultValue = "5") int limit) {
        List<MainPostResponse> response = getService.getPopularPosts(limit);
        return ResponseEntity.ok(response);
    }

    /**
     * 3. 최신 게시글 목록 조회 API (작성일 내림차순)
     */
    @GetMapping("/latest")
    public ResponseEntity<List<MainPostResponse>> getLatestPosts(
            @RequestParam(defaultValue = "5") int limit) {
        List<MainPostResponse> response = getService.getLatestPosts(limit);
        return ResponseEntity.ok(response);
    }
}
