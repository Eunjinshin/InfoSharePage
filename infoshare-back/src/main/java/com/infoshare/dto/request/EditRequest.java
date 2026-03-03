package com.infoshare.dto.request;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditRequest {
    private String title;
    private String content;
    private List<String> tags;
    private List<MultipartFile> files;

    public void setTags(List<String> tags) {
        this.tags = com.infoshare.common.TagParserUtil.parseTags(tags);
    }
}
