package com.infoshare.service;

import com.infoshare.domain.Post;
import com.infoshare.domain.PostTag;
import com.infoshare.domain.PostFile;
import com.infoshare.dto.request.PostCreateRequest;
import com.infoshare.dto.response.PostResponse;
import com.infoshare.dto.response.PostFileResponse;
import com.infoshare.dto.response.UploadResult;
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
}
