package com.infoshare.security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

/**
 * 모든 HTTP 요청마다 JWT 토큰의 유효성을 검사하는 필터
 */
@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        // request 헤더에서 Authorization 추출
        String authorization = request.getHeader("Authorization");

        // 토큰이 없거나 Bearer 로 시작하지 않으면 다음 필터로 넘김
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Bearer 접두사를 지우고 순수 토큰만 추출
        String token = authorization.split(" ")[1];

        // 토큰 만료 여부 검사
        if (jwtUtil.isTokenExpired(token)) {
            // 만료되었다면 거절 로직 처리 가능 (여기서는 우선 다음 필터로 그냥 넘깁니다.)
            filterChain.doFilter(request, response);
            return;
        }

        // 토큰에서 정보 추출
        String username = jwtUtil.getUsername(token);
        String role = jwtUtil.getRole(token);

        // Security Context에 인증 정보 저장 (UsernamePasswordAuthenticationToken 형식 사용)
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                username, null, Collections.singleton(new SimpleGrantedAuthority(role)));

        // 인증 성공 처리 및 SecurityContext에 등록 (이후 Controller 등에서 접근 가능)
        SecurityContextHolder.getContext().setAuthentication(authToken);

        // 다음 필터로 요청 전달
        filterChain.doFilter(request, response);
    }
}
