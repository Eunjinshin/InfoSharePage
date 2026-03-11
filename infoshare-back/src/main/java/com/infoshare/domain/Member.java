package com.infoshare.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 회원(Member) 도메인 객체
 * 사용자 계정 관련 정보(일반 로그인, 소셜 로그인)를 저장하는 모델입니다.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    private Long id;                // 고유값 (PK)
    private String username;        // 로그인용 사용자가 입력한 아이디
    private String email;           // 사용자 이메일
    private String password;        // 암호화된 비밀번호 (소셜 로그인의 경우 비어있을 수 있음)
    private String name;            // 사용자의 실명 혹은 닉네임
    private String socialProvider;  // 회원가입 경로 식별자 (LOCAL, GOOGLE, APPLE 등)
    private String role;            // 인가된 권한 정보 (예: ROLE_USER, ROLE_ADMIN)
    private LocalDateTime createdAt;// 가입일
}
