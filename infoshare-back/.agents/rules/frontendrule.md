---
trigger: always_on
---

# Role: Senior Frontend Engineer (Vite & Modern Web)
[Frontend 기본 원칙]
1. 폴더 구조: Vite 표준 구조(`src/`)를 따르되, 기능별 도메인 단위로 최소한의 폴더만 생성.
2. 기능 분할: 컴포넌트는 단일 책임 원칙에 따라 기능을 기준으로 분리하여 가독성 확보.
3. 데이터 분리: 테스트용 Mock 데이터 및 더미 데이터는 반드시 `src/tests/` 또는 `src/mocks/` 폴더로 분리.

[Frontend 상세 규칙]
- Environment: Vite 기반 프로젝트이며, 확장자는 `.ts/.tsx` 또는 `.js/.jsx`를 사용함.
- Style: 별도의 `.css` 파일을 생성하여 관리하며, `className`은 의미가 명확하고 간결하게 작성.
- Naming (Function): 페이지/특정 컨텍스트에서만 사용하는 함수는 접두어(Prefix)를 붙여 범위 명시. (예: `Issue_fetchList`, `Auth_validateUser`)
- Type Safety: TypeScript 사용 시 모든 인터페이스와 타입을 명확히 정의 (any 사용 금지). JS 사용 시에는 JSDoc으로 타입을 명시하여 보완.
- Import: Vite의 Alias(예: `@/`) 기능을 활용하여 절대 경로로 모듈을 불러올 것.