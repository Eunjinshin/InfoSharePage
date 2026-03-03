package com.infoshare.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infoshare.common.dto.PageResponseDto;
import com.infoshare.dto.response.GetResponse;
import com.infoshare.service.GetService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/get")
public class GetController {
    private final GetService getService;

    /**
     * 게시글 검색 API
     */
    @GetMapping
    public ResponseEntity<PageResponseDto<GetResponse>> getPosts(
            @ModelAttribute com.infoshare.common.dto.PageRequestDto request) {
        com.infoshare.common.dto.PageResponseDto<GetResponse> response = getService
                .getPosts(request);
        return ResponseEntity.ok(response);
    }
}
