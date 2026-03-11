package com.infoshare.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.infoshare.common.dto.SearchResponseDto;
import com.infoshare.dto.response.SearchPostResponse;
import com.infoshare.service.SearchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/search")
public class SearchController {

    private final SearchService searchService;

    /**
     * 게시글 검색 및 페이징 조회 API
     * 명세서 기반 엔드포인트: /search/posts
     * 
     * @param page    페이지 번호 (기본값: 1)
     * @param size    페이지 당 게시글 수 (기본값: 10)
     * @param keyword 검색어 (제목 또는 내용)
     * @return 게시글 검색 결과 데이터 및 메타 정보
     */
    @GetMapping("/posts")
    public ResponseEntity<SearchResponseDto<SearchPostResponse>> searchPosts(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "category", required = false) String category) {

        SearchResponseDto<SearchPostResponse> response = searchService.searchPosts(page, size, keyword, category);
        return ResponseEntity.ok(response);
    }
}
