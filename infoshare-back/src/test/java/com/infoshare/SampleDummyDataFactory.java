package com.infoshare;

import com.infoshare.domain.Sample;

public class SampleDummyDataFactory {

    // 테스트용 객체 생성
    public static Sample createDummySample(Long id, String title, String content) {
        return Sample.builder()
                .id(id)
                .title(title)
                .content(content)
                .build();
    }
}
