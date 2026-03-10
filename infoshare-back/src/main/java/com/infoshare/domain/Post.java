package com.infoshare.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    private Long id;
    private String author;
    private String title;
    private String content;
    private String category;
    private LocalDateTime createdAt;
    private LocalDateTime editedAt;
    private Integer viewCount;
    private Integer likeCount;
    private Boolean isDeleted;
}
