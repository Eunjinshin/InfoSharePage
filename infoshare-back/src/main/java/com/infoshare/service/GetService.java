package com.infoshare.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.infoshare.domain.Post;
import com.infoshare.dto.response.GetResponse;
import com.infoshare.dto.response.MainPostResponse;
import com.infoshare.repository.GetMapper;
import com.infoshare.util.PostConverter;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GetService {
        private final GetMapper getMapper;

        /**
         * 게시글 페이징 검색
         */
        @Transactional(readOnly = true)
        public com.infoshare.common.dto.PageResponseDto<GetResponse> getPosts(
                        com.infoshare.common.dto.PageRequestDto request) {
                long totalElements = getMapper.countPosts(request);
                List<Post> posts = getMapper.getPosts(request);

                // 공통 변환 유틸 사용
                List<GetResponse> content = posts.stream()
                                .map(PostConverter::toGetResponse)
                                .collect(Collectors.toList());

                return com.infoshare.common.dto.PageResponseDto.of(content, totalElements, request.getSize());
        }

        /**
         * 인기 게시글 목록 조회 (조회수 내림차순)
         */
        @Transactional(readOnly = true)
        public List<MainPostResponse> getPopularPosts(int limit) {
                List<Post> posts = getMapper.getPopularPosts(limit);
                return convertToMainPosts(posts);
        }

        /**
         * 최신 게시글 목록 조회 (작성일 내림차순)
         */
        @Transactional(readOnly = true)
        public List<MainPostResponse> getLatestPosts(int limit) {
                List<Post> posts = getMapper.getLatestPosts(limit);
                return convertToMainPosts(posts);
        }

        /**
         * Post 리스트 → MainPostResponse 리스트 변환 (태그 포함)
         */
        private List<MainPostResponse> convertToMainPosts(List<Post> posts) {
                return posts.stream()
                                .map(post -> {
                                        List<String> tags = getMapper.getTagsByPostId(post.getId());
                                        return PostConverter.toMainPostResponse(post, tags);
                                })
                                .collect(Collectors.toList());
        }
}
