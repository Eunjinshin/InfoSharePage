package com.infoshare.repository;

import com.infoshare.domain.Post;
import com.infoshare.domain.PostTag;
import com.infoshare.domain.PostFile;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostMapper {
    void insertPost(Post post);

    void insertTags(List<String> tags);

    void insertPostTags(List<PostTag> tags);

    void insertPostFiles(List<PostFile> files);

    void updatePost(Post post);

    void deletePostTags(Long postId);

    List<Post> getPosts(com.infoshare.common.dto.PageRequestDto request);

    long countPosts(com.infoshare.common.dto.PageRequestDto request);
}
