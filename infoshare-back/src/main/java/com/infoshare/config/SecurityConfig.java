package com.infoshare.config;

import com.infoshare.security.CustomOAuth2UserService;
import com.infoshare.security.JwtFilter;
import com.infoshare.security.OAuth2SuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Spring Security 관련 핵심 설정값을 초기화하는 클래스
 * 사용자가 요청한 사항에 맞추어 비밀번호 해시, Stateless 세션 정책 등을 수립합니다.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;

    public SecurityConfig(JwtFilter jwtFilter, 
                          CustomOAuth2UserService customOAuth2UserService,
                          OAuth2SuccessHandler oAuth2SuccessHandler) {
        this.jwtFilter = jwtFilter;
        this.customOAuth2UserService = customOAuth2UserService;
        this.oAuth2SuccessHandler = oAuth2SuccessHandler;
    }

    /**
     * 회원가입 및 인증 과정에서 비밀번호를 암호화하기 위해 BCrypt 객체를 빈으로 등록합니다.
     * (사용자 요청 반영: SHA-256 대신 Security의 BCrypt를 우선 사용)
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * HTTP 통신에 적용될 보안 정책(CORS, CSRF, 인증 요구 경로 등)을 설정합니다.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // REST API 방식으로 동작하므로 CSRF 방어 비활성화
            .csrf(AbstractHttpConfigurer::disable)
            // 기본 폼 로그인 비활성화
            .formLogin(AbstractHttpConfigurer::disable)
            // Http Basic 인증 비활성화
            .httpBasic(AbstractHttpConfigurer::disable)
            // JWT를 사용할 예정이므로 서버에서 세션을 생성하지 않도록 STATELESS 정책 설정
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // 우선 모든 API 경로를 허용하도록 설정 (이후 필터를 작성해 제어 예정)
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            )
            // OAuth2 소셜 로그인 설정 (구글, 애플 등)
            .oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService))
                .successHandler(oAuth2SuccessHandler)
            )
            // 커스텀으로 작성한 JwtFilter를 UsernamePasswordAuthenticationFilter 이전에 동작하도록 등록
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
