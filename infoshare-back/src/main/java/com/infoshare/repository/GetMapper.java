package com.infoshare.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.infoshare.domain.Post;
import com.infoshare.common.dto.PageRequestDto;

@Mapper
public interface GetMapper {
    List<Post> getPosts(PageRequestDto request);

    long countPosts(PageRequestDto request);
}
