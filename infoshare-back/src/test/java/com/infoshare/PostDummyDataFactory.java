package com.infoshare;

import com.infoshare.domain.Post;
import java.time.LocalDateTime;

public class PostDummyDataFactory {

    // 테스트용 게시글(Post) 객체 생성
    public static Post createDummyPost(Long id, String author, String title, String content, String category) {
        return Post.builder()
                .id(id)
                .author(author)
                .title(title)
                .content(content)
                .category(category)
                .createdAt(LocalDateTime.now())
                .editedAt(LocalDateTime.now())
                .viewCount(0)
                .likeCount(0)
                .build();
    }
}
