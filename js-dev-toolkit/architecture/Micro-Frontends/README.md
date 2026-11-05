# Micro Frontends (마이크로 프론트엔드)

## 한 줄 요약

> 백화점(Shell App)에 각 브랜드(팀)가 자신의 매장(Micro Frontend)을 입점시킨다.
> 매장은 독립적으로 운영되지만, 백화점의 엘리베이터와 전기는 공유한다.

## 학습 순서

| 파일 | 주제 | 핵심 키워드 |
|---|---|---|
| [01_overview.md](./01_overview.md) | 개요 / 왜 필요한가 | Frontend Monolith 문제점 |
| [02_integration.md](./02_integration.md) | 통합 방식 | iFrame, Web Components, Module Federation |
| [03_module_federation.md](./03_module_federation.md) | Module Federation | Webpack 5, Host/Remote |
| [04_communication.md](./04_communication.md) | MFE 간 통신 | CustomEvent, Shared State, URL |

## 핵심 원칙 요약

1. **팀 자율성** — 각 팀이 독립적인 기술 스택으로 개발·배포
2. **격리** — 한 MFE의 장애나 스타일이 다른 MFE에 영향 최소화
3. **Shell App** — 전체를 조율하는 컨테이너 앱이 라우팅과 공통 자원 관리
4. **공유는 최소화** — 공유 라이브러리가 늘수록 팀 자율성 감소
5. **UX 일관성** — 팀이 달라도 사용자에게는 하나의 앱처럼 보여야 함
