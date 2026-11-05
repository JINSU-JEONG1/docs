# 메시지 브로커

## Kafka vs RabbitMQ

> **Kafka 비유**: 신문 아카이브. 발행된 신문은 보관되고, 독자는 언제든 원하는 날짜부터 읽을 수 있다.  
> **RabbitMQ 비유**: 우체통. 편지가 배달되면 수신자가 꺼내고 우체통에서 사라진다.

```
Kafka (로그 기반)                    RabbitMQ (큐 기반)
                                      
Publisher ─▶ [Topic: 파티션1]         Publisher ─▶ [Exchange]
             [파티션2     ] ─▶ Consumer A           │
             [파티션3     ]                     ┌───┴───┐
                           ─▶ Consumer B       │       │
                                            [Queue1] [Queue2]
메시지가 보관됨 (보관 기간 설정)           │       │
Consumer가 Offset으로 위치 관리       Consumer A  Consumer B
```

| 기준 | Kafka | RabbitMQ |
|---|---|---|
| 메시지 보관 | 설정 기간 보관 (재처리 가능) | 소비 후 삭제 |
| 처리량 | 초당 수백만 메시지 | 초당 수만 메시지 |
| 순서 보장 | 파티션 내 보장 | 큐 내 보장 |
| 라우팅 | 단순 (Topic 기반) | 유연 (Exchange 타입 다양) |
| 적합 사례 | 이벤트 스트리밍, 로그 수집 | 태스크 큐, 복잡한 라우팅 |

---

## Kafka 핵심 개념

```
Producer ─▶ Topic [order-events]
                ├── Partition 0: [msg1, msg4, msg7]
                ├── Partition 1: [msg2, msg5, msg8]
                └── Partition 2: [msg3, msg6, msg9]
                        │
               Consumer Group [payment-service]
                        ├── Consumer 0 ← Partition 0
                        ├── Consumer 1 ← Partition 1
                        └── Consumer 2 ← Partition 2
```

- **Topic**: 메시지를 분류하는 채널 (예: `order-events`, `payment-events`)
- **Partition**: Topic을 병렬 처리하기 위해 나눈 단위. 파티션 수 = 최대 병렬 소비자 수
- **Offset**: Consumer가 어디까지 읽었는지 위치 표시
- **Consumer Group**: 같은 그룹 내 Consumer들이 파티션을 나눠서 처리

---

## 메시지 전달 보증 수준

| 수준 | 설명 | 사용 사례 |
|---|---|---|
| At-most-once | 최대 1번 전달. 유실 가능 | 로그, 분석 (유실 허용) |
| At-least-once | 최소 1번 전달. 중복 가능 | 일반적인 이벤트 처리 |
| Exactly-once | 정확히 1번. 중복·유실 없음 | 결제, 재고 (중복 위험) |

> **실무**: Exactly-once는 성능 비용이 크다.  
> At-least-once + **멱등성 처리**로 중복을 무력화하는 게 일반적.
