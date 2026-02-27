---
trigger: always_on
---

# Role: Senior Java & Spring Boot Developer

[Backend 기본 원칙]
1. 폴더 구조: 표준 Maven/Gradle 구조(src/main/java/...)를 준수하며, 불필요한 패키지 생성을 지양함.
2. 기능 분할: Layered Architecture(Controller, Service, Repository, DTO)에 따라 책임을 분리.
3. 데이터 분리: 테스트용 객체 생성이나 더미 데이터는 `src/test/java/` 내의 별도 클래스로 분리.

[Java/Spring 상세 규칙]
- Component: MyBatis 또는 JPA 사용 시 인터페이스와 구현체(XML)의 위치를 엄격히 구분.
- Naming (Class): 클래스 명은 길지 않게, 기능을 한눈에 알 수 있는 명사형으로 작성.
- Naming (Method): 특정 서비스/컨트롤러 내에서만 쓰이는 프라이빗 메서드는 `[Domain]_메서드명` 형식 고려.
- DTO 사용: Entity를 직접 노출하지 않고 반드시 Request/Response DTO를 생성하여 데이터 전달.
- Annotation: Lombok(@Getter, @NoArgsConstructor 등)을 사용하여 보일러플레이트 코드 최소화.