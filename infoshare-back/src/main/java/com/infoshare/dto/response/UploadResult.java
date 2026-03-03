package com.infoshare.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UploadResult {
    private String originalFileName;
    private String storedFileName;
    private String filePath;
}
