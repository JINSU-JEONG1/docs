# 애플리케이션 아키텍처

| 항목 | 내용 |
|---|---|
| 버전 | v0.3 |
| 상태 | 초안 |
| 수정일 | 2026-11-09 |
| 작성자 | Codex |

## 목차

- [이 영역에서 다루는 것](#이-영역에서-다루는-것)
- [주제별 문서와 작성 상태](#주제별-문서와-작성-상태)
- [읽는 순서와 활용 방법](#읽는-순서와-활용-방법)
- [다른 영역과의 경계](#다른-영역과의-경계)
- [문서 작성 기준](#문서-작성-기준)

## 이 영역에서 다루는 것

애플리케이션의 구성요소를 나누고 의존성을 관리하는 방법을 다룹니다. 시스템 전체의 서비스 경계, 한 애플리케이션 내부의 코드 구조, 사용자 화면의 구성을 서로 다른 수준으로 나누어 살펴봅니다.

- **핵심 질문:** 서비스를 어디까지 나누고, 각 서비스 내부 코드는 어떤 책임과 의존성으로 구성할 것인가?
- **정리할 산출물:** 서비스·모듈 경계도, 의존성 규칙, 프런트엔드 구성도입니다.

## 주제별 문서와 작성 상태

현재 5개 주제에 본문이 있습니다. 계층형 구조를 대표 입문 문서로 추가했습니다. 나머지는 범위와 파일 위치만 잡아 둔 작성 예정 항목입니다. **본문 있음은 내용의 존재를 뜻하며, 최종 검토 완료를 뜻하지 않습니다.**

| 주제 | 내용 또는 작성 예정 범위 | 상태 |
|---|---|---|
| [MSA](<01-system-structure/msa/README.md>) | 개요부터 서비스 분해, 통신, 데이터 관리, 장애 복원성, 관찰가능성, 배포까지 7개 본문이 있습니다. | 본문 있음 |
| [Modular Monolith](<01-system-structure/modular-monolith/README.md>) | 개요, 모듈 설계, 의존성 규칙, MSA 비교의 4개 본문이 있습니다. | 본문 있음 |
| [Hexagonal / Clean](<02-application-structure/hexagonal-clean/README.md>) | 개요, Hexagonal, Clean Architecture, 구현 예제의 4개 본문이 있습니다. | 본문 있음 |
| [Micro-Frontends](<03-frontend/micro-frontends/README.md>) | 개요, 통합 방식, Module Federation, 앱 간 통신의 4개 본문이 있습니다. | 본문 있음 |
| [모놀리스와 Client-Server](<01-system-structure/[draft]01-monolith-and-client-server.md>) | 단일 애플리케이션과 클라이언트·서버 구조의 기본 책임 및 배포 경계를 다룰 예정입니다. | 작성 예정 · 빈 파일 |
| [SOA](<01-system-structure/[draft]02-soa.md>) | 서비스 계약, 재사용, 기업 내 연계와 MSA 비교 관점을 다룰 예정입니다. | 작성 예정 · 빈 파일 |
| [계층형 구조](<02-application-structure/[draft]01-layered.md>) | 주문 예제로 계층별 책임, 호출 규칙, 트랜잭션 경계와 적용 조건을 설명합니다. | 본문 있음 |
| [Vertical Slice](<02-application-structure/[draft]02-vertical-slice.md>) | 기능 단위로 코드를 묶는 방식과 기능 사이의 중복·공통화 기준을 다룰 예정입니다. | 작성 예정 · 빈 파일 |
| [Microkernel](<02-application-structure/[draft]03-microkernel.md>) | 핵심 기능과 플러그인의 경계, 확장 계약, 플러그인 수명주기를 다룰 예정입니다. | 작성 예정 · 빈 파일 |
| [프런트엔드 앱 모델](<03-frontend/[draft]01-application-models.md>) | SPA, MPA, Islands의 구성 방식과 적용 조건을 비교할 예정입니다. | 작성 예정 · 빈 파일 |
| [렌더링 전략](<03-frontend/[draft]02-rendering-strategies.md>) | CSR, SSR, SSG와 하이드레이션의 역할 및 렌더링 위치를 다룰 예정입니다. | 작성 예정 · 빈 파일 |
| [모바일과 데스크톱 앱](<03-frontend/[draft]03-mobile-and-desktop.md>) | 플랫폼별 구성, 오프라인 동작, 로컬 데이터와 업데이트 전략을 다룰 예정입니다. | 작성 예정 · 빈 파일 |

## 읽는 순서와 활용 방법

1. [01 계층형 구조](<02-application-structure/[draft]01-layered.md>)로 요청 처리·업무 규칙·저장의 책임을 먼저 파악합니다.
2. Modular Monolith와 MSA를 읽고 시스템 분리의 기준을 비교합니다.
3. Hexagonal / Clean을 읽고 업무 로직과 외부 기술의 경계를 살펴봅니다.
4. 화면을 여러 팀이 나누어 개발하는 상황이라면 Micro-Frontends의 통합과 통신 문서를 읽습니다.

## 다른 영역과의 경계

system-structure는 시스템의 분리와 배포 단위, application-structure는 내부 코드의 책임과 의존성, frontend는 사용자 접점의 구성을 다룹니다. MSA와 Clean 같은 주제는 서로 다른 수준의 결정이므로 함께 검토할 수 있습니다.

함께 확인할 문서:

- [연계 아키텍처](../integration/README.md)
- [데이터 아키텍처](../data/README.md)
- [솔루션 아키텍처](../../solution/README.md)

## 문서 작성 기준

각 본문에는 문제와 적용 조건, 핵심 구조, 예시, 장단점, 운영 시 확인할 사항, 근거 자료를 순서대로 정리합니다. 특정 선택을 권장할 때에는 전제와 제약을 함께 적습니다.

작성 예정 파일에 본문을 채우면 이 표의 상태를 갱신합니다. 파일의 단계 접두사를 변경하면 [전체 안내](../../README.md)와 이 문서에서 해당 파일을 가리키는 링크도 함께 수정합니다.

[전체 아키텍처 안내로 돌아가기](../../README.md)
