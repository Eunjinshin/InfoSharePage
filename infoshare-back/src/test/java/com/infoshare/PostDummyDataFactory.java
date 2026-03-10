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

    // 테스트용 댓글(Comment) 객체 생성
    public static com.infoshare.domain.Comment createDummyComment(Long postId, Long parentId, String author,
            String content) {
        return com.infoshare.domain.Comment.builder()
                .postId(postId)
                .parentId(parentId)
                .author(author)
                .content(content)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
