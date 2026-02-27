package com.infoshare.dto.response;

import com.infoshare.domain.Sample;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SampleResponse {
    private Long id;
    private String title;
    private String content;

    public static SampleResponse from(Sample sample) {
        return new SampleResponse(sample.getId(), sample.getTitle(), sample.getContent());
    }
}
