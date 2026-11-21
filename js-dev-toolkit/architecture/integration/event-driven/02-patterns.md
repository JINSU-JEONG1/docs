# 이벤트 드리븐 핵심 패턴

## 1. Choreography vs Orchestration

> **비유:**  
> - Choreography = 각자 악보 보고 연주하는 오케스트라 (지휘자 없음)  
> - Orchestration = 지휘자(Orchestrator)가 단원들에게 신호 보냄

### Choreography (안무)

```
[주문] ─▶ order.created ─▶ [결제]
                              │
                              ▼
                         payment.completed ─▶ [배송]
                                                │
                                                ▼
                                          shipping.started ─▶ [알림]
```

- 각 서비스가 이전 이벤트를 구독하고 자신의 이벤트를 발행
- 중앙 조율자 없음 → 결합도 낮음
- 단점: 전체 흐름 파악이 어렵다. "지금 주문이 어느 단계인가?" 알기 어려움

### Orchestration (지휘)

```
                    [주문 Saga Orchestrator]
                    /         |          \
               결제 요청    배송 요청    알림 요청
                    \         |          /
                    각 서비스가 결과 반환
```

- 중앙 Orchestrator가 전체 흐름을 알고 단계별로 지시
- 장점: 흐름 파악 쉬움, 보상 트랜잭션 관리 쉬움
- 단점: Orchestrator가 복잡해지고 단일 장애점이 될 수 있음

---

## 2. Saga 패턴 (분산 트랜잭션 대체)

> **비유**: 여행 예약처럼. 항공권 → 호텔 → 렌터카 순서로 예약.  
> 렌터카 실패 시 → 호텔 취소 → 항공권 취소 (보상 트랜잭션).

```
정상 흐름
[주문생성] → [결제처리] → [재고차감] → [배송시작]

실패 시 보상 흐름 (결제 실패)
[주문생성] → [결제실패] → [주문취소(보상)]

실패 시 보상 흐름 (재고 부족)
[주문생성] → [결제성공] → [재고실패] → [결제환불(보상)] → [주문취소(보상)]
```

| 단계 | 정상 | 보상 (롤백) |
|---|---|---|
| 주문 | 주문 생성 | 주문 취소 |
| 결제 | 결제 처리 | 결제 환불 |
| 재고 | 재고 차감 | 재고 복구 |
| 배송 | 배송 시작 | 배송 취소 |

---

## 3. Event 유형별 패턴

### Event Notification (사실만 전달)

```typescript
// 이벤트에 최소 정보만 포함
{ event: 'order.created', orderId: '123' }

// 수신측이 필요하면 직접 조회
const order = await orderService.getOrder('123')
```

- 장점: 이벤트 크기 작음
- 단점: 수신측이 추가 API 호출 필요

### Event-Carried State Transfer (상태 포함)

```typescript
// 이벤트에 필요한 데이터 모두 포함
{
  event: 'order.created',
  orderId: '123',
  userId: 'u456',
  amount: 50000,
  items: [...]
}
```

- 장점: 수신측 추가 조회 불필요
- 단점: 이벤트 크기 증가, 데이터 중복
