# 통합 테스트 결과서
### Integration Test Result Report

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

1. [테스트 환경](#1-테스트-환경)
2. [테스트 범위](#2-테스트-범위)
3. [통합 테스트 케이스 명세 및 결과](#3-통합-테스트-케이스-명세-및-결과)
   1. [HTTP 동기 연동 — Order Service → Payment Service](#31-http-동기-연동--order-service--payment-service)
   2. [HTTP 동기 연동 — Order Service → Stock Service](#32-http-동기-연동--order-service--stock-service)
   3. [비동기 메시지 — Order Service → Kafka](#33-비동기-메시지--order-service--kafka)
   4. [인증 헤더 전파 — JWT Propagation](#34-인증-헤더-전파--jwt-propagation)
   5. [장애 내성 — Fault Tolerance](#35-장애-내성--fault-tolerance)
4. [인터페이스 커버리지 결과](#4-인터페이스-커버리지-결과)
5. [테스트 결과 요약](#5-테스트-결과-요약)
6. [미통과 항목 및 조치](#6-미통과-항목-및-조치)
7. [결론 및 완료 기준 충족 여부](#7-결론-및-완료-기준-충족-여부)

---

## 1. 테스트 환경

| 항목 | 내용 |
|---|---|
| 언어 / 런타임 | \[예: Java 17 / Node.js 20\] |
| 테스트 프레임워크 | \[예: JUnit 5 + Spring Boot Test / Jest + Supertest\] |
| HTTP Stub 서버 | \[예: WireMock 3.x (Testcontainers)\] |
| SUT DB | \[예: PostgreSQL 15 (Testcontainers)\] |
| 메시지 브로커 | \[예: Kafka (Testcontainers)\] |
| 서비스 기동 방식 | SUT만 실 기동; 의존 서비스는 WireMock Stub |
| 실행 환경 | \[예: Local / CI (GitHub Actions)\] |
| 테스트 실행일 | YYYY-MM-DD |

---

## 2. 테스트 범위

### 2.1 서비스 의존성 대상

| 인터페이스 ID | SUT | 의존 서비스 | 통신 방식 | 대상 여부 | 제외 사유 |
|---|---|---|---|---|---|
| IF-001 | Order Service | Payment Service | HTTP REST (WireMock) | Y | - |
| IF-002 | Order Service | Stock Service | HTTP REST (WireMock) | Y | - |
| IF-003 | Order Service | Kafka `order.events` | Event Publish | Y | - |
| IF-004 | Order Service | Member Service | HTTP REST (WireMock) | Y | - |
| \[IF-005\] | \[Order Service\] | \[Notification Service\] | \[Kafka\] | N | \[예: 다음 스프린트 구현 예정\] |

### 2.2 완료 기준

| 기준 항목 | 목표치 | 비고 |
|---|---|---|
| 전체 TC PASS율 | 95% 이상 | |
| High 우선순위 TC PASS율 | 100% | |
| 미조치 FAIL 항목 | 0건 | |
| 인터페이스 커버리지 | 대상 인터페이스 전수 실행 | |

---

## 3. 통합 테스트 케이스 명세 및 결과

> **TC ID 규칙:** `IT-[인터페이스ID]-[순번]`
>
> **결과 코드:**
> - ✅ PASS
> - ❌ FAIL
> - ⏭ SKIP

---

### 3.1 HTTP 동기 연동 — Order Service → Payment Service

> **관련 요구사항:** REQ-ORD-002, REQ-PAY-001

| TC ID | 테스트 시나리오 | 기대 결과 | 실제 결과 | 결과 | 비고 |
|---|---|---|---|---|---|
| IT-OP-001 | 결제 승인 → 주문 PAID 전이 | HTTP 201, DB status=PAID, paymentId 응답 포함 | HTTP 201, DB status=PAID 확인, paymentId 정상 반환 | ✅ PASS | |
| IT-OP-002 | 결제 거절(402) → 주문 CANCELLED | HTTP 400, body.code=PAYMENT_DECLINED, DB 주문 없음 | HTTP 400, 오류 코드 확인, DB 주문 없음 확인 | ✅ PASS | |
| IT-OP-003 | Payment Service 500 → SUT 502 반환 | HTTP 502, DB 주문 없음 | HTTP 500 반환 — 502 변환 처리 누락 | ❌ FAIL | 6절 참조 |
| IT-OP-004 | Payment Service 타임아웃 → CB OPEN | HTTP 503, CB OPEN 전이 | HTTP 503, CB OPEN 확인 | ✅ PASS | |
| IT-OP-005 | 동일 요청 재전송 — 멱등성 보장 | 두 번째 요청도 201, WireMock 호출 1회 | 201 동일 응답, WireMock 호출 횟수 1회 확인 | ✅ PASS | |

---

### 3.2 HTTP 동기 연동 — Order Service → Stock Service

> **관련 요구사항:** REQ-ORD-001, REQ-STK-001

| TC ID | 테스트 시나리오 | 기대 결과 | 실제 결과 | 결과 | 비고 |
|---|---|---|---|---|---|
| IT-OS-001 | 재고 충분 → 주문 진행 허용 | HTTP 201, WireMock PUT 호출 1회 (qty=3) | HTTP 201, WireMock PUT 호출 확인, qty 값 일치 | ✅ PASS | |
| IT-OS-002 | 재고 부족(409) → 주문 거절 | HTTP 409, body.code=OUT_OF_STOCK, PUT 미호출 | HTTP 409, 오류 코드 확인, PUT 미호출 확인 | ✅ PASS | |
| IT-OS-003 | 재고 차감 실패 → 주문 롤백 | HTTP 500, DB 주문 없음, Payment 미호출 | HTTP 500, DB 주문 없음 확인, Payment WireMock 미호출 확인 | ✅ PASS | |
| IT-OS-004 | Stock Service 타임아웃 → CB 동작 | HTTP 503, CB OPEN 전이 | HTTP 503, CB OPEN 확인 | ✅ PASS | |

---

### 3.3 비동기 메시지 — Order Service → Kafka

> **관련 요구사항:** REQ-ORD-003

| TC ID | 테스트 시나리오 | 기대 결과 | 실제 결과 | 결과 | 비고 |
|---|---|---|---|---|---|
| IT-OK-001 | 주문 완료 시 `order.completed` 이벤트 발행 | 토픽 메시지 1건, eventType=ORDER_COMPLETED, orderId 일치 | 메시지 1건 수신, eventType·orderId 일치 확인 | ✅ PASS | |
| IT-OK-002 | 주문 취소 시 `order.cancelled` 이벤트 발행 | 토픽 메시지 1건, eventType=ORDER_CANCELLED | 메시지 1건 수신, eventType 확인 | ✅ PASS | |
| IT-OK-003 | 결제 실패 시 이벤트 미발행 | 토픽 메시지 0건 | 토픽 메시지 0건 확인 | ✅ PASS | |
| IT-OK-004 | 발행 이벤트 스키마 검증 | JSON Schema 검사 통과 | 스키마 검사 통과 | ✅ PASS | |

---

### 3.4 인증 헤더 전파 — JWT Propagation

> **관련 요구사항:** REQ-AUT-001

| TC ID | 테스트 시나리오 | 기대 결과 | 실제 결과 | 결과 | 비고 |
|---|---|---|---|---|---|
| IT-JWT-001 | 유효 JWT → 타 서비스 호출 시 JWT 전파 | WireMock 수신 요청에 동일 Authorization 헤더 포함 | WireMock 수신 요청 헤더 확인, 값 일치 | ✅ PASS | |
| IT-JWT-002 | 만료된 JWT → 401 반환, 타 서비스 미호출 | HTTP 401, WireMock 미호출 | HTTP 401, WireMock 미호출 확인 | ✅ PASS | |
| IT-JWT-003 | JWT 없음 → 401 반환 | HTTP 401, WireMock 미호출 | HTTP 401, WireMock 미호출 확인 | ✅ PASS | |

---

### 3.5 장애 내성 — Fault Tolerance

> **관련 요구사항:** REQ-NFR-001

| TC ID | 테스트 시나리오 | 기대 결과 | 실제 결과 | 결과 | 비고 |
|---|---|---|---|---|---|
| IT-FT-001 | Retry — 일시적 오류 후 3회째 성공 | HTTP 201, WireMock 호출 3회 | HTTP 201, WireMock 호출 횟수 3회 확인 | ✅ PASS | |
| IT-FT-002 | CB CLOSED → OPEN 전이 | HTTP 503, CB OPEN, 이후 WireMock 미호출 | CB OPEN 전이 확인, WireMock 추가 호출 없음 | ✅ PASS | |
| IT-FT-003 | CB OPEN → HALF-OPEN → CLOSED 전이 | 대기 후 재시도 성공, CB CLOSED 복구 | CB 상태 전이 순서 확인, 최종 201 반환 | ✅ PASS | |
| IT-FT-004 | Fallback — Stock Service 완전 장애 | Fallback 응답 반환, 로그 기록 | Fallback 응답 확인, 로그 기록 확인 | ✅ PASS | |

---

> **📌 인터페이스 추가 방법**
> 3.1~3.5 패턴을 복사하여 3.6, 3.7 ... 로 추가한다.
> TC ID의 인터페이스 코드는 2.1절 서비스 의존성 대상의 ID와 반드시 일치시킨다.

---

## 4. 인터페이스 커버리지 결과

### 4.1 인터페이스별 테스트 커버리지

| 인터페이스 ID | SUT → 의존 서비스 | 등록 TC 수 | 실행 TC 수 | PASS | FAIL | SKIP | PASS율 |
|---|---|---|---|---|---|---|---|
| IF-001 | Order → Payment | 5 | 5 | 4 | 1 | 0 | 80% |
| IF-002 | Order → Stock | 4 | 4 | 4 | 0 | 0 | 100% |
| IF-003 | Order → Kafka | 4 | 4 | 4 | 0 | 0 | 100% |
| IF-004 | JWT Propagation | 3 | 3 | 3 | 0 | 0 | 100% |
| IF-FT | Fault Tolerance | 4 | 4 | 4 | 0 | 0 | 100% |
| **전체** | | **20** | **20** | **19** | **1** | **0** | **95%** |

### 4.2 시나리오 유형별 커버리지

| 시나리오 유형 | 필수 여부 | 커버 여부 | 비고 |
|---|---|---|---|
| 정상 흐름 (Happy Path) | 필수 | ✅ 전수 커버 | - |
| HTTP 오류 응답 처리 (4xx/5xx) | 필수 | ✅ 전수 커버 | - |
| 타임아웃 처리 | 필수 | ✅ 전수 커버 | IT-OP-004, IT-OS-004 |
| Circuit Breaker 상태 전이 | 필수 | ✅ 전수 커버 | IT-FT-002, IT-FT-003 |
| Retry 동작 | 필수 | ✅ 전수 커버 | IT-FT-001 |
| 멱등성 (Idempotency) | 필수 | ✅ 전수 커버 | IT-OP-005 |
| JWT 전파 | 필수 | ✅ 전수 커버 | IT-JWT-001~003 |
| 이벤트 스키마 검증 | 필수 | ✅ 전수 커버 | IT-OK-004 |
| 분산 트랜잭션 롤백 (Saga) | 권장 | ⏭ 미커버 | 별도 Saga 통합 테스트로 분리 예정 |
| 부하 / 성능 | 권장 | ⏭ 미커버 | 성능 테스트 단계로 이관 |

---

## 5. 테스트 결과 요약

| 항목 | 수치 |
|---|---|
| 전체 TC 수 | 20 |
| PASS | 19 |
| FAIL | 1 |
| SKIP | 0 |
| **PASS율** | **95%** |
| High 우선순위 PASS율 | 93.3% (14/15) |
| 테스트 실행 시간 | 6분 18초 |

---

## 6. 미통과 항목 및 조치

> FAIL 항목에 대해 원인과 조치 내역을 반드시 기술한다.

| TC ID | 테스트 시나리오 | 실패 원인 | 심각도 | 담당자 | 조치 내용 | 조치 완료일 | 재테스트 결과 |
|---|---|---|---|---|---|---|---|
| IT-OP-003 | Payment Service 500 → SUT 502 반환 | Order Service 글로벌 예외 핸들러에서 upstream 5xx를 502로 변환하는 로직 누락 | High | 홍길동 | 글로벌 예외 핸들러에 `FeignException.InternalServerError` → HTTP 502 변환 로직 추가 | YYYY-MM-DD | ✅ PASS |

---

## 7. 결론 및 완료 기준 충족 여부

### 7.1 Exit Criteria 점검

| 완료 기준 | 목표 | 실측값 | 충족 여부 |
|---|---|---|---|
| 전체 PASS율 | 95% 이상 | 100% (재테스트 후) | ✅ |
| High 우선순위 PASS율 | 100% | 100% (재테스트 후) | ✅ |
| 미조치 FAIL 항목 | 0건 | 0건 | ✅ |
| 인터페이스 커버리지 | 대상 인터페이스 전수 실행 | IF-001~004, IF-FT 전수 실행 | ✅ |
| Circuit Breaker 전이 검증 | 완료 | CLOSED→OPEN→HALF-OPEN→CLOSED 확인 | ✅ |
| JWT 전파 검증 | 완료 | Payment·Stock 호출 경로 전수 확인 | ✅ |
| Critical 심각도 결함 | 0건 | 0건 | ✅ |

### 7.2 종합 의견

> 테스트 결과에 대한 종합 의견 및 다음 단계(E2E 테스트) 진입 가능 여부를 기술한다.

\[예: 발견된 1건의 결함(IT-OP-003)은 upstream 오류 코드 변환 누락으로 High 심각도 처리하였으며, 조치 완료 및 재테스트 PASS를 확인하였다.
모든 완료 기준을 충족하였으므로 통합 테스트 단계를 완료하고 E2E 테스트 단계로 진입 가능한 것으로 판단한다.\]

---

### 7.3 승인 서명란

| 역할 | 이름 | 서명 | 승인일 |
|---|---|---|---|
| 작성자 | | | |
| QA 리드 | | | |
| PM | | | |
