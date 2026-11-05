# 신뢰성 보장

## 문제: 이벤트 발행과 DB 저장의 원자성

```
❌ 위험한 패턴
1. DB에 주문 저장 (성공)
2. Kafka에 이벤트 발행 (실패!) ← 여기서 에러 발생
→ DB엔 주문이 있지만 결제, 알림, 재고 서비스는 모름
```

---

## Transactional Outbox 패턴

> **비유**: 편지를 쓰고 우체통에 넣는 대신 — 먼저 책상 서랍(Outbox)에 넣어두고,
> 우편배달부(Message Relay)가 주기적으로 서랍을 비워 발송한다.
> 서랍과 편지 작성은 한 번에 이루어지므로 절대 잊히지 않는다.

```
✅ Outbox 패턴

Transaction 내에서 원자적으로:
┌─────────────────────────────────┐
│ 1. orders 테이블에 INSERT        │
│ 2. outbox 테이블에 이벤트 INSERT  │  ← 같은 DB 트랜잭션
└─────────────────────────────────┘
              │
              ▼
[Message Relay 프로세스] ← 별도 스레드/서비스
     주기적으로 outbox 조회
              │
              ▼
         [Kafka/RabbitMQ] ─▶ 소비자 서비스들
```

```sql
-- outbox 테이블 구조
CREATE TABLE outbox (
  id          UUID PRIMARY KEY,
  event_type  VARCHAR(100),    -- 'order.created'
  payload     JSONB,           -- 이벤트 데이터
  published   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP
);
```

---

## 멱등성 (Idempotency)

> **비유**: 엘리베이터 버튼을 10번 눌러도 결과는 1번 누른 것과 같다.

At-least-once 전달에서 같은 이벤트가 중복 도착할 수 있다.  
같은 이벤트를 여러 번 처리해도 결과가 같아야 한다.

```typescript
// ❌ 멱등성 없음
async function handlePaymentCompleted(event) {
  await order.addPoint(event.userId, event.amount * 0.01)
  // 중복 실행 시 포인트 2배 적립
}

// ✅ 멱등성 보장
async function handlePaymentCompleted(event) {
  const alreadyProcessed = await processedEvents.exists(event.id)
  if (alreadyProcessed) return
  
  await order.addPoint(event.userId, event.amount * 0.01)
  await processedEvents.save(event.id)
}
```

---

## Dead Letter Queue (DLQ)

> **비유**: 반송 우편함. 주소 불명·수취 거부 편지들이 모이는 곳.

처리 실패한 메시지를 DLQ로 격리 → 정상 메시지 처리를 막지 않음.

```
[Kafka Topic] ─▶ Consumer (처리 실패, 3번 재시도)
                        │
                        ▼
              [Dead Letter Topic]
                        │
                        ▼
              운영팀 알림 / 수동 검토 / 재처리
```

| 전략 | 설명 |
|---|---|
| 즉시 재시도 | 일시적 오류 (네트워크 순간 장애) |
| 지수 백오프 | 1초 → 2초 → 4초 → DLQ |
| DLQ 보관 | 원인 파악 후 수동 재처리 |
