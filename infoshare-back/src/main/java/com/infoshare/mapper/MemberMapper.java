package com.infoshare.mapper;

import com.infoshare.domain.Member;
import org.apache.ibatis.annotations.Mapper;

/**
 * 회원(Member) 정보 관리를 위한 MyBatis 매퍼 인터페이스
 */
@Mapper
public interface MemberMapper {

    /**
     * 새로운 회원을 데이터베이스에 등록합니다.
     */
    void insertMember(Member member);

    /**
     * 아이디 기반으로 회원을 조회합니다. (일반 로그인 시 사용)
     */
    Member findByUsername(String username);

    /**
     * 이메일 기반으로 회원을 조회합니다. (소셜 로그인 및 중복 검사 시 사용)
     */
    Member findByEmail(String email);

    /**
     * 지정된 아이디가 이미 존재하는지 개수를 세어 반환합니다.
     */
    int countByUsername(String username);

    /**
     * 지정된 이메일이 이미 존재하는지 개수를 세어 반환합니다.
     */
    int countByEmail(String email);
}
