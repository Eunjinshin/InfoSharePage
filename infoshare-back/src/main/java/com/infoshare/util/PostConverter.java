package com.infoshare.util;

import com.infoshare.domain.Post;
import com.infoshare.dto.response.GetResponse;
import com.infoshare.dto.response.MainPostResponse;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * Post 도메인 → Response DTO 변환 유틸
 * 여러 Service에서 중복되는 매핑 로직을 한 곳에서 관리
 */
public class PostConverter {

    /** 날짜 포맷: yyyy-MM-dd */
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    // 인스턴스 생성 차단
    private PostConverter() {
    }

    /**
     * Post → GetResponse (게시글 목록 조회용)
     */
    public static GetResponse toGetResponse(Post post) {
        return GetResponse.builder()
                .id(post.getId())
                .author(post.getAuthor())
                .title(post.getTitle())
                .category(post.getCategory())
                .createdAt(post.getCreatedAt())
                .viewCount(post.getViewCount())
                .likeCount(post.getLikeCount())
                .build();
    }

    /**
     * Post → MainPostResponse (인기/최신 게시글용)
     * 
     * @param post 게시글 도메인
     * @param tags 해당 게시글의 태그 목록
     */
    public static MainPostResponse toMainPostResponse(Post post, List<String> tags) {
        // category + tags를 합쳐서 categoryOrTags 구성
        List<String> categoryOrTags = new ArrayList<>();
        if (post.getCategory() != null && !post.getCategory().isEmpty()) {
            categoryOrTags.add(post.getCategory());
        }
        if (tags != null) {
            categoryOrTags.addAll(tags);
        }

        // 날짜 포맷 변환
        String date = post.getCreatedAt() != null
                ? post.getCreatedAt().format(DATE_FORMAT)
                : null;

        return MainPostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .authorName(post.getAuthor())
                .authorAvatar(null) // 현재 DB에 아바타 컬럼 없음
                .categoryOrTags(categoryOrTags)
                .views(post.getViewCount())
                .date(date)
                .build();
    }
}
