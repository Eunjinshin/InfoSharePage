package com.infoshare.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetResponse {
    private Long id;
    private String author;
    private String title;
    private String category;
    private LocalDateTime createdAt;
    private Integer viewCount;
    private Integer likeCount;
}
