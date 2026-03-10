package com.infoshare.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infoshare.dto.request.CommentUpdateRequest;
import com.infoshare.dto.request.EditRequest;
import com.infoshare.dto.response.EditResponse;
import com.infoshare.service.EditService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/edit")
@RequiredArgsConstructor
public class EditController {

    private final EditService editService;

    /**
     * 게시글 수정 API
     * 
     * @param request
     * @return
     */
    @PutMapping("/{id}")
    public ResponseEntity<EditResponse> editPost(@PathVariable Long id, @ModelAttribute EditRequest request) {
        EditResponse response = editService.editPost(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    /**
     * 댓글 수정 API
     *
     * @param commentId
     * @param request
     * @return
     */
    @PutMapping("/comments/{commentId}")
    public ResponseEntity<Map<String, String>> editComment(
            @PathVariable Long commentId,
            @RequestBody CommentUpdateRequest request) {
        editService.editComment(commentId, request);

        Map<String, String> response = new HashMap<>();
        response.put("message", "댓글이 수정되었습니다.");

        return ResponseEntity.ok(response);
    }
}
