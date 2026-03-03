package com.infoshare.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.infoshare.domain.Post;
import com.infoshare.dto.response.GetResponse;
import com.infoshare.repository.GetMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GetService {
    private final GetMapper getMapper;

    @Transactional(readOnly = true)
    public com.infoshare.common.dto.PageResponseDto<GetResponse> getPosts(
            com.infoshare.common.dto.PageRequestDto request) {
        long totalElements = getMapper.countPosts(request);
        List<Post> posts = getMapper.getPosts(request);

        List<GetResponse> content = posts.stream()
                .map(post -> GetResponse.builder()
                        .id(post.getId())
                        .author(post.getAuthor())
                        .title(post.getTitle())
                        .category(post.getCategory())
                        .createdAt(post.getCreatedAt())
                        .viewCount(post.getViewCount())
                        .likeCount(post.getLikeCount())
                        .build())
                .collect(Collectors.toList());

        return com.infoshare.common.dto.PageResponseDto.of(content, totalElements, request.getSize());
    }

}
