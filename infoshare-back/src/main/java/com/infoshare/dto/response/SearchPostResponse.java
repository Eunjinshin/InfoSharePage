package com.infoshare.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 게시글 검색 결과 항목 응답 DTO
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchPostResponse {
    private Long id;
    private String title;
    private String author;
    private LocalDateTime createdAt;
    private Integer viewCount;
    private List<String> tags;
}
