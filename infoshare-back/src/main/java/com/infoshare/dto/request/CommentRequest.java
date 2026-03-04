package com.infoshare.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 댓글 작성 요청 DTO
 */
@Getter
@Setter
@NoArgsConstructor
public class CommentRequest {
    private Long postId;

    /** 부모 댓글 ID (대댓글 시 필수, 최상위 댓글이면 null) */
    private Long parentId;
    private String author;
    private String content;
}
