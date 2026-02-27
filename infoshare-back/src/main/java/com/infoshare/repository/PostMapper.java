package main.java.com.infoshare.repository;

import com.infoshare.domain.Post;
import com.infoshare.domain.PostTag;
import main.java.com.infoshare.domain.PostFile;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostMapper {
    void insertPost(Post post);

    void insertPostTags(List<PostTag> tags);

    void insertPostFiles(List<PostFile> files);
}
