# Hexagonal & Clean Architecture

## 한 줄 요약

> USB 포트가 있는 컴퓨터처럼. 컴퓨터(도메인)는 USB라는 표준 포트만 알고 있다.
> 마우스든, 키보드든, 외장 SSD든 — 포트 규격만 맞으면 교체 가능하다.

## 두 아키텍처의 관계

| | Hexagonal | Clean |
|---|---|---|
| 창시자 | Alistair Cockburn | Robert C. Martin (Uncle Bob) |
| 핵심 개념 | Ports & Adapters | 의존성 방향 (안쪽으로만) |
| 공통점 | 도메인을 외부로부터 격리 | 도메인을 외부로부터 격리 |
| 차이 | 포트/어댑터 명시적 구분 | 레이어 명시적 구분 |

→ 같은 목표를 다른 언어로 표현한 것. 실무에서는 혼용됨.

## 학습 순서

| 파일 | 주제 | 핵심 키워드 |
|---|---|---|
| [01-overview.md](01-overview.md) | 왜 필요한가 | 의존성 역전, 테스트 가능성 |
| [02-hexagonal.md](02-hexagonal.md) | 헥사고날 아키텍처 | Port, Adapter, Driving/Driven |
| [03-clean-architecture.md](03-clean-architecture.md) | 클린 아키텍처 | Entity, UseCase, Interface, Framework |
| [04-implementation.md](04-implementation.md) | 실전 구현 | 폴더 구조, 코드 예시 |

## 핵심 원칙 요약

1. **도메인 격리** — 비즈니스 규칙은 DB/프레임워크/외부 API에 의존하지 않는다
2. **의존성 방향** — 항상 바깥 → 안쪽. 도메인은 아무것도 모른다
3. **인터페이스로 역전** — 도메인이 포트(인터페이스)를 정의, 외부가 구현
4. **교체 가능성** — DB를 MySQL → PostgreSQL, REST → gRPC로 교체해도 도메인 무변경
5. **테스트 용이성** — 도메인 로직을 DB 없이 순수 단위 테스트 가능
