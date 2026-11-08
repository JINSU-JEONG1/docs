# Event-Driven Architecture (이벤트 드리븐 아키텍처)

## 한 줄 요약

> 라디오 방송국은 전파를 쏘고, 라디오들이 각자 수신한다. 방송국은 청취자가 몇 명인지, 누가 듣는지 모른다.

## 학습 순서

| 파일 | 주제 | 핵심 키워드 |
|---|---|---|
| [01-overview.md](01-overview.md) | 개요 / 이벤트란 무엇인가 | 이벤트 vs 명령, Pub/Sub |
| [02-patterns.md](02-patterns.md) | 핵심 패턴 | Choreography, Orchestration, Saga |
| [03-message-broker.md](03-message-broker.md) | 메시지 브로커 | Kafka, RabbitMQ 비교 |
| [04-reliability.md](04-reliability.md) | 신뢰성 보장 | Outbox, Idempotency, Dead Letter |

## 핵심 원칙 요약

1. **이벤트 = 사실** — "주문이 생성됐다"는 과거의 사실, 변경 불가
2. **발행자/구독자 분리** — 발행자는 누가 이벤트를 소비하는지 모른다
3. **느슨한 결합** — 수신측 서비스 추가/제거 시 발행측 코드 무변경
4. **최종 일관성** — 즉시 일관성 포기, 처리 완료 시점이 각각 다름
5. **신뢰성 설계 필수** — 메시지 유실·중복·순서 뒤바뀜 대비 필요
