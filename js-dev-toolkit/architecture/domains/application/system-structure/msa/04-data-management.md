# 데이터 관리 패턴

## DB per Service 원칙

각 서비스는 자체 DB를 소유. 다른 서비스의 DB를 직접 접근 금지.

```
✅ 올바른 구조
[Order Service] → [Order DB]
[User Service]  → [User DB]
[Order Service] → REST API → [User Service] (직접 DB 접근 ❌)

❌ 잘못된 구조
[Order Service] → [User DB] (직접 접근)
```

**왜?**
- DB 스키마 변경이 다른 서비스에 영향 없어야 함
- 서비스별 최적 DB 선택 가능 (폴리글랏 퍼시스턴스)
  - User Service → RDBMS (관계형 데이터)
  - Product Catalog → MongoDB (유연한 스키마)
  - Session → Redis (빠른 조회)
  - Search → Elasticsearch

---

## 분산 트랜잭션 문제

서비스가 나뉘면 하나의 DB 트랜잭션으로 묶을 수 없음.

```
주문 생성 시나리오
1. [Order Service] 주문 생성
2. [Inventory Service] 재고 차감
3. [Payment Service] 결제 처리

→ 2번에서 실패하면? 1번 롤백 어떻게?
```

---

## Saga 패턴 (분산 트랜잭션 해결)

각 서비스가 로컬 트랜잭션을 수행하고, 실패 시 보상 트랜잭션(Compensating Transaction)으로 롤백.

### Choreography (이벤트 기반)

```
[Order] --order.created--> [Inventory] --stock.reserved--> [Payment]
                                                               │ 실패
                           [Inventory] <--payment.failed--  [Payment]
                           재고 복원
        [Order] <--stock.release.done-- [Inventory]
        주문 취소
```

- 중앙 조율자 없음, 서비스끼리 이벤트로 소통
- 흐름 파악이 어려워짐 (디버깅 복잡)

### Orchestration (중앙 조율)

```
[Saga Orchestrator]
  1. Order Service에 주문 생성 요청
  2. Inventory Service에 재고 차감 요청
  3. 실패 → Inventory Service에 재고 복원 요청
  4. Order Service에 주문 취소 요청
```

- 흐름이 한 곳에 명시적 → 디버깅 쉬움
- Orchestrator가 단일 장애점이 될 수 있음

---

## CQRS (Command Query Responsibility Segregation)

쓰기(Command)와 읽기(Query) 모델을 분리.

```
기존 방식
[API] → [Service] → [단일 DB] (읽기/쓰기 혼재)

CQRS
[API] → Command Handler → [Write DB] --이벤트--> [Read DB] (조회 최적화)
      → Query Handler  → [Read DB]
```

**언제 사용?**
- 읽기/쓰기 비율이 크게 다를 때
- 조회 쿼리가 복잡하고 성능이 중요할 때

---

## Event Sourcing

상태(State)를 저장하지 않고 **이벤트 시퀀스**를 저장.

```
기존: DB에 현재 상태 저장
  orders 테이블: { status: "delivered" }

Event Sourcing: 이벤트 로그 저장
  [OrderCreated] → [PaymentProcessed] → [Shipped] → [Delivered]
  현재 상태 = 이벤트들을 순서대로 재생(Replay)한 결과
```

**장점**
- 완전한 변경 이력 (감사 로그 무료)
- 특정 시점 상태 복원 가능

**단점**
- 조회 복잡 (Snapshot 필요)
- 이벤트 스키마 변경 어려움

> CQRS + Event Sourcing은 자주 함께 사용되지만 독립적인 패턴
