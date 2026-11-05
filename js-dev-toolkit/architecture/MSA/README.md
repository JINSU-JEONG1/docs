# MSA (Microservices Architecture)

## 학습 순서

| 파일 | 주제 | 핵심 키워드 |
|---|---|---|
| [01_overview.md](./01_overview.md) | 개요 / Monolith vs MSA | 언제 MSA를 쓰는가 |
| [02_service_decomposition.md](./02_service_decomposition.md) | 서비스 분해 전략 | DDD, Bounded Context, Anti-pattern |
| [03_communication.md](./03_communication.md) | 서비스 간 통신 | REST, gRPC, Kafka, API Gateway |
| [04_data_management.md](./04_data_management.md) | 데이터 관리 | DB per Service, Saga, CQRS, Event Sourcing |
| [05_resilience.md](./05_resilience.md) | 장애 복원성 | Circuit Breaker, Retry, Bulkhead |
| [06_observability.md](./06_observability.md) | 관찰가능성 | Logging, Tracing, Metrics |
| [07_deployment.md](./07_deployment.md) | 배포 전략 | Docker, Kubernetes, Blue/Green, Canary |

## 핵심 원칙 요약

1. **서비스 분리** — 비즈니스 기능 / Bounded Context 기준으로 나눈다
2. **DB 분리** — 서비스마다 자체 DB, 공유 DB 절대 금지
3. **느슨한 결합** — 인터페이스(API/이벤트)로만 통신
4. **장애 격리** — Circuit Breaker로 장애 전파 차단
5. **관찰가능성** — 분산 환경에서는 로깅/트레이싱/메트릭 필수
