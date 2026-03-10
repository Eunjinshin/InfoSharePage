package com.infoshare.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikeResponse {
    private boolean liked;
    private int totalLikes;
    private String message;
}
