package com.infoshare.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * 소셜 로그인(OAuth2)이 성공적으로 완료되었을 때 실행되는 핸들러입니다.
 * 사용자 정보를 바탕으로 JWT를 발급하고, 프론트엔드로 접속을 리다이렉트합니다.
 */
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;

    public OAuth2SuccessHandler(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        // 이메일을 기준으로 토큰 생성 (CustomOAuth2UserService 로직에 맞춰 username 또는 email 활용)
        // 편의상 이메일을 주체로 사용합니다. 실제 서비스에서는 고유 username을 가져와야 합니다.
        String email = oAuth2User.getAttribute("email");
        String role = oAuth2User.getAuthorities().iterator().next().getAuthority();

        // JWT 토큰 생성
        String token = jwtUtil.createToken(email, role);

        // 프론트엔드의 토큰 처리 전용 경로로 리다이렉트 (쿼리 파라미터로 토큰 전달)
        String redirectUrl = "http://localhost:5173/oauth/redirect?token=" + token;

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
