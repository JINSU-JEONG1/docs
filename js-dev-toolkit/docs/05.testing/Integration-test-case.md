# 통합 테스트 케이스
### Integration Test Case

---

> **문서 정보**
>
> | 항목 | 내용 |
> |---|---|
> | 프로젝트명 | \[예: 커머스 플랫폼 MSA v2.0\] |
> | 문서 버전 | v1.0 |
> | 테스트 대상 서비스 | \[예: Order Service v1.2.3\] |
> | 작성일 | YYYY-MM-DD |
> | 작성자 | \[이름 / 소속\] |
> | 검토자 | \[이름 / 소속\] |
> | 상태 | 작성중 / 검토중 / 확정 |

---

## 목차

1. [통합 테스트 개요](#1-통합-테스트-개요)
2. [테스트 전략](#2-테스트-전략)
3. [테스트 환경](#3-테스트-환경)
4. [서비스 의존성 맵](#4-서비스-의존성-맵)
5. [진입 기준](#5-진입-기준-entry-criteria)
6. [통합 테스트 케이스 명세](#6-통합-테스트-케이스-명세)
   1. [HTTP 동기 연동 — Order Service → Payment Service](#61-http-동기-연동--order-service--payment-service)
   2. [HTTP 동기 연동 — Order Service → Stock Service](#62-http-동기-연동--order-service--stock-service)
   3. [비동기 메시지 — Order Service → Kafka (이벤트 발행)](#63-비동기-메시지--order-service--kafka-이벤트-발행)
   4. [인증 헤더 전파 — JWT Propagation](#64-인증-헤더-전파--jwt-propagation)
   5. [장애 내성 — Fault Tolerance](#65-장애-내성--fault-tolerance)
7. [테스트 데이터 명세](#7-테스트-데이터-명세)
8. [완료 기준](#8-완료-기준-exit-criteria)

---

## 1. 통합 테스트 개요

MSA 환경에서의 통합 테스트는 **테스트 대상 서비스(SUT)가 다른 마이크로서비스와 네트워크를 통해 연동될 때, API 계약·메시지 스키마·장애 처리가 설계 명세와 일치하는지 검증**하는 단계이다.

| 항목 | 내용 |
|---|---|
| 테스트 목적 | 서비스 간 API 계약, 메시지 스키마, 인증 헤더 전파, 장애 내성 동작 검증 |
| 테스트 범위 | SUT(테스트 대상 서비스) ↔ 의존 서비스 간 네트워크 경계 |
| 의존 서비스 처리 | 타 서비스는 WireMock으로 HTTP Stub 대체; Kafka는 Embedded/Testcontainers 사용 |
| 단위 테스트와의 차이 | 단위 테스트는 의존 서비스를 코드 수준 Mock으로 대체; 통합 테스트는 실제 HTTP 요청/응답을 통해 네트워크 경계를 검증 |
| E2E 테스트와의 차이 | E2E는 전체 서비스를 실 기동; 통합 테스트는 의존 서비스를 Stub으로 제어하여 특정 인터페이스에 집중 |

---

## 2. 테스트 전략

### 2.1 의존 서비스 처리 방식

| 방식 | 적용 대상 | 도구 | 비고 |
|---|---|---|---|
| HTTP Stub | 타 마이크로서비스 REST API | WireMock | 응답 코드·본문·지연을 TC별로 제어 |
| Embedded Broker | Kafka / RabbitMQ | Testcontainers / Embedded Kafka | 실 토픽 발행·구독 검증 |
| 실 DB | SUT 자체 DB | Testcontainers (PostgreSQL 등) | SUT DB 상태 검증에 사용 |
| 실 서비스 기동 | 해당 없음 | - | E2E 단계에서 적용 |

### 2.2 Contract Testing 전략

> 서비스 간 API 계약의 장기적 신뢰성을 위해 Consumer-Driven Contract Testing(CDCT)을 병행 적용할 것을 권장한다.

| 항목 | 내용 |
|---|---|
| 적용 도구 | \[예: Pact / Spring Cloud Contract\] |
| 계약 정의 주체 | Consumer 서비스가 계약(Pact 파일)을 정의하고 Provider 서비스가 이를 검증 |
| 적용 시점 | 통합 테스트 케이스 작성 시 함께 계약 명세 작성; CI 파이프라인에서 검증 자동화 |
| 적용 범위 | HTTP 동기 연동 인터페이스 전체 |

---

## 3. 테스트 환경

| 항목 | 내용 |
|---|---|
| 언어 / 런타임 | \[예: Java 17 / Node.js 20\] |
| 테스트 프레임워크 | \[예: JUnit 5 + Spring Boot Test / Jest + Supertest\] |
| HTTP Stub 서버 | \[예: WireMock 3.x (Testcontainers로 기동)\] |
| SUT DB | \[예: PostgreSQL 15 (Testcontainers)\] |
| 메시지 브로커 | \[예: Kafka (Testcontainers) / Embedded Kafka\] |
| 서비스 기동 방식 | SUT만 실 기동; 의존 서비스는 WireMock Stub |
| API Gateway / 서비스 디스커버리 | 테스트 환경에서는 직접 URL 지정 (서비스 디스커버리 우회) |
| 분산 추적 | \[예: 테스트 환경에서는 비활성화 / Zipkin 연동\] |
| 실행 환경 | \[예: Local / CI (GitHub Actions)\] |

---

## 4. 서비스 의존성 맵

> SUT가 의존하는 서비스와 통신 방식을 정의한다. 본 절의 인터페이스 ID는 6절 TC ID와 일관성을 유지한다.

| 인터페이스 ID | SUT (호출 서비스) | 의존 서비스 (피호출) | 통신 방식 | 엔드포인트 / 토픽 | 우선순위 | 관련 요구사항 |
|---|---|---|---|---|---|---|
| IF-001 | Order Service | Payment Service | HTTP REST | `POST /api/v1/payments` | High | REQ-ORD-002 |
| IF-002 | Order Service | Stock Service | HTTP REST | `GET /api/v1/stock/{productId}`, `PUT /api/v1/stock/{productId}/decrease` | High | REQ-ORD-001 |
| IF-003 | Order Service | Kafka | Event Publish | topic: `order.events` | High | REQ-ORD-003 |
| IF-004 | Order Service | Member Service | HTTP REST | `GET /api/v1/members/me` (JWT 검증용) | High | REQ-AUT-001 |
| \[IF-NNN\] | \[SUT\] | \[의존 서비스\] | \[방식\] | \[엔드포인트/토픽\] | \[우선순위\] | \[REQ-ID\] |

---

## 5. 진입 기준 (Entry Criteria)

> 아래 기준을 모두 충족한 후 통합 테스트를 시작한다. 미충족 시 PM과 QA 리드의 사전 승인이 필요하다.

| 기준 항목 | 충족 조건 | 확인자 |
|---|---|---|
| 단위 테스트 완료 | UTR 기준 PASS율 95% 이상, 미조치 FAIL 0건 | QA 리드 |
| SUT API 개발 완료 | 테스트 대상 엔드포인트 구현 완료 | 개발 리드 |
| WireMock Stub 준비 완료 | 의존 서비스 응답 시나리오(정상/오류/지연) Stub 정의 완료 | QA |
| 의존 서비스 API 명세 확정 | ICD 또는 OpenAPI Spec v1.0 이상 확정 | 설계 담당자 |
| 테스트 환경 구동 확인 | SUT, WireMock, DB, Kafka 정상 기동 확인 | DevOps |

---

## 6. 통합 테스트 케이스 명세

> **TC ID 규칙:** `IT-[인터페이스ID]-[순번]`
> 예) `IT-OP-001` (Order→Payment, 첫 번째 케이스)
>
> **우선순위:**
> - 🔴 High: 핵심 비즈니스 흐름 — 반드시 PASS
> - 🟡 Medium: 주요 예외 처리 — PASS 권장
> - 🟢 Low: 부가 기능
>
> **Stub 표기:** `[WireMock]` 응답 설정을 사전 조건에 명시한다.

---

### 6.1 HTTP 동기 연동 — Order Service → Payment Service

> **통합 포인트:** Order Service가 주문 생성 시 Payment Service에 `POST /api/v1/payments`를 호출한다.
> Payment Service는 WireMock으로 대체한다.
>
> **관련 요구사항:** REQ-ORD-002, REQ-PAY-001

| TC ID | 테스트 시나리오 | 사전 조건 (WireMock Stub 포함) | SUT 호출 요청 | 기대 결과 | 검증 항목 | 우선순위 |
|---|---|---|---|---|---|---|
| IT-OP-001 | 결제 승인 → 주문 PAID 전이 | `[WireMock]` `POST /api/v1/payments` → `200 OK`, `{"paymentId":"pay-001","status":"APPROVED"}` | `POST /api/v1/orders` `body: {productId, qty, amount}` `header: Authorization: Bearer {valid_jwt}` | HTTP 201; 주문 상태 `PAID`; `paymentId` 응답 포함 | 응답 status 201, body.paymentId 존재, DB orders.status="PAID" | 🔴 High |
| IT-OP-002 | 결제 거절(402) → 주문 CANCELLED | `[WireMock]` `POST /api/v1/payments` → `402`, `{"code":"PAYMENT_DECLINED"}` | `POST /api/v1/orders` `body: {productId, qty, amount}` | HTTP 400; 주문 생성 안 됨; 오류 코드 `PAYMENT_DECLINED` | 응답 status 400, body.code 확인, DB orders 행 없음 | 🔴 High |
| IT-OP-003 | Payment Service 500 → SUT 502 반환 | `[WireMock]` `POST /api/v1/payments` → `500 Internal Server Error` | `POST /api/v1/orders` `body: {productId, qty, amount}` | HTTP 502; 주문 생성 안 됨 | 응답 status 502, DB orders 행 없음 | 🔴 High |
| IT-OP-004 | Payment Service 타임아웃 → Circuit Breaker OPEN | `[WireMock]` `POST /api/v1/payments` → 응답 지연 (설정 timeout 초과) | `POST /api/v1/orders` `body: {productId, qty, amount}` | HTTP 503; Circuit Breaker OPEN 상태 전이; fallback 응답 반환 | 응답 status 503, CB 상태 확인, DB orders 행 없음 | 🔴 High |
| IT-OP-005 | 동일 요청 재전송 — 멱등성 보장 | `[WireMock]` 동일 `Idempotency-Key`로 두 번째 요청 → 첫 번째와 동일 응답 반환 | `POST /api/v1/orders` `header: Idempotency-Key: key-001` (두 번 전송) | 두 번째 요청도 동일 201 응답; 결제 중복 호출 없음 | 응답 동일성, WireMock 호출 횟수 = 1 | 🔴 High |

---

### 6.2 HTTP 동기 연동 — Order Service → Stock Service

> **통합 포인트:** Order Service가 주문 생성 시 Stock Service에 재고 확인(`GET`) 및 차감(`PUT`)을 요청한다.
> Stock Service는 WireMock으로 대체한다.
>
> **관련 요구사항:** REQ-ORD-001, REQ-STK-001

| TC ID | 테스트 시나리오 | 사전 조건 (WireMock Stub 포함) | SUT 호출 요청 | 기대 결과 | 검증 항목 | 우선순위 |
|---|---|---|---|---|---|---|
| IT-OS-001 | 재고 충분 → 주문 진행 허용 | `[WireMock]` `GET /api/v1/stock/P-001` → `200`, `{"stock":10}` / `PUT .../decrease` → `200` | `POST /api/v1/orders` `body: {productId:"P-001", qty:3}` | HTTP 201; 재고 차감 요청 전송 확인 | 응답 status 201, WireMock PUT 호출 1회, qty=3 전송 | 🔴 High |
| IT-OS-002 | 재고 부족(409) → 주문 거절 | `[WireMock]` `GET /api/v1/stock/P-001` → `409`, `{"code":"OUT_OF_STOCK"}` | `POST /api/v1/orders` `body: {productId:"P-001", qty:10}` | HTTP 409; 오류 코드 `OUT_OF_STOCK` | 응답 status 409, body.code 확인, 재고 차감 PUT 미호출 | 🔴 High |
| IT-OS-003 | 재고 확인 성공 후 차감 요청 실패 → 주문 롤백 | `[WireMock]` GET → `200` 재고 충분 / PUT → `500` | `POST /api/v1/orders` `body: {productId:"P-001", qty:3}` | HTTP 500; 주문 생성 안 됨; 결제 요청 미발생 | 응답 status 500, DB orders 행 없음, Payment WireMock 미호출 | 🔴 High |
| IT-OS-004 | Stock Service 타임아웃 → Circuit Breaker 동작 | `[WireMock]` GET → 응답 지연 (timeout 초과) | `POST /api/v1/orders` `body: {productId:"P-001", qty:3}` | HTTP 503; CB OPEN 전이 | 응답 status 503, CB 상태 | 🟡 Medium |

---

### 6.3 비동기 메시지 — Order Service → Kafka (이벤트 발행)

> **통합 포인트:** Order Service가 주문 완료·취소 시 Kafka `order.events` 토픽에 이벤트를 발행한다.
> Kafka는 Testcontainers 또는 Embedded Kafka를 사용한다.
>
> **관련 요구사항:** REQ-ORD-003

| TC ID | 테스트 시나리오 | 사전 조건 | SUT 호출 요청 | 기대 결과 | 검증 항목 | 우선순위 |
|---|---|---|---|---|---|---|
| IT-OK-001 | 주문 완료 시 `order.completed` 이벤트 발행 | Kafka 토픽 `order.events` 구독 준비 | `POST /api/v1/orders` (결제 승인 Stub) | 토픽에 `{"eventType":"ORDER_COMPLETED","orderId":"...","amount":...}` 메시지 발행 | 토픽 수신 메시지 1건, eventType 값, orderId 일치, 스키마 유효성 | 🔴 High |
| IT-OK-002 | 주문 취소 시 `order.cancelled` 이벤트 발행 | 기존 주문 존재 (`orderId="ORD-001"`) | `DELETE /api/v1/orders/ORD-001` | 토픽에 `{"eventType":"ORDER_CANCELLED","orderId":"ORD-001"}` 메시지 발행 | 토픽 수신 메시지 1건, eventType 값, orderId 일치 | 🔴 High |
| IT-OK-003 | 결제 실패 시 이벤트 미발행 확인 | `[WireMock]` Payment → 402 결제 거절 | `POST /api/v1/orders` | `order.events` 토픽에 메시지 발행 없음 | 토픽 수신 메시지 0건 | 🟡 Medium |
| IT-OK-004 | 발행 이벤트 스키마 검증 | Kafka 토픽 구독 준비 | `POST /api/v1/orders` (결제 승인 Stub) | 발행된 메시지가 사전 정의된 Avro/JSON Schema를 준수 | 스키마 유효성 검사 통과 | 🔴 High |

---

### 6.4 인증 헤더 전파 — JWT Propagation

> **통합 포인트:** Order Service가 타 서비스(Payment, Stock)를 호출할 때 클라이언트로부터 수신한 JWT를 `Authorization` 헤더에 그대로 전파하는지 검증한다.
>
> **관련 요구사항:** REQ-AUT-001

| TC ID | 테스트 시나리오 | 사전 조건 | SUT 호출 요청 | 기대 결과 | 검증 항목 | 우선순위 |
|---|---|---|---|---|---|---|
| IT-JWT-001 | 유효한 JWT → 타 서비스 호출 시 JWT 전파 | `[WireMock]` Payment, Stock → 정상 응답 | `POST /api/v1/orders` `header: Authorization: Bearer valid.jwt.token` | WireMock으로 전달된 Payment/Stock 요청에 동일 `Authorization` 헤더 포함 | WireMock 수신 요청의 Authorization 헤더 값 일치 | 🔴 High |
| IT-JWT-002 | 만료된 JWT → SUT에서 401 반환 | - | `POST /api/v1/orders` `header: Authorization: Bearer expired.jwt.token` | HTTP 401; 타 서비스 호출 없음 | 응답 status 401, WireMock 미호출 | 🔴 High |
| IT-JWT-003 | JWT 없음 → SUT에서 401 반환 | - | `POST /api/v1/orders` (Authorization 헤더 없음) | HTTP 401; 타 서비스 호출 없음 | 응답 status 401, WireMock 미호출 | 🔴 High |

---

### 6.5 장애 내성 — Fault Tolerance

> **통합 포인트:** 의존 서비스의 장애 상황에서 SUT의 Circuit Breaker, Retry, Timeout 동작을 검증한다.
>
> **관련 요구사항:** REQ-NFR-001 (가용성)

| TC ID | 테스트 시나리오 | 사전 조건 (WireMock Stub 포함) | SUT 호출 요청 | 기대 결과 | 검증 항목 | 우선순위 |
|---|---|---|---|---|---|---|
| IT-FT-001 | Retry — 일시적 오류 후 재시도 성공 | `[WireMock]` Payment 첫 2회 → 500, 3회째 → 200 승인 | `POST /api/v1/orders` | HTTP 201; Retry 3회 후 성공 | 응답 status 201, WireMock Payment 호출 횟수 = 3 | 🔴 High |
| IT-FT-002 | Circuit Breaker — CLOSED → OPEN 전이 | `[WireMock]` Payment → 연속 500 (threshold 이상) | `POST /api/v1/orders` 반복 호출 | threshold 초과 후 HTTP 503; CB OPEN; 이후 요청은 Payment 미호출 | CB 상태 OPEN, WireMock 호출 횟수 ≤ threshold | 🔴 High |
| IT-FT-003 | Circuit Breaker — OPEN → HALF-OPEN → CLOSED | `[WireMock]` CB OPEN 후 대기 시간 경과; Payment → 200 | CB OPEN 상태에서 대기 후 `POST /api/v1/orders` | CB HALF-OPEN 시도 → 성공 → CLOSED 전이; HTTP 201 | CB 상태 전이 순서, 최종 응답 201 | 🟡 Medium |
| IT-FT-004 | Fallback — 의존 서비스 완전 장애 시 기본값 응답 | `[WireMock]` Stock Service → 연결 거부 | `POST /api/v1/orders` | Fallback 응답 반환 (서비스 정의에 따른 기본값) | Fallback 응답 내용, 로그 기록 확인 | 🟡 Medium |

---

> **📌 인터페이스 추가 방법**
> 6.1~6.5 패턴을 복사하여 6.6, 6.7 ... 로 추가한다.
> TC ID의 인터페이스 코드는 4절 서비스 의존성 맵의 ID와 반드시 일치시킨다.

---

## 7. 테스트 데이터 명세

### 7.1 WireMock Stub 시나리오 목록

> 각 TC에서 사용하는 WireMock Stub 매핑을 정의한다. TC 실행 전 해당 Stub이 등록되어야 한다.

| Stub ID | 대상 서비스 | 요청 매핑 | 응답 | 사용 TC |
|---|---|---|---|---|
| STUB-PAY-01 | Payment Service | `POST /api/v1/payments` (정상 body) | 200, `{"paymentId":"pay-001","status":"APPROVED"}` | IT-OP-001, IT-OS-001, IT-OK-001 |
| STUB-PAY-02 | Payment Service | `POST /api/v1/payments` (결제 거절 body) | 402, `{"code":"PAYMENT_DECLINED"}` | IT-OP-002, IT-OK-003 |
| STUB-PAY-03 | Payment Service | `POST /api/v1/payments` | 500 | IT-OP-003, IT-FT-001(1~2회) |
| STUB-PAY-04 | Payment Service | `POST /api/v1/payments` | 응답 지연 5000ms | IT-OP-004 |
| STUB-STK-01 | Stock Service | `GET /api/v1/stock/P-001` | 200, `{"productId":"P-001","stock":10}` | IT-OS-001, IT-OS-003 |
| STUB-STK-02 | Stock Service | `GET /api/v1/stock/P-001` | 409, `{"code":"OUT_OF_STOCK"}` | IT-OS-002 |
| STUB-STK-03 | Stock Service | `PUT /api/v1/stock/P-001/decrease` | 200 | IT-OS-001 |
| STUB-STK-04 | Stock Service | `PUT /api/v1/stock/P-001/decrease` | 500 | IT-OS-003 |

### 7.2 SUT DB Fixture

| 데이터 유형 | 식별자 | 초기 상태 / 값 | 사용 TC |
|---|---|---|---|
| 주문 (완료 상태) | `orderId="ORD-001"`, `status="PAID"` | `amount=50000` | IT-OK-002 |
| \[추가 Fixture\] | \[식별자\] | \[초기값\] | \[TC ID\] |

### 7.3 데이터 초기화 정책

| 항목 | 정책 |
|---|---|
| TC 간 데이터 격리 | 각 TC는 독립 실행 가능; 다른 TC 상태에 의존하지 않는다 |
| SUT DB 초기화 | `@BeforeEach` 또는 `beforeEach`에서 Fixture 삽입, TC 종료 후 롤백 |
| WireMock 초기화 | 각 TC 실행 전 WireMock 매핑 초기화; TC별 Stub을 `@BeforeEach`에서 등록 |
| Kafka 초기화 | 각 TC 실행 전 컨슈머 오프셋을 최신으로 이동 (`seekToEnd`) |

---

## 8. 완료 기준 (Exit Criteria)

> 아래 기준을 모두 충족하면 통합 테스트 단계를 종료하고 E2E 테스트로 진입할 수 있다.

| 기준 항목 | 목표치 | 비고 |
|---|---|---|
| 전체 TC PASS율 | 95% 이상 | |
| High 우선순위 TC PASS율 | 100% | 미달 시 E2E 진입 불가 |
| 미조치 FAIL 항목 | 0건 | Medium/Low도 조치 계획 수립 필요 |
| 인터페이스 커버리지 | 4절 등록 인터페이스 전수 실행 | |
| Circuit Breaker 시나리오 | CLOSED→OPEN→HALF-OPEN→CLOSED 전이 검증 완료 | |
| JWT 전파 검증 | 전체 의존 서비스 호출 경로 검증 완료 | |
| Critical 심각도 결함 | 0건 | 잔존 시 즉시 개발 단계 회귀 |
