package com.infoshare.security;

import com.infoshare.domain.Member;
import com.infoshare.mapper.MemberMapper;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.UUID;

/**
 * 구글, 애플 등 소셜 로그인 공급자로부터 사용자 정보를 받아와
 * 내부 DB의 Member 정보와 연동시키는 서비스 구현체입니다.
 */
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberMapper memberMapper;

    public CustomOAuth2UserService(MemberMapper memberMapper) {
        this.memberMapper = memberMapper;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        
        // 기본 OAuth2UserService를 통해 리소스 서버(소셜 제공자)로부터 사용자 정보를 가져옵니다.
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        // 구글, 애플 등 설정된 제공자 이름 식별 (예: "google")
        String provider = userRequest.getClientRegistration().getRegistrationId();
        
        // OAuth2 공급자마다 전달해주는 데이터 속성 이름이 다를 수 있어 고유한 키 값을 추출합니다.
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        Map<String, Object> attributes = oAuth2User.getAttributes();
        
        // 이메일과 이름을 추출합니다. 제공자에 따라 구조가 다를 수 있으므로 여기서는 구글을 기준으로 합니다.
        // 향후 애플 연동 시 분기 처리가 추가되어야 할 수 있습니다.
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");

        if (email == null) {
            throw new OAuth2AuthenticationException("이메일 정보가 제공되지 않았습니다.");
        }

        // DB에서 기존 가입자인지 확인합니다.
        Member existingMember = memberMapper.findByEmail(email);
        
        String role = "ROLE_USER";
        String username;

        if (existingMember != null) {
            // 이미 가입된 회원이면 정보 업데이트 방식 혹은 그대로 로그인 처리
            username = existingMember.getUsername();
            role = existingMember.getRole();
        } else {
            // 미가입 사용자면 자동 회원가입 로직 처리
            username = provider + "_" + UUID.randomUUID().toString().substring(0, 8);
            
            Member newMember = Member.builder()
                    .username(username)
                    .email(email)
                    .password("") // 소셜 로그인이므로 비밀번호는 비워둡니다.
                    .name(name != null ? name : "소셜사용자")
                    .socialProvider(provider.toUpperCase())
                    .role(role)
                    .build();
            
            memberMapper.insertMember(newMember);
        }

        // Spring Security의 DefaultOAuth2User 형태로 반환
        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(role)),
                attributes,
                userNameAttributeName
        );
    }
}
