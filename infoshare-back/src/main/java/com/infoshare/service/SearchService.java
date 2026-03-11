package com.infoshare.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.infoshare.common.dto.PageRequestDto;
import com.infoshare.common.dto.SearchResponseDto;
import com.infoshare.domain.Post;
import com.infoshare.dto.response.SearchPostResponse;
import com.infoshare.repository.GetMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final GetMapper getMapper;

    /**
     * 게시글 검색 및 페이징 처리 로직
     * 
     * @param page    1-based 페이지 번호
     * @param size    페이지 크기
     * @param keyword 검색어
     * @return 페이징된 검색 결과
     */
    @Transactional(readOnly = true)
    public SearchResponseDto<SearchPostResponse> searchPosts(int page, int size, String keyword, String category) {
        try {
            // 기존 0-based PageRequestDto를 활용하기 위해 page - 1 변환
            PageRequestDto request = new PageRequestDto();
            request.setPage(Math.max(0, page - 1));
            request.setSize(size);
            request.setKeyword(keyword);
            request.setCategory(category);
            request.setSort("latest"); // 기본적으로 최신순 정렬

            long totalElements = getMapper.countPosts(request);
            List<Post> posts = getMapper.getPosts(request);

            List<SearchPostResponse> content = posts.stream()
                    .map(post -> {
                        List<String> tags = getMapper.getTagsByPostId(post.getId());
                        return SearchPostResponse.builder()
                                .id(post.getId())
                                .title(post.getTitle())
                                .author(post.getAuthor())
                                .createdAt(post.getCreatedAt())
                                .viewCount(post.getViewCount())
                                .tags(tags)
                                .build();
                    })
                    .collect(Collectors.toList());

            return SearchResponseDto.of(content, page, totalElements, size);
        } catch (Exception e) {
            e.printStackTrace(); // 500 에러 원인 파악을 위해 콘솔에 스택트레이스를 찍습니다.
            throw e;
        }
    }
}
