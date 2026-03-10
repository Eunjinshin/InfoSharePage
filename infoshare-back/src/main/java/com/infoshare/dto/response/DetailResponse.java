package com.infoshare.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 게시글 상세 조회 전용 응답 DTO
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DetailResponse {
    private Long id; // 게시글 ID 
    private String title;
    private String content;
    private String category;

    /** 작성자 정보 (중첩 객체) */
    private AuthorDto author;

    private LocalDateTime publishedAt;

    private Integer views;
    private Integer commentCount;

    /** 게시글 추천(좋아요) 수 */
    private Integer likeCount;

    /** 현재 사용자가 이 게시글을 추천했는지 여부 */
    private boolean liked;

    /** 게시글에 등록된 태그 목록 */
    private List<String> tags;

    /**
     * 작성자 정보 내부 DTO
     */
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AuthorDto {
        private String name;
        /** 아바타 이미지 경로 (현재 미지원 시 null) */
        private String avatar;
    }
}
