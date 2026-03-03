package com.infoshare.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
