package com.infoshare.controller;

import com.infoshare.dto.request.SampleRequest;
import com.infoshare.dto.response.SampleResponse;
import com.infoshare.service.SampleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/samples")
@RequiredArgsConstructor
public class SampleController {

    private final SampleService sampleService;

    @PostMapping
    public ResponseEntity<Long> createSample(@Valid @RequestBody SampleRequest request) {
        Long id = sampleService.createSample(request);
        return ResponseEntity.ok(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SampleResponse> getSample(@PathVariable Long id) {
        return ResponseEntity.ok(sampleService.getSample(id));
    }

    @GetMapping
    public ResponseEntity<List<SampleResponse>> getAllSamples() {
        return ResponseEntity.ok(sampleService.getAllSamples());
    }
}
