package com.infoshare.common;

import com.infoshare.dto.response.UploadResult;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class FileStore {

    private final LogInfo logInfo;

    @Value("${file.upload-dir:C:/infoshare_uploads/}")
    private String uploadDir;

    /**
     * 여러 개의 멀티파트 파일을 저장소에 저장하고 결과를 리스트로 반환합니다.
     */
    public List<UploadResult> storeFiles(List<MultipartFile> multipartFiles) {
        List<UploadResult> storeFileResult = new ArrayList<>();
        if (multipartFiles == null || multipartFiles.isEmpty()) {
            return storeFileResult;
        }

        // 1. 디렉토리 생성 확인
        createUploadDirectoryIfNotExist();

        for (MultipartFile multipartFile : multipartFiles) {
            if (!multipartFile.isEmpty()) {
                storeFileResult.add(storeFile(multipartFile));
            }
        }
        return storeFileResult;
    }

    /**
     * 단일 파일을 저장소에 물리적으로 저장하고 그 결과를 반환합니다.
     */
    private UploadResult storeFile(MultipartFile multipartFile) {
        if (multipartFile.isEmpty()) {
            return null;
        }

        String originalFilename = multipartFile.getOriginalFilename();
        String storedFileName = createStoreFileName(originalFilename);
        String filePath = Paths.get(uploadDir).resolve(storedFileName).toString();

        try {
            multipartFile.transferTo(new File(filePath));
            logInfo.info(LogMessage.FILE_SAVED, filePath);
        } catch (IOException e) {
            logInfo.error(LogMessage.FILE_STORE_FAILED, e.getMessage(), e);
            throw new RuntimeException("Failed to store file", e);
        }

        return UploadResult.builder()
                .originalFileName(originalFilename)
                .storedFileName(storedFileName)
                .filePath(filePath)
                .build();
    }

    /**
     * 업로드 폴더가 없으면 생성합니다.
     */
    private void createUploadDirectoryIfNotExist() {
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            try {
                Files.createDirectories(uploadPath);
            } catch (IOException e) {
                throw new RuntimeException(LogMessage.DIR_CREATE_FAILED, e);
            }
        }
    }

    /**
     * 업로드된 파일의 원본 이름에서 고유한 UUID 파일명을 생성합니다.
     */
    private String createStoreFileName(String originalFilename) {
        String ext = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    /**
     * 원본 파일명에서 확장자를 추출합니다.
     */
    private String extractExt(String originalFilename) {
        if (originalFilename == null || !originalFilename.contains(".")) {
            return "";
        }
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }
}
