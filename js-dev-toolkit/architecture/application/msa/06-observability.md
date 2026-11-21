# 관찰가능성 (Observability)

분산 시스템은 장애 발생 시 어느 서비스에서 문제가 생겼는지 파악하기 어렵다.  
Observability = Logging + Tracing + Metrics의 세 축.

---

## Logging (로깅)

### 구조화된 로그 (Structured Logging)

```json
// ❌ 텍스트 로그 (검색/분석 어려움)
"2024-01-15 주문 처리 실패 user 123"

// ✅ 구조화된 로그 (JSON)
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "ERROR",
  "service": "order-service",
  "traceId": "abc123",
  "userId": 123,
  "orderId": 456,
  "message": "주문 처리 실패",
  "error": "PaymentServiceUnavailable"
}
```

### Correlation ID (상관 ID)

하나의 요청이 여러 서비스를 거칠 때, 같은 ID로 추적.

```
클라이언트 요청 → API Gateway (traceId: abc123 생성)
  → Order Service   (traceId: abc123 전파)
  → Payment Service (traceId: abc123 전파)
  → Notification    (traceId: abc123 전파)

→ traceId: abc123 로 검색하면 전체 흐름 추적 가능
```

### 중앙 집중 로그 수집

```
각 서비스 → [Fluentd/Logstash] → [Elasticsearch] → [Kibana 대시보드]
                                                     (ELK Stack)
```

---

## Distributed Tracing (분산 추적)

요청이 서비스들을 거치는 전체 경로와 각 구간 소요 시간 시각화.

```
Trace: abc123
├── API Gateway       [0ms ~ 5ms]
├── Order Service     [5ms ~ 50ms]
│   └── DB 쿼리       [10ms ~ 40ms]
├── Inventory Service [50ms ~ 80ms]
└── Payment Service   [80ms ~ 200ms]  ← 여기서 병목
```

**용어**
- **Trace**: 하나의 요청 전체 여정
- **Span**: 각 서비스 내 작업 단위
- **Span Context**: traceId, spanId → 서비스 간 전파

대표 도구: Jaeger, Zipkin, AWS X-Ray, OpenTelemetry(표준)

---

## Metrics (메트릭)

숫자로 나타내는 시스템 상태.

| 유형 | 예시 |
|---|---|
| Counter | 총 요청 수, 에러 발생 횟수 |
| Gauge | 현재 메모리 사용량, 활성 연결 수 |
| Histogram | 응답 시간 분포 (p50, p95, p99) |

### RED 방법론 (서비스 모니터링 핵심 3가지)

| 항목 | 설명 |
|---|---|
| **R**ate | 초당 요청 수 |
| **E**rrors | 에러율 (%) |
| **D**uration | 응답 시간 (latency) |

대표 도구: Prometheus(수집) + Grafana(시각화)

---

## Health Check

서비스가 정상 동작 중인지 확인하는 엔드포인트.

```
GET /health → 200 OK { "status": "healthy" }
GET /health → 503    { "status": "unhealthy", "db": "disconnected" }
```

- **Liveness**: 서비스가 살아있는가? (죽으면 재시작)
- **Readiness**: 서비스가 요청 처리 가능한가? (아니면 트래픽 제외)

---

## 권장 스택 조합

```
Logging  → ELK Stack (Elasticsearch + Logstash + Kibana)
Tracing  → Jaeger + OpenTelemetry
Metrics  → Prometheus + Grafana
알림     → Grafana Alerting or PagerDuty
```
