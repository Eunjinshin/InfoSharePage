package com.infoshare.service;

import com.infoshare.domain.Member;
import com.infoshare.dto.request.LoginRequest;
import com.infoshare.dto.request.SignupRequest;
import com.infoshare.dto.response.AuthResponse;
import com.infoshare.mapper.MemberMapper;
import com.infoshare.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 일반 회원가입 및 로그인 처리를 담당하는 비즈니스 로직 클래스입니다.
 */
@Service
public class AuthService {

    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(MemberMapper memberMapper, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.memberMapper = memberMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * 회원가입 로직: 아이디/이메일 중복 체크 후, 비밀번호를 해싱하여 DB에 저장합니다.
     */
    @Transactional
    public void signup(SignupRequest request) {
        // 아이디 중복 확인
        if (memberMapper.countByUsername(request.getUsername()) > 0) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }
        // 이메일 중복 확인
        if (memberMapper.countByEmail(request.getEmail()) > 0) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        // 비밀번호 인코딩 (BCrypt 적용)
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        // 모델 생성 및 DB 삽입
        Member member = Member.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(encodedPassword)
                .name(request.getName())
                .socialProvider("LOCAL")
                .role("ROLE_USER")
                .build();

        memberMapper.insertMember(member);
    }

    /**
     * 일반 로그인 로직: 사용자 검증 후 성공 시 JWT 토큰이 포함된 응답을 반환합니다.
     */
    public AuthResponse login(LoginRequest request) {
        Member member = memberMapper.findByUsername(request.getUsername());

        // 아이디 및 비밀번호 (BCrypt 비교) 검증
        if (member == null || !passwordEncoder.matches(request.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        // 로그인 성공 시 JWT 생성
        String token = jwtUtil.createToken(member.getUsername(), member.getRole());

        return AuthResponse.builder()
                .token(token)
                .name(member.getName())
                .role(member.getRole())
                .build();
    }
}
