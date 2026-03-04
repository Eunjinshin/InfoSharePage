package com.infoshare.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.infoshare.domain.Comment;
import com.infoshare.domain.Post;
import com.infoshare.dto.response.CommentTreeResponse;
import com.infoshare.dto.response.DetailResponse;
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

        /**
         * 카테고리 목록 조회
         */
        @Transactional(readOnly = true)
        public List<String> getCategories() {
                return getMapper.getCategories();
        }

        /**
         * 게시글 상세 조회
         */
        @Transactional(readOnly = true)
        public DetailResponse getPostDetail(Long postId) {
                Post post = getMapper.getPostById(postId);
                int commentCount = getMapper.getCommentCount(postId);
                return PostConverter.toDetailResponse(post, commentCount);
        }

        /**
         * 게시글별 댓글 트리 조회
         *
         * @param postId 게시글 ID
         * @return 트리 구조 댓글 목록 (최상위 댓글 + 대댓글)
         */
        @Transactional(readOnly = true)
        public List<CommentTreeResponse> getCommentTree(Long postId) {
                // 1. 게시글 작성자 조회 (isAuthor 판별용)
                Post post = getMapper.getPostById(postId);
                String postAuthor = post != null ? post.getAuthor() : "";

                // 2. 해당 게시글의 전체 댓글을 flat 리스트로 조회
                List<Comment> allComments = getMapper.getCommentsByPostId(postId);

                // 3. parentId 기준으로 그룹핑 (null 키 = 최상위 댓글)
                Map<Long, List<Comment>> childrenMap = allComments.stream()
                                .filter(c -> c.getParentId() != null)
                                .collect(Collectors.groupingBy(Comment::getParentId));

                // 4. 최상위 댓글만 추출하여 트리 빌드
                return allComments.stream()
                                .filter(c -> c.getParentId() == null)
                                .map(c -> buildTree(c, childrenMap, postAuthor))
                                .collect(Collectors.toList());
        }

        /**
         * 재귀적으로 댓글 트리 구성
         *
         * @param comment     현재 댓글
         * @param childrenMap parentId → 자식 댓글 리스트 맵
         * @param postAuthor  게시글 작성자 (isAuthor 판별용)
         */
        private CommentTreeResponse buildTree(Comment comment,
                        Map<Long, List<Comment>> childrenMap, String postAuthor) {

                // 대댓글 재귀 빌드
                List<CommentTreeResponse> replies = new ArrayList<>();
                List<Comment> children = childrenMap.get(comment.getId());
                if (children != null) {
                        for (Comment child : children) {
                                replies.add(buildTree(child, childrenMap, postAuthor));
                        }
                }

                return CommentTreeResponse.builder()
                                .id(comment.getId())
                                .author(DetailResponse.AuthorDto.builder()
                                                .name(comment.getAuthor())
                                                .avatar(null) // 현재 미지원
                                                .build())
                                .content(comment.getContent())
                                .createdAt(comment.getCreatedAt())
                                .isAuthor(comment.getAuthor() != null
                                                && comment.getAuthor().equals(postAuthor))
                                .replies(replies)
                                .build();
        }
}
