package com.infoshare.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.infoshare.domain.Post;
import com.infoshare.domain.Comment;
import com.infoshare.common.dto.PageRequestDto;
import com.infoshare.dto.response.PopularTagResponse;

@Mapper
public interface GetMapper {
    /** 게시글 페이징 검색 */
    List<Post> getPosts(PageRequestDto request);

    /** 게시글 전체 건수 (페이징용) */
    long countPosts(PageRequestDto request);

    /** 인기 게시글 목록 (조회수 내림차순) */
    List<Post> getPopularPosts(@Param("limit") int limit);

    /** 최신 게시글 목록 (작성일 내림차순) */
    List<Post> getLatestPosts(@Param("limit") int limit);

    /** 특정 게시글의 태그 목록 조회 */
    List<String> getTagsByPostId(@Param("postId") Long postId);

    /** 카테고리 목록 조회 (중복 제거) */
    List<String> getCategories();

    /** 게시글 상세 조회 (단건) */
    Post getPostById(@Param("postId") Long postId);

    /** 특정 게시글의 댓글 수 조회 */
    int getCommentCount(@Param("postId") Long postId);

    /** 특정 게시글의 전체 댓글 목록 조회 (flat 리스트) */
    List<Comment> getCommentsByPostId(@Param("postId") Long postId);

    /** 인기 태그 조회 */
    List<PopularTagResponse> getPopularTags(@Param("limit") int limit);

    /** 좋아요 등록 확인 (IP 기반) */
    int checkLikeStatus(@Param("postId") Long postId, @Param("userIp") String userIp);

    /** 댓글 좋아요 등록 확인 (IP 기반) */
    int checkCommentLikeStatus(@Param("commentId") Long commentId, @Param("userIp") String userIp);
}
