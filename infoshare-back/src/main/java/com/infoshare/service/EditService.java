package com.infoshare.service;

import com.infoshare.dto.request.CommentUpdateRequest;
import com.infoshare.dto.request.EditRequest;
import com.infoshare.dto.response.EditResponse;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.infoshare.common.FileStore;
import com.infoshare.domain.Comment;
import com.infoshare.domain.Post;
import com.infoshare.domain.PostFile;
import com.infoshare.domain.PostTag;
import com.infoshare.dto.response.PostFileResponse;
import com.infoshare.dto.response.UploadResult;
import com.infoshare.repository.PostMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EditService {

    private final PostMapper postMapper;
    private final FileStore fileStore;

    @Transactional
    public EditResponse editPost(Long id, EditRequest request) {

        // 1. 게시글 수정 (제목, 내용)
        Post post = Post.builder()
                .id(id)
                .title(request.getTitle())
                .content(request.getContent())
                .build();

        postMapper.updatePost(post);

        // 2. 새로운 파일 첨부 처리 (새 파일이 있다면 추가)
        List<PostFileResponse> fileResponses = new ArrayList<>();
        if (request.getFiles() != null && !request.getFiles().isEmpty()) {
            List<PostFile> postFiles = new ArrayList<>();
            List<UploadResult> uploadResults = fileStore.storeFiles(request.getFiles());

            for (UploadResult result : uploadResults) {
                postFiles.add(PostFile.builder()
                        .postId(id)
                        .originalFileName(result.getOriginalFileName())
                        .storedFileName(result.getStoredFileName())
                        .filePath(result.getFilePath())
                        .build());

                fileResponses.add(PostFileResponse.builder()
                        .originalFileName(result.getOriginalFileName())
                        .url("/uploads/" + result.getStoredFileName())
                        .build());
            }

            if (!postFiles.isEmpty()) {
                postMapper.insertPostFiles(postFiles);
            }
        }

        // 3. 태그 갱신
        // 기존 태그 연결 해제
        postMapper.deletePostTags(id);

        // 새 태그 연결
        if (request.getTags() != null && !request.getTags().isEmpty()) {
            // 태그 자체 정보 (tags 테이블) 보존 차원에서 삽입 시도
            postMapper.insertTags(request.getTags());

            List<PostTag> tags = request.getTags().stream()
                    .map(tag -> PostTag.builder()
                            .postId(id)
                            .tag(tag)
                            .build())
                    .collect(Collectors.toList());
            postMapper.insertPostTags(tags);
        }

        // 4. 응답 전송용 객체 반환
        return new EditResponse(
                id,
                null, // 저자는 수정하지 않으므로 변경된 정보로 내려주지 않거나, 필요 시 DB에서 재조회해야 함 (클라이언트 캐싱 활용)
                request.getTitle(),
                request.getContent(),
                fileResponses, // 여기서는 새로 업로드한 파일 목록만 응답에 포함
                request.getTags(),
                LocalDateTime.now() // 현재 시간을 임시 반환 (실제로는 DB에서 재조회 권장)
        );
    }

    @Transactional
    public void editComment(Long id, CommentUpdateRequest request) {
        Comment comment = Comment.builder()
                .id(id)
                .content(request.getContent())
                .build();
        postMapper.updateComment(comment);
    }
}
