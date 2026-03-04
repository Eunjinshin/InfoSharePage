package com.infoshare.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 게시글 상세 조회 전용 응답 DTO
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DetailResponse {
    private String title;
    private String content;
    private String category;

    /** 작성자 정보 (중첩 객체) */
    private AuthorDto author;

    private LocalDateTime publishedAt;

    private Integer views;
    private Integer commentCount;

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
