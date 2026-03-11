package com.infoshare.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * JWT 발급 및 검증 관련 기능을 제공하는 유틸리티 클래스
 * 사용자의 식별자(username)와 권한 등을 암호화하여 토큰으로 변환하거나, 
 * 전달받은 토큰을 분석해 내부 정보를 반환합니다.
 */
@Component
public class JwtUtil {

    private final SecretKey key;
    // 액세스 토큰 만료 시간 설정 (예: 1시간)
    private final long accessTokenExpTime = 1000L * 60 * 60;

    /**
     * application.yml 에 설정된 시크릿 키를 기반으로 서명 알고리즘에 쓰일 키를 초기화합니다.
     */
    public JwtUtil(@Value("${jwt.secret}") String secretKeyString) {
        byte[] keyBytes = secretKeyString.getBytes(StandardCharsets.UTF_8);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * 제공된 사용자의 아이디와 역할 정보를 이용해 새로운 JWT 토큰을 발급합니다.
     */
    public String createToken(String username, String role) {
        return Jwts.builder()
                .subject(username) // 토큰 주체(사용자 아이디)
                .claim("role", role) // 추가 클레임: 사용자 권한 관련 정보
                .issuedAt(new Date()) // 생성 시간
                .expiration(new Date(System.currentTimeMillis() + accessTokenExpTime)) // 만료 기한
                .signWith(key) // 보안 시크릿 키로 토큰 서명 적용
                .compact(); // 최종 토큰 문자열 생성 및 반환
    }

    /**
     * 주어진 문자열 형태의 토큰을 파싱하여, 내부에 담긴 데이터를 맵 형태의 Claims로 반환합니다.
     */
    public Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(key) // 보유한 서버 키로 서명 무결성 확인
                .build()
                .parseSignedClaims(token) // 토큰 파싱
                .getPayload(); // 해석된 클레임 반환
    }

    /**
     * 토큰 안에 저장되어있는 사용자 아이디(username)를 가져옵니다.
     */
    public String getUsername(String token) {
        return parseClaims(token).getSubject();
    }

    /**
     * 토큰 안에 저장되어있는 사용자 권한(role)을 가져옵니다.
     */
    public String getRole(String token) {
        return parseClaims(token).get("role", String.class);
    }

    /**
     * 토큰의 유효 기간(expiration)이 현재 시간을 지났는지 만료 여부를 판별합니다.
     */
    public boolean isTokenExpired(String token) {
        try {
            return parseClaims(token).getExpiration().before(new Date());
        } catch (Exception e) {
            // 토큰 파싱 오류 발생 시 비정상/만료된 것으로 간주하여 true 반환
            return true;
        }
    }
}
