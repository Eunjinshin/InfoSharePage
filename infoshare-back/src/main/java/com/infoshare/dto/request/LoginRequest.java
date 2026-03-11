package com.infoshare.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * 일반 로그인 요청 시 클라이언트로부터 전달받는 DTO
 */
@Data
public class LoginRequest {

    @NotBlank(message = "아이디를 입력해주세요.")
    private String username;

    @NotBlank(message = "비밀번호를 입력해주세요.")
    private String password;
}
