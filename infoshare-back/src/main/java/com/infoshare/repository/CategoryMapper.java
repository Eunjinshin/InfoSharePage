package com.infoshare.repository;

import com.infoshare.domain.Category;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryMapper {
    /**
     * 모든 카테고리를 가져옵니다.
     * 
     * @return 카테고리 목록
     */
    List<Category> getAllCategories();
}
