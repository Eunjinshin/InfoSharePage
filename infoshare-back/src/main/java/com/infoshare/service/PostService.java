package main.java.com.infoshare.service;

import com.infoshare.domain.Post;
import com.infoshare.domain.PostTag;
import main.java.com.infoshare.domain.PostFile;
import main.java.com.infoshare.dto.request.PostCreateRequest;
import main.java.com.infoshare.dto.response.PostResponse;
import main.java.com.infoshare.dto.response.PostFileResponse;
import main.java.com.infoshare.repository.PostMapper;
import main.java.com.infoshare.common.LogInfo;
import main.java.com.infoshare.common.LogMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostMapper postMapper;
    private final LogInfo logInfo;

    @Value("${file.upload-dir:C:/infoshare_uploads/}")
    private String uploadDir;

    @Transactional
    public PostResponse createPost(PostCreateRequest request) {

        // 1. 게시글 엔티티 생성 (DB 저장하여 ID 확보)
        Post post = Post.builder()
                .author(request.getAuthor() != null ? request.getAuthor() : "guest")
                .title(request.getTitle())
                .content(request.getContent())
                .build();

        postMapper.insertPost(post);

        // 2. 파일 업로드 및 DB 저장 처리
        List<PostFile> postFiles = new ArrayList<>();
        List<PostFileResponse> fileResponses = new ArrayList<>();

        if (request.getFiles() != null && !request.getFiles().isEmpty()) {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                try {
                    Files.createDirectories(uploadPath);
                } catch (IOException e) {
                    throw new RuntimeException(LogMessage.DIR_CREATE_FAILED, e);
                }
            }

            for (MultipartFile file : request.getFiles()) {
                if (file.isEmpty())
                    continue;

                try {
                    String originalFilename = file.getOriginalFilename();
                    String extension = "";
                    if (originalFilename != null && originalFilename.contains(".")) {
                        extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                    }
                    String storedFileName = UUID.randomUUID().toString() + extension;
                    String filePath = uploadPath.resolve(storedFileName).toString();

                    file.transferTo(new File(filePath));
                    logInfo.info(LogMessage.FILE_SAVED, filePath);

                    postFiles.add(PostFile.builder()
                            .postId(post.getId())
                            .originalFileName(originalFilename)
                            .storedFileName(storedFileName)
                            .filePath(filePath)
                            .build());

                    fileResponses.add(PostFileResponse.builder()
                            .originalFileName(originalFilename)
                            .url("/uploads/" + storedFileName) // 추후 정적 리소스 매핑 시 사용할 URL
                            .build());

                } catch (IOException e) {
                    logInfo.error(LogMessage.FILE_STORE_FAILED, e.getMessage(), e);
                    throw new RuntimeException("Failed to store file", e);
                }
            }
        }

        if (!postFiles.isEmpty()) {
            postMapper.insertPostFiles(postFiles);
        }

        // 3. 태그 저장
        if (request.getTags() != null && !request.getTags().isEmpty()) {
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
                .files(fileResponses)
                .tags(request.getTags())
                .createdAt(post.getCreatedAt())
                .build();
    }
}
