package com.infoshare.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 인기/최신 게시글 전용 응답 DTO
 * 메인 페이지에서 사용
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MainPostResponse {
    private Long id;
    private String title;
    private String authorName;

    /** 작성자 아바타 이미지 경로 (현재 미지원, null) */
    private String authorAvatar;

    /** 카테고리 + 태그 조합 목록 */
    private List<String> categoryOrTags;
    private Integer views;
    private String date;
}
