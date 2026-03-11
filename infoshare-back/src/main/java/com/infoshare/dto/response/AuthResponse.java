package com.infoshare.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

/**
 * 로그인/회원가입 등 인증 성공 시 클라이언트에 반환하는 DTO
 * JWT 토큰 등을 포함합니다.
 */
@Data
@Builder
@AllArgsConstructor
public class AuthResponse {
    
    // 발급된 JWT (Access Token)
    private String token;
    
    // 사용자 식별용 이름 (화면 표시에 활용될 닉네임)
    private String name;
    
    // 권한 정보
    private String role;
}
