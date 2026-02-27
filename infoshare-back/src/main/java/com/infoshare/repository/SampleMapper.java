package com.infoshare.repository;

import org.apache.ibatis.annotations.Mapper;
import com.infoshare.domain.Sample;
import java.util.List;
import java.util.Optional;

@Mapper
public interface SampleMapper {
    void insert(Sample sample);

    Optional<Sample> findById(Long id);

    List<Sample> findAll();
}
