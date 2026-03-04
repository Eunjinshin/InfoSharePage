package com.infoshare.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 댓글 도메인 클래스
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    private Long id;
    private Long postId;
    private Long parentId;
    private String author;
    private String content;
    private LocalDateTime createdAt;
}
