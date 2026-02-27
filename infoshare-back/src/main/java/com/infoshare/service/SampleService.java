package com.infoshare.service;

import com.infoshare.domain.Sample;
import com.infoshare.dto.request.SampleRequest;
import com.infoshare.dto.response.SampleResponse;
import com.infoshare.repository.SampleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SampleService {

    private final SampleMapper sampleMapper;

    @Transactional
    public Long createSample(SampleRequest request) {
        Sample sample = Sample_createFromRequest(request);
        sampleMapper.insert(sample);
        return sample.getId();
    }

    public SampleResponse getSample(Long id) {
        Sample sample = sampleMapper.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Sample not found"));
        return SampleResponse.from(sample);
    }

    public List<SampleResponse> getAllSamples() {
        return sampleMapper.findAll().stream()
                .map(SampleResponse::from)
                .collect(Collectors.toList());
    }

    // Naming (Method) 규칙 적용: [Domain]_메서드명
    private Sample Sample_createFromRequest(SampleRequest request) {
        return Sample.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .build();
    }
}
