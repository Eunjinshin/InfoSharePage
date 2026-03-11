package com.infoshare.controller;

import com.infoshare.dto.request.LoginRequest;
import com.infoshare.dto.request.SignupRequest;
import com.infoshare.dto.response.AuthResponse;
import com.infoshare.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 회원가입(Signup) 및 일반 로그인(Login) 요청을 처리하는 컨트롤러 클래스
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * 프론트엔드로부터 회원가입 데이터를 받아 처리합니다.
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
        try {
            authService.signup(request);
            // 프론트엔드에서 성공 여부를 파악할 수 있도록 상태 메시지 반환
            return ResponseEntity.ok(Map.of("message", "회원가입이 성공적으로 완료되었습니다."));
        } catch (IllegalArgumentException e) {
            // 중복된 아이디나 이메일 등의 비즈니스 예외 처리
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * 프론트엔드로부터 로그인 데이터를 받아 처리하고 JWT 토큰을 반환합니다.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            // 비밀번호 불일치 등의 예외 처리
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
