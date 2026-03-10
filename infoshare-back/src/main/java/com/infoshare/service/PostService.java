package com.infoshare.service;

import com.infoshare.domain.Post;
import com.infoshare.domain.PostTag;
import com.infoshare.domain.PostFile;
import com.infoshare.domain.Comment;
import com.infoshare.dto.request.PostCreateRequest;
import com.infoshare.dto.request.CommentRequest;
import com.infoshare.dto.response.PostResponse;
import com.infoshare.dto.response.PostFileResponse;
import com.infoshare.dto.response.UploadResult;
import com.infoshare.dto.response.CommentResponse;
import com.infoshare.dto.response.LikeResponse;
import com.infoshare.repository.PostMapper;
import com.infoshare.common.FileStore;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

        private final PostMapper postMapper;
        private final FileStore fileStore;

        /**
         * 1. 게시글 작성
         */
        @Transactional
        public PostResponse createPost(PostCreateRequest request) {

                // 1. 게시글 엔티티 생성 (DB 저장하여 ID 확보)
                Post post = Post.builder()
                                .author(request.getAuthor() != null ? request.getAuthor() : "guest")
                                .title(request.getTitle())
                                .content(request.getContent())
                                .category(request.getCategory())
                                .build();

                postMapper.insertPost(post);

                // 2. 파일 업로드 및 DB 저장 처리 (FileStore 컴포넌트 사용)
                List<PostFile> postFiles = new ArrayList<>();
                List<PostFileResponse> fileResponses = new ArrayList<>();

                List<UploadResult> uploadResults = fileStore.storeFiles(request.getFiles());

                for (UploadResult result : uploadResults) {
                        postFiles.add(PostFile.builder()
                                        .postId(post.getId())
                                        .originalFileName(result.getOriginalFileName())
                                        .storedFileName(result.getStoredFileName())
                                        .filePath(result.getFilePath())
                                        .build());

                        fileResponses.add(PostFileResponse.builder()
                                        .originalFileName(result.getOriginalFileName())
                                        .url("/uploads/" + result.getStoredFileName()) // 추후 정적 리소스 매핑 시 사용할 URL
                                        .build());
                }

                if (!postFiles.isEmpty()) {
                        postMapper.insertPostFiles(postFiles);
                }

                // 3. 태그 저장
                if (request.getTags() != null && !request.getTags().isEmpty()) {
                        // 먼저 tags 테이블에 Insert Ignore
                        postMapper.insertTags(request.getTags());

                        List<PostTag> tags = request.getTags().stream()
                                        .map(tag -> PostTag.builder()
                                                        .postId(post.getId())
                                                        .tag(tag)
                                                        .build())
                                        .collect(Collectors.toList());
                        postMapper.insertPostTags(tags);
                }

                // 4. 응답 DTO 반환
                return PostResponse.builder()
                                .id(post.getId())
                                .author(post.getAuthor())
                                .title(post.getTitle())
                                .content(post.getContent())
                                .category(post.getCategory())
                                .files(fileResponses)
                                .tags(request.getTags())
                                .createdAt(post.getCreatedAt())
                                .viewCount(0)
                                .likeCount(0)
                                .build();
        }

        /**
         * 2.댓글 등록
         *
         * @param request 댓글 작성 요청 DTO
         * @return 등록된 댓글 응답 DTO
         */
        @Transactional
        public CommentResponse createComment(CommentRequest request) {
                // 1. Comment 도메인 생성 및 DB 저장
                Comment comment = Comment.builder()
                                .postId(request.getPostId())
                                .parentId(request.getParentId())
                                .author(request.getAuthor() != null ? request.getAuthor() : "guest")
                                .content(request.getContent())
                                .createdAt(java.time.LocalDateTime.now())// 작성한 날짜 바로 출력
                                .build();

                postMapper.insertComment(comment);

                // 2. 응답 DTO 반환
                return CommentResponse.builder()
                                .id(comment.getId())
                                .postId(comment.getPostId())
                                .author(comment.getAuthor())
                                .content(comment.getContent())
                                .createdAt(comment.getCreatedAt())
                                .build();
        }

        /**
         * 3. 게시글 추천 토글 (IP 기반)
         *
         * @param postId 게시글 ID
         * @param userIp 사용자 IP
         * @return 갱신된 좋아요 상태 및 총합
         */
        @Transactional
        public LikeResponse togglePostLike(Long postId, String userIp) {
                int isLiked = postMapper.checkLikeStatus(postId, userIp);
                boolean currentLikeStatus;

                if (isLiked > 0) {
                        // 이미 추천한 상태 -> 취소
                        postMapper.deletePostLike(postId, userIp);
                        postMapper.decrementLikeCount(postId);
                        currentLikeStatus = false;
                } else {
                        // 추천하지 않은 상태 -> 추천
                        postMapper.insertPostLike(postId, userIp);
                        postMapper.incrementLikeCount(postId);
                        currentLikeStatus = true;
                }

                int totalLikes = postMapper.getLikeCount(postId);
                String message = currentLikeStatus ? "게시글을 추천했습니다." : "게시글 추천을 취소했습니다.";

                return LikeResponse.builder()
                                .liked(currentLikeStatus)
                                .totalLikes(totalLikes)
                                .message(message)
                                .build();
        }
}
