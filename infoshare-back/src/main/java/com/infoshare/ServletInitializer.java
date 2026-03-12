package com.infoshare;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

public class ServletInitializer extends SpringBootServletInitializer {

    /**
     * WAR 배포 방식: 우리는 서버에 이미 설치된 **외부 톰캣(Tomcat 9)**을 사용하기로 했죠?
     * 외부 톰캣은 여러분의 프로젝트 내부를 들여다볼 때 "어디가 시작점이야?"라고 묻습니다.
     * 이때 ServletInitializer가 "여기가 시작이야!"라고 알려주는 가이드 역할을 합니다.
     * @param application a builder for the application context
     * @return
     */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(InfoshareApplication.class);
    }

}
