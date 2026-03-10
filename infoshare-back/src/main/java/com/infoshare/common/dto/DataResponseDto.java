package com.infoshare.common.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 배열 형태의 데이터를 "data" 필드로 감싸서 반환하는 범용 응답 DTO
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DataResponseDto<T> {
    private List<T> data;
}
