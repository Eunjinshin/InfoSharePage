package com.infoshare.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 댓글 트리 구조 응답 DTO (재귀)
 * 게시글별 댓글 조회 시 사용
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentTreeResponse {
    private Long id;

    /** 작성자 정보 (중첩 객체) */
    private DetailResponse.AuthorDto author;
    private String content;
    private LocalDateTime createdAt;
    private boolean isAuthor;

    /** 대댓글 목록 (재귀 구조) */
    @Setter
    private List<CommentTreeResponse> replies;
}
