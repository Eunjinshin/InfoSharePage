package com.infoshare.repository;

import com.infoshare.domain.Post;
import com.infoshare.domain.PostTag;
import com.infoshare.domain.PostFile;
import com.infoshare.domain.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostMapper {
    /** 게시글 등록 */
    void insertPost(Post post);

    /** 태그 등록 (중복 무시) */
    void insertTags(List<String> tags);

    /** 게시글-태그 매핑 등록 */
    void insertPostTags(List<PostTag> tags);

    /** 게시글 첨부파일 등록 */
    void insertPostFiles(List<PostFile> files);

    /** 게시글 수정 */
    void updatePost(Post post);

    /** 게시글의 태그 전체 삭제 */
    void deletePostTags(Long postId);

    /** 댓글 등록 */
    void insertComment(Comment comment);
}
