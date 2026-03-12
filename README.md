# InfoSharePage
정보 공유를 위한 전용 게시판 프로젝트입니다.

## 🛠 Tech Stack
프론트엔드와 백엔드가 분리된 구조이며, Java와 TypeScript를 주력으로 사용한 프로젝트

### Frontend
- React, TypeScript, Vite, CSS

### Backend
- Java 17, Spring Boot, Gradle

### DevOps & Deployment
- Oracle Cloud Infrastructure (OCI)
- GitHub Actions (CI/CD)
- Apache Tomcat 9

## 🚀 CI/CD & Deployment
이 프로젝트는 GitHub Actions를 통해 자동 배포됩니다.

1. **Build**: GitHub Actions에서 프론트엔드(React)를 빌드한 후, 그 결과물을 백엔드(Spring Boot) 정적 폴더에 포함시켜 하나의 `WAR` 파일로 빌드합니다.
2. **Transfer**: 빌드된 아티팩트는 SCP를 통해 OCI 인스턴스로 전송됩니다.
3. **Deploy**: SSH를 통해 원격 서버의 Tomcat을 재시작하며 최신 버전으로 교체 배포됩니다.
