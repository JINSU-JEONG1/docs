# IT 아키텍처 문서 안내

| 항목 | 내용 |
|---|---|
| 버전 | v0.4 |
| 상태 | 초안 |
| 수정일 | 2026-11-09 |
| 작성자 | Codex |

## 목차

- [이 문서 모음의 목적](#이-문서-모음의-목적)
- [바로 읽을 수 있는 문서](#바로-읽을-수-있는-문서)
- [분류 기준과 폴더 구조](#분류-기준과-폴더-구조)
- [상황별로 문서 찾기](#상황별로-문서-찾기)
- [전체 주제와 작성 예정 범위](#전체-주제와-작성-예정-범위)
- [새 문서를 추가하거나 수정하는 방법](#새-문서를-추가하거나-수정하는-방법)
- [참고 자료와 분류의 범위](#참고-자료와-분류의-범위)

## 이 문서 모음의 목적

이 폴더는 IT 아키텍처를 공부하거나 시스템 설계를 검토할 때 사용하는 문서 모음입니다. 특정 패턴 이름만 나열하지 않고, **설계의 범위 → 기술 영역 → 설계와 검토 방법**으로 나누어 필요한 내용을 찾을 수 있도록 구성했습니다.

처음 방문했다면 아래의 기존 문서부터 읽습니다. 새 시스템을 설계하려면 상황별 안내에서 출발하고, 문서를 보충하려면 전체 주제 목록에서 작성 예정 범위를 확인합니다.

> **참고:** 2026-11-09 기준으로 본문이 있는 주제는 8개이며 상세 문서는 26개입니다. `[draft]` 문서 55개 중 대표 문서 3개에 본문을 작성했고, 나머지 52개는 빈 파일입니다. README의 주제 설명은 작성 계획을 포함하며, 링크가 있다고 본문이 완성된 것은 아닙니다.

## 바로 읽을 수 있는 문서

아래 여덟 주제는 읽을 수 있는 본문이 있습니다. 각 README의 학습 순서를 따라 읽을 수 있으며, 본문이 있다는 표시가 최종 검토나 모든 환경에서의 적용 가능성을 뜻하지는 않습니다.

| 주제 | 이런 내용을 찾을 때 읽습니다 | 본문 수 |
|---|---|---:|
| [전체 흐름 설계](<solution/[draft]03-end-to-end-design.md>) | 주문부터 결제 결과 반영까지의 책임·정상 흐름·실패 복구 | 1 |
| [계층형 구조](<domains/application/02-02-application-structure/[draft]01-layered.md>) | 요청 처리·업무 규칙·저장 및 외부 연계의 역할 분담 | 1 |
| [데이터 모델링과 소유권](<domains/data/[draft]01-modeling-and-ownership.md>) | 주문 모델, 원본과 변경 책임, 무결성·트랜잭션 경계 | 1 |
| [Modular Monolith](domains/application/01-01-system-structure/modular-monolith/README.md) | 단일 애플리케이션 안의 모듈 경계, 의존성 규칙과 MSA 비교 | 4 |
| [MSA](domains/application/01-01-system-structure/msa/README.md) | 서비스 분해, 통신, 데이터 관리, 장애 복원성, 관측과 배포 | 7 |
| [Hexagonal / Clean](domains/application/02-02-application-structure/hexagonal-clean/README.md) | 업무 로직과 외부 기술의 경계, 의존성 방향과 구현 예제 | 4 |
| [Event-Driven](domains/integration/01-01-communication-and-processing/event-driven/README.md) | 이벤트 기반 연계, 메시지 브로커와 신뢰성 | 4 |
| [Micro-Frontends](domains/application/03-03-frontend/micro-frontends/README.md) | 프런트엔드 분리, 통합 방식, Module Federation과 앱 간 통신 | 4 |

**대표 문서 읽는 순서:** [전체 흐름 설계](<solution/[draft]03-end-to-end-design.md>) → [계층형 구조](<domains/application/02-02-application-structure/[draft]01-layered.md>) → [데이터 모델링과 소유권](<domains/data/[draft]01-modeling-and-ownership.md>)를 읽으면 같은 주문 예제를 시스템·코드·데이터 관점에서 연결할 수 있습니다.

**기존 주제 확장 순서:** Modular Monolith → MSA로 시스템 분리 관점을 비교한 뒤, Hexagonal / Clean으로 내부 구조를 살펴봅니다. 그다음 이벤트 연계가 궁금하면 Event-Driven, 화면 통합이 궁금하면 Micro-Frontends로 이동합니다. 이는 이 문서 모음을 읽는 순서이며 특정 구조를 도입하라는 의미는 아닙니다.

## 분류 기준과 폴더 구조

세 가지 기준을 구분하면 서로 다른 수준의 개념을 같은 선택지로 비교하는 혼동을 줄일 수 있습니다.

| 분류 기준 | 해당 폴더 | 답하려는 질문 |
|---|---|---|
| 설계의 범위 | `enterprise/`, `solution/` | 조직 전체의 방향을 정합니까, 하나의 업무 문제를 해결할 시스템을 설계합니까? |
| 설계 대상인 기술 영역 | `domains/` | 애플리케이션·데이터·연계·인프라·보안 중 어떤 결정을 다룹니까? |
| 설계와 검토 방법 | `practice/` | 설계를 어떻게 찾고, 설명하고, 기록하고, 검증합니까? |

```text
architecture/
├── README.md                         전체 안내와 주제 목록
├── enterprise/                       조직 전체의 방향·표준·로드맵
├── solution/                         개별 솔루션의 요구·전체 구성·전환
├── domains/                          기술 영역별 설계
│   ├── application/                  애플리케이션 경계와 내부 구조
│   │   ├── 01-system-structure/         모놀리스·MSA·SOA 등 시스템 구조
│   │   ├── 02-application-structure/    계층·의존성·기능 단위 코드 구조
│   │   └── 03-frontend/                 화면 구성·렌더링·클라이언트 앱
│   ├── data/                         모델·저장·일관성·분석·수명주기
│   ├── integration/                  API·메시지·이벤트·업무 흐름
│   │   └── 01-communication-and-processing/
│   │       └── event-driven/         기존 이벤트 기반 설계 문서
│   ├── infrastructure/               실행·네트워크·배포·운영·복구
│   └── security/                     위협·권한·보호·감사
└── practice/                         설계 작업에 쓰는 방법
    ├── 01-design-methods/               DDD·EventStorming
    ├── 02-documentation/                C4·ADR
    ├── 03-evaluation/                   설계 검토·자동 점검
    └── 04-evolution/                    기술 부채·점진적 개선
```

예를 들어 MSA는 시스템 구조, Clean은 애플리케이션 내부의 의존성 구조를 살펴보는 주제입니다. 이 문서 모음에서는 두 개념을 다른 수준으로 분류합니다. DDD는 설계 방법, C4는 구조 표현 방법, ADR은 결정 기록 방식으로 분류하며, 특정 시스템 구조와 일대일로 경쟁하는 선택지로 놓지 않습니다.

## 상황별로 문서 찾기

| 지금 필요한 일 | 먼저 볼 안내 | 이어서 확인할 영역 |
|---|---|---|
| 조직의 시스템 중복과 기술 표준 정리 | [엔터프라이즈](enterprise/README.md) | 솔루션의 전환 계획, 데이터 소유권 |
| 새 업무 시스템의 범위와 전체 구성 설계 | [솔루션](solution/README.md) | [기술 영역별 설계](domains/README.md), 설계 결정 기록 |
| 모놀리스 유지와 서비스 분리 검토 | [애플리케이션](domains/application/README.md) | 데이터 일관성, 연계 실패, 운영 복잡성 |
| 데이터 원본과 조회·갱신 구조 정리 | [데이터](domains/data/README.md) | 시스템 경계, 이벤트 전달, 데이터 보호 |
| API·이벤트·외부 시스템 연결 설계 | [연계](domains/integration/README.md) | 데이터 변경 책임, 재시도·중복·보상 |
| 실행 환경·배포·복구 방식 정리 | [인프라·플랫폼·운영](domains/infrastructure/README.md) | 가용성 요구, 보안 경계, 용량과 비용 |
| 사용자·서비스 접근과 정보 보호 설계 | [보안](domains/security/README.md) | 데이터 흐름, 실행 환경, 감사 기록 |
| 설계 설명·의사결정 기록·검토 | [설계와 검토 방법](practice/README.md) | 관련 솔루션과 기술 영역의 문서 |

한 가지 문제에 여러 영역이 연결될 수 있습니다. 예를 들어 서비스 분리를 검토한다면 서비스 경계뿐 아니라 데이터 소유권, 시스템 간 통신, 장애 대응도 함께 확인합니다. 상세 본문이 비어 있는 항목은 현재 검토할 주제를 찾는 용도로 사용합니다.

## 전체 주제와 작성 예정 범위

각 영역의 README에는 해당 영역의 핵심 질문, 문서별 범위, 읽거나 작성할 순서, 다른 영역과의 경계가 있습니다. 아래 표는 전체 주제를 한곳에서 찾기 위한 색인입니다.

- **본문 있음:** 읽을 수 있는 상세 문서가 있습니다. 링크는 단일 본문 또는 여러 본문을 묶은 주제 README로 연결합니다.
- **작성 예정:** 파일은 있지만 본문은 비어 있습니다. 표의 설명은 향후 작성 범위입니다.

### 엔터프라이즈 아키텍처

[영역 안내와 활용 순서](enterprise/README.md)

| 주제 | 내용 또는 작성 예정 범위 | 상태 |
|---|---|---|
| [업무 역량과 가치 흐름](<enterprise/[draft]01-business-capabilities.md>) | 업무 역량 맵, 가치 흐름, 조직·시스템의 대응 관계를 정리할 예정입니다. | 작성 예정 |
| [전사 정보 구조](<enterprise/[draft]02-information-architecture.md>) | 핵심 정보의 의미, 분류, 소유권과 시스템 사이의 정보 흐름을 다룰 예정입니다. | 작성 예정 |
| [애플리케이션 포트폴리오](<enterprise/[draft]03-application-portfolio.md>) | 시스템 목록, 중복 기능, 의존관계와 유지·통합·교체 대상을 정리할 예정입니다. | 작성 예정 |
| [기술 표준과 원칙](<enterprise/[draft]04-technology-standards.md>) | 공통 기술 기준, 지원 범위, 예외 승인과 표준 변경 절차를 다룰 예정입니다. | 작성 예정 |
| [거버넌스와 전환 로드맵](<enterprise/[draft]05-governance-and-roadmap.md>) | 의사결정 책임, 검토 기준, 목표 구조로 전환하는 순서와 의존성을 다룰 예정입니다. | 작성 예정 |

### 솔루션 아키텍처

[영역 안내와 활용 순서](solution/README.md)

| 주제 | 내용 또는 작성 예정 범위 | 상태 |
|---|---|---|
| [시스템 맥락과 요구사항](<solution/[draft]01-context-and-requirements.md>) | 이해관계자, 시스템 경계, 외부 의존성, 기능 요구와 제약을 정리할 예정입니다. | 작성 예정 |
| [품질 속성 시나리오](<solution/[draft]02-quality-attribute-scenarios.md>) | 성능·가용성·보안·변경 용이성 요구를 조건과 측정 기준으로 표현할 예정입니다. | 작성 예정 |
| [전체 흐름 설계](<solution/[draft]03-end-to-end-design.md>) | 주문·결제 예제로 구성요소, 정상 흐름, 중복·실패 처리와 운영 점검을 설명합니다. | 본문 있음 |
| [대안 비교와 선택 근거](<solution/[draft]04-options-and-tradeoffs.md>) | 후보 구조의 이점, 제약, 비용, 위험과 선택 이유를 비교할 예정입니다. | 작성 예정 |
| [마이그레이션과 서비스 전환](<solution/[draft]05-migration-and-cutover.md>) | 점진적 교체, 데이터 이관, 전환 순서, 검증 및 롤백 계획을 다룰 예정입니다. | 작성 예정 |
| [참조 아키텍처](<solution/[draft]06-reference-architectures.md>) | 반복해서 활용할 기본 구성과 적용 조건, 수정이 필요한 지점을 정리할 예정입니다. | 작성 예정 |

### 애플리케이션 아키텍처

[영역 안내와 활용 순서](domains/application/README.md)

| 주제 | 내용 또는 작성 예정 범위 | 상태 |
|---|---|---|
| [MSA](<domains/application/01-01-system-structure/msa/README.md>) | 개요부터 서비스 분해, 통신, 데이터 관리, 장애 복원성, 관찰가능성, 배포까지 7개 본문이 있습니다. | 본문 있음 |
| [Modular Monolith](<domains/application/01-01-system-structure/modular-monolith/README.md>) | 개요, 모듈 설계, 의존성 규칙, MSA 비교의 4개 본문이 있습니다. | 본문 있음 |
| [Hexagonal / Clean](<domains/application/02-02-application-structure/hexagonal-clean/README.md>) | 개요, Hexagonal, Clean Architecture, 구현 예제의 4개 본문이 있습니다. | 본문 있음 |
| [Micro-Frontends](<domains/application/03-03-frontend/micro-frontends/README.md>) | 개요, 통합 방식, Module Federation, 앱 간 통신의 4개 본문이 있습니다. | 본문 있음 |
| [모놀리스와 Client-Server](<domains/application/01-01-system-structure/[draft]01-monolith-and-client-server.md>) | 단일 애플리케이션과 클라이언트·서버 구조의 기본 책임 및 배포 경계를 다룰 예정입니다. | 작성 예정 |
| [SOA](<domains/application/01-01-system-structure/[draft]02-soa.md>) | 서비스 계약, 재사용, 기업 내 연계와 MSA 비교 관점을 다룰 예정입니다. | 작성 예정 |
| [계층형 구조](<domains/application/02-02-application-structure/[draft]01-layered.md>) | 주문 예제로 계층별 책임, 호출 규칙, 트랜잭션 경계와 적용 조건을 설명합니다. | 본문 있음 |
| [Vertical Slice](<domains/application/02-02-application-structure/[draft]02-vertical-slice.md>) | 기능 단위로 코드를 묶는 방식과 기능 사이의 중복·공통화 기준을 다룰 예정입니다. | 작성 예정 |
| [Microkernel](<domains/application/02-02-application-structure/[draft]03-microkernel.md>) | 핵심 기능과 플러그인의 경계, 확장 계약, 플러그인 수명주기를 다룰 예정입니다. | 작성 예정 |
| [프런트엔드 앱 모델](<domains/application/03-03-frontend/[draft]01-application-models.md>) | SPA, MPA, Islands의 구성 방식과 적용 조건을 비교할 예정입니다. | 작성 예정 |
| [렌더링 전략](<domains/application/03-03-frontend/[draft]02-rendering-strategies.md>) | CSR, SSR, SSG와 하이드레이션의 역할 및 렌더링 위치를 다룰 예정입니다. | 작성 예정 |
| [모바일과 데스크톱 앱](<domains/application/03-03-frontend/[draft]03-mobile-and-desktop.md>) | 플랫폼별 구성, 오프라인 동작, 로컬 데이터와 업데이트 전략을 다룰 예정입니다. | 작성 예정 |

### 데이터 아키텍처

[영역 안내와 활용 순서](domains/data/README.md)

| 주제 | 내용 또는 작성 예정 범위 | 상태 |
|---|---|---|
| [데이터 모델링과 소유권](<domains/data/[draft]01-modeling-and-ownership.md>) | 주문 예제로 개념·논리·물리 모델, 소유권, 무결성과 동시성 검토를 설명합니다. | 본문 있음 |
| [저장과 분산](<domains/data/[draft]02-storage-and-distribution.md>) | 관계형·문서·키값 등 저장 모델과 복제·분할·캐시의 역할을 비교할 예정입니다. | 작성 예정 |
| [트랜잭션과 일관성](<domains/data/[draft]03-transactions-and-consistency.md>) | 트랜잭션 경계, 격리 수준, 강한 일관성과 최종 일관성의 요구를 다룰 예정입니다. | 작성 예정 |
| [CQRS와 Event Sourcing](<domains/data/[draft]04-cqrs-and-event-sourcing.md>) | 조회·명령 분리와 이벤트 기록을 구분하고, 재구성·운영 복잡성을 다룰 예정입니다. | 작성 예정 |
| [데이터 파이프라인과 스트리밍](<domains/data/[draft]05-pipelines-and-streaming.md>) | ETL·ELT·CDC, 배치·스트림 처리와 데이터 이동 경로를 다룰 예정입니다. | 작성 예정 |
| [분석 플랫폼](<domains/data/[draft]06-analytics-platforms.md>) | 업무 처리와 분석의 구분, Warehouse·Lake·Lakehouse 및 데이터 책임 분담을 다룰 예정입니다. | 작성 예정 |
| [데이터 거버넌스와 수명주기](<domains/data/[draft]07-governance-and-lifecycle.md>) | 품질, 메타데이터, 계보, 보존 기간과 삭제 책임을 정리할 예정입니다. | 작성 예정 |

### 연계 아키텍처

[영역 안내와 활용 순서](domains/integration/README.md)

| 주제 | 내용 또는 작성 예정 범위 | 상태 |
|---|---|---|
| [Event-Driven](<domains/integration/01-01-communication-and-processing/event-driven/README.md>) | 개요, 패턴, 메시지 브로커, 신뢰성의 4개 본문이 있습니다. | 본문 있음 |
| [API와 계약](<domains/integration/[draft]01-api-and-contracts.md>) | REST·RPC·GraphQL, 버전 관리와 호환성 유지 기준을 다룰 예정입니다. | 작성 예정 |
| [API Gateway와 BFF](<domains/integration/[draft]02-gateway-and-bff.md>) | 공통 진입점, 라우팅, 인증 연계와 클라이언트별 응답 구성을 다룰 예정입니다. | 작성 예정 |
| [메시징과 브로커](<domains/integration/[draft]03-messaging-and-brokers.md>) | Queue·Pub/Sub·Request-Reply와 브로커 선택 시 확인할 전달 특성을 다룰 예정입니다. | 작성 예정 |
| [워크플로와 Saga](<domains/integration/[draft]04-workflow-and-saga.md>) | 오케스트레이션·코레오그래피, 장기 업무 흐름과 보상 처리를 다룰 예정입니다. | 작성 예정 |
| [전달 보장과 멱등성](<domains/integration/[draft]05-delivery-and-idempotency.md>) | Outbox·Inbox, 중복 처리, 재시도와 실패 메시지 재처리를 다룰 예정입니다. | 작성 예정 |
| [레거시와 기업 간 연계](<domains/integration/[draft]06-legacy-and-b2b.md>) | 기존 시스템의 계약 변환, 배치·파일 연계와 경계 보호를 다룰 예정입니다. | 작성 예정 |
| [Pipes and Filters](<domains/integration/[draft]07-pipes-and-filters.md>) | 처리 단계를 연결하는 구조와 단계별 책임·오류 처리를 다룰 예정입니다. | 작성 예정 |

### 인프라·플랫폼·운영 아키텍처

[영역 안내와 활용 순서](domains/infrastructure/README.md)

| 주제 | 내용 또는 작성 예정 범위 | 상태 |
|---|---|---|
| [컴퓨팅과 호스팅](<domains/infrastructure/[draft]01-compute-and-hosting.md>) | 물리 서버·가상 머신·컨테이너·Serverless의 실행 방식과 운영 책임을 다룰 예정입니다. | 작성 예정 |
| [네트워크와 연결](<domains/infrastructure/[draft]02-network-and-connectivity.md>) | DNS, 라우팅, 로드밸런싱, 망 분리와 외부 연결 경로를 다룰 예정입니다. | 작성 예정 |
| [클라우드와 Landing Zone](<domains/infrastructure/[draft]03-cloud-and-landing-zones.md>) | 계정·프로젝트와 환경 분리, 공통 기반, Hybrid·Multi-Cloud 구성을 다룰 예정입니다. | 작성 예정 |
| [플랫폼과 오케스트레이션](<domains/infrastructure/[draft]04-platform-and-orchestration.md>) | 워크로드 배치, 자원 관리, 서비스 실행과 플랫폼 책임을 다룰 예정입니다. | 작성 예정 |
| [가용성과 재해 복구](<domains/infrastructure/[draft]05-availability-and-disaster-recovery.md>) | 장애 영역, 이중화, 복구 시간 목표와 복구 시점 목표, 복구 훈련을 다룰 예정입니다. | 작성 예정 |
| [배포와 구성 관리](<domains/infrastructure/[draft]06-delivery-and-configuration.md>) | IaC·GitOps, 환경 설정, Blue-Green·Canary 배포와 롤백을 다룰 예정입니다. | 작성 예정 |
| [관측과 운영](<domains/infrastructure/[draft]07-observability-and-operations.md>) | 로그·메트릭·트레이스, 서비스 수준 지표·목표와 장애 대응을 다룰 예정입니다. | 작성 예정 |
| [용량과 비용](<domains/infrastructure/[draft]08-capacity-and-cost.md>) | 부하 추정, 자원 한도, 확장 정책과 비용 관리 기준을 다룰 예정입니다. | 작성 예정 |
| [Edge와 IoT](<domains/infrastructure/[draft]09-edge-and-iot.md>) | 현장 장치와 서버의 역할, 연결 단절, 데이터 동기화와 장치 관리를 다룰 예정입니다. | 작성 예정 |

### 보안 아키텍처

[영역 안내와 활용 순서](domains/security/README.md)

| 주제 | 내용 또는 작성 예정 범위 | 상태 |
|---|---|---|
| [위협 모델링과 신뢰 경계](<domains/security/[draft]01-threat-modeling-and-trust.md>) | 자산, 공격 표면, 위협 시나리오와 경계별 검증 기준을 다룰 예정입니다. | 작성 예정 |
| [신원과 접근 제어](<domains/security/[draft]02-identity-and-access.md>) | 인증·인가, 신원 연계, 역할·속성 기반 접근 제어와 서비스 신원을 다룰 예정입니다. | 작성 예정 |
| [데이터 보호와 프라이버시](<domains/security/[draft]03-data-protection-and-privacy.md>) | 데이터 분류, 전송·저장 시 보호, 키 관리와 민감정보 처리를 다룰 예정입니다. | 작성 예정 |
| [네트워크와 워크로드 보안](<domains/security/[draft]04-network-and-workload-security.md>) | 통신 경계, 실행 환경 격리와 워크로드 접근 정책을 다룰 예정입니다. | 작성 예정 |
| [비밀정보와 소프트웨어 공급망](<domains/security/[draft]05-secrets-and-supply-chain.md>) | 자격 증명 수명주기, 의존성 관리, 빌드·배포 검증과 구성요소 목록을 다룰 예정입니다. | 작성 예정 |
| [감사와 보안 사고 대응](<domains/security/[draft]06-audit-and-security-response.md>) | 감사 이벤트, 탐지, 조사에 필요한 기록과 대응 절차를 다룰 예정입니다. | 작성 예정 |

### 아키텍처 설계와 검토 방법

[영역 안내와 활용 순서](practice/README.md)

| 주제 | 내용 또는 작성 예정 범위 | 상태 |
|---|---|---|
| [DDD](<practice/01-01-design-methods/[draft]01-ddd.md>) | 업무 모델, Bounded Context, Context Map과 Aggregate를 다룰 예정입니다. | 작성 예정 |
| [EventStorming](<practice/01-01-design-methods/[draft]02-event-storming.md>) | 업무 이벤트를 중심으로 흐름·명령·정책과 경계를 탐색할 예정입니다. | 작성 예정 |
| [C4와 아키텍처 뷰](<practice/02-02-documentation/[draft]01-c4-and-views.md>) | 시스템 맥락·컨테이너·컴포넌트·코드 및 동작·배포 관점을 다룰 예정입니다. | 작성 예정 |
| [ADR: 아키텍처 결정 기록](<practice/02-02-documentation/[draft]02-adr.md>) | 문제 상황, 선택지, 결정 이유와 결과를 남기는 형식을 다룰 예정입니다. | 작성 예정 |
| [아키텍처 검토](<practice/03-03-evaluation/[draft]01-architecture-review.md>) | 품질 시나리오, 이해관계자 검토, 위험과 대안의 평가를 다룰 예정입니다. | 작성 예정 |
| [아키텍처 자동 점검](<practice/03-03-evaluation/[draft]02-fitness-functions.md>) | 의존성·성능·보안 등 구조적 조건을 지속적으로 확인하는 방법을 다룰 예정입니다. | 작성 예정 |
| [기술 부채와 진화](<practice/04-04-evolution/[draft]01-technical-debt.md>) | 설계 부채의 영향, 개선 우선순위와 점진적인 변경 계획을 다룰 예정입니다. | 작성 예정 |

## 새 문서를 추가하거나 수정하는 방법

1. **중심 주제를 정합니다.** 조직 방향은 enterprise, 개별 시스템의 전체 설계는 solution, 기술 영역의 상세 설계는 domains, 설계 방법은 practice에 둡니다.
2. **기존 주제와 겹치는지 확인합니다.** 이미 있는 주제는 해당 본문을 보완합니다. 여러 영역에 걸치면 중심 문서 한 곳에 작성하고 다른 영역에서는 링크로 연결합니다.
3. **파일명에 문서 단계를 표시합니다.** 새 본문은 `[draft]01-topic-name.md`처럼 단계 접두사 뒤에 두 자리 번호와 영어 소문자 kebab-case를 사용합니다. 번호는 같은 폴더 안의 본문 읽는 순서이며 폴더마다 `01`부터 시작합니다. README는 번호를 붙이지 않습니다.
4. **설명과 근거를 작성합니다.** 아래 구성에 따라 내용을 채우고, 사례·가정·확정된 사실을 구분합니다. 출처나 수치를 확인할 수 없으면 임의로 만들지 않습니다.
5. **색인과 링크를 갱신합니다.** 본문을 채우면 이 README와 해당 영역 README에서 작성 상태를 바꿉니다. 파일명을 바꾸면 기존 링크도 함께 수정합니다.
6. **저장 결과를 확인합니다.** UTF-8로 저장한 뒤 파일을 다시 열어 한글, 제목, 표, 코드 블록과 상대 링크를 확인합니다.

본문은 다음 순서로 작성합니다. 내용에 필요하지 않은 항목은 제외할 수 있습니다.

| 구성 | 설명할 내용 |
|---|---|
| 제목·문서 정보·목차 | 주제, 버전, 상태, 수정일, 작성자와 탐색 경로 |
| 목적과 적용 조건 | 어떤 문제를 다루며 어떤 조건에서 검토하는지 |
| 핵심 구조 | 구성요소, 책임, 의존성 및 데이터·요청 흐름 |
| 예시 | 구조를 이해할 수 있는 작은 사례나 다이어그램 |
| 대안과 제약 | 비교 대상, 이점, 비용, 위험 및 선택 조건 |
| 운영과 검증 | 실패 시 동작, 관측 항목과 확인 방법 |
| 참고 자료 | 내용을 뒷받침하는 공식 문서나 1차 자료 |

문서가 진행 단계로 바뀌면 `[wip]`, 최종 단계로 바뀌면 `[final]` 접두사를 사용합니다. 본문이 생겼다는 이유만으로 최종본으로 표시하지 않습니다. 단계별 `source/`, `working/`, `final/` 폴더는 만들지 않습니다.

대괄호가 들어간 파일 경로는 Markdown 링크에서 꺾쇠괄호로 감쌉니다.

```markdown
[전체 흐름 설계](<solution/[draft]03-end-to-end-design.md>)
```

폴더 구조는 유지하고 본문 파일명에는 두 자리 순서를 사용합니다. 기존 본문도 `01-overview.md`처럼 하이픈으로 통일했습니다. 번호를 변경하면 해당 경로를 사용하는 README와 본문 링크도 함께 수정합니다.

## 참고 자료와 분류의 범위

이 분류는 저장소에서 문서를 찾고 확장하기 위한 편집 구조입니다. IT 아키텍처 전체를 빠짐없이 나눈 공식 표준 분류로 제시하지 않습니다. 산업 제어·실시간 임베디드·고성능 컴퓨팅·게임 엔진·AI/ML 플랫폼 등은 현재 독립된 주제로 구성하지 않았습니다.

아래 자료는 개념을 확인할 때 참고합니다. 전체 폴더 분류를 이 자료가 정의한 것으로 해석하지 않습니다.

- [Microsoft Azure Architecture Center — Architecture styles](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/): 아키텍처 스타일의 특성, 적용 조건과 장단점을 설명합니다.
- [C4 model — Introduction](https://c4model.com/introduction): 시스템 맥락에서 내부 구조까지 설명 수준을 나누어 표현하는 방법을 소개합니다.
