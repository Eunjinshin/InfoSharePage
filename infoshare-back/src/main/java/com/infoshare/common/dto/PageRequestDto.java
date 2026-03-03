package com.infoshare.common.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageRequestDto {
    private int page = 0;
    private int size = 10;
    private String category;
    private String keyword;
    private String sort = "latest"; // latest, views, likes

    // 중복해서 사용될 수 있는 offset 계산 함수
    public int getOffset() {
        return Math.max(0, page * size);
    }
}
