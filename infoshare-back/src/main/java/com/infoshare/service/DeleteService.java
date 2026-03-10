package com.infoshare.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.infoshare.repository.PostMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DeleteService {

    private final PostMapper postMapper;

    /**
     * 게시글 소프트 삭제
     * 
     * @param postId 삭제할 게시글 ID
     */
    @Transactional
    public void deletePost(Long postId) {
        postMapper.softDeletePost(postId);
    }

    /**
     * 댓글 물리 삭제
     * 
     * @param commentId 삭제할 댓글 ID
     */
    @Transactional
    public void deleteComment(Long commentId) {
        postMapper.deleteComment(commentId);
    }
}
