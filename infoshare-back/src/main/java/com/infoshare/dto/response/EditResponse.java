package com.infoshare.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class EditResponse {
    private Long id;
    private String author;
    private String title;
    private String content;
    private List<PostFileResponse> files;
    private List<String> tags;
    private LocalDateTime editedAt;
}
