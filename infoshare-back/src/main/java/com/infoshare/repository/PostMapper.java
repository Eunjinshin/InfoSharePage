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

    /** 게시글 소프트 삭제 */
    void softDeletePost(Long postId);

    /** 게시글의 태그 전체 삭제 */
    void deletePostTags(Long postId);

    /** 댓글 등록 */
    void insertComment(Comment comment);

    /** 댓글 내용 수정 */
    void updateComment(Comment comment);

    /** 댓글 물리 삭제 */
    void deleteComment(Long commentId);

    /** 좋아요 등록 확인 */
    int checkLikeStatus(@org.apache.ibatis.annotations.Param("postId") Long postId,
            @org.apache.ibatis.annotations.Param("userIp") String userIp);

    /** 좋아요 추가 */
    void insertPostLike(@org.apache.ibatis.annotations.Param("postId") Long postId,
            @org.apache.ibatis.annotations.Param("userIp") String userIp);

    /** 좋아요 삭제 */
    void deletePostLike(@org.apache.ibatis.annotations.Param("postId") Long postId,
            @org.apache.ibatis.annotations.Param("userIp") String userIp);

    /** 게시글 좋아요 수 증가 */
    void incrementLikeCount(@org.apache.ibatis.annotations.Param("postId") Long postId);

    /** 게시글 좋아요 수 감소 */
    void decrementLikeCount(@org.apache.ibatis.annotations.Param("postId") Long postId);

    /** 조아요 수 반환 */
    int getLikeCount(@org.apache.ibatis.annotations.Param("postId") Long postId);

    // ====== 댓글 좋아요 ======

    /** 댓글 좋아요 등록 확인 */
    int checkCommentLikeStatus(@org.apache.ibatis.annotations.Param("commentId") Long commentId,
            @org.apache.ibatis.annotations.Param("userIp") String userIp);

    /** 댓글 좋아요 추가 */
    void insertCommentLike(@org.apache.ibatis.annotations.Param("commentId") Long commentId,
            @org.apache.ibatis.annotations.Param("userIp") String userIp);

    /** 댓글 좋아요 삭제 */
    void deleteCommentLike(@org.apache.ibatis.annotations.Param("commentId") Long commentId,
            @org.apache.ibatis.annotations.Param("userIp") String userIp);

    /** 댓글 좋아요 수 증가 */
    void incrementCommentLikeCount(@org.apache.ibatis.annotations.Param("commentId") Long commentId);

    /** 댓글 좋아요 수 감소 */
    void decrementCommentLikeCount(@org.apache.ibatis.annotations.Param("commentId") Long commentId);

    /** 댓글 좋아요 수 반환 */
    int getCommentLikeCount(@org.apache.ibatis.annotations.Param("commentId") Long commentId);
}
