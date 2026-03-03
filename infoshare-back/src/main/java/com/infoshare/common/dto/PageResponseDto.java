package com.infoshare.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageResponseDto<T> {
    private List<T> content;
    private long totalElements;
    private int totalPages;

    // 중복해서 사용될 수 있는 page 계산 합수
    public static <T> PageResponseDto<T> of(List<T> content, long totalElements, int size) {
        int totalPages = size > 0 ? (int) Math.ceil((double) totalElements / size) : 0;
        return new PageResponseDto<>(content, totalElements, totalPages);
    }
}
