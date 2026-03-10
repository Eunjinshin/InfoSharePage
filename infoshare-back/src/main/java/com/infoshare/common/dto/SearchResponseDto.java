package com.infoshare.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 범용 검색 및 페이징 응답용 DTO
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchResponseDto<T> {
    private List<T> data;
    private Meta meta;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Meta {
        private int currentPage;
        private int totalPages;
        private long totalElements;
    }

    /**
     * 중복해서 사용될 수 있는 page 계산 함수
     */
    public static <T> SearchResponseDto<T> of(List<T> data, int currentPage, long totalElements, int size) {
        int totalPages = size > 0 ? (int) Math.ceil((double) totalElements / size) : 0;
        Meta meta = new Meta(currentPage, totalPages, totalElements);
        return new SearchResponseDto<>(data, meta);
    }
}
