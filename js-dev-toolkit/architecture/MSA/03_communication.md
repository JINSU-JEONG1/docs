# 서비스 간 통신 패턴

## 동기 vs 비동기

| 구분 | 동기 (Synchronous) | 비동기 (Asynchronous) |
|---|---|---|
| 방식 | 요청 → 응답 대기 | 요청 → 즉시 반환, 나중에 처리 |
| 결합도 | 높음 (호출 대상 서비스 가용 필요) | 낮음 (메시지 브로커가 중간에 위치) |
| 사용 | 즉각 결과 필요 (조회, 실시간 검증) | 결과 지연 허용 (주문 처리, 알림) |

---

## 동기 통신

### REST API

```
[Order Service] --HTTP GET /products/123--> [Product Service]
                <--------200 OK {price: 1000}----------------
```

- 표준화, 디버깅 쉬움
- 네트워크 장애 시 요청 실패 → Circuit Breaker 필수

### gRPC

```
[Order Service] --Proto message--> [Inventory Service]
```

- Protocol Buffers 사용 → REST 대비 빠름, 타입 안전
- 내부 서비스 간 고성능 통신에 적합
- HTTP/2 기반 (스트리밍 지원)

---

## 비동기 통신 (메시지 브로커)

```
[Order Service] --"order.created" event--> [Kafka] ---> [Payment Service]
                                                   ---> [Notification Service]
                                                   ---> [Inventory Service]
```

- **Kafka**: 고처리량, 이벤트 스트리밍, 메시지 영속성
- **RabbitMQ**: 유연한 라우팅, 태스크 큐에 적합

### 패턴

| 패턴 | 설명 |
|---|---|
| Event Notification | 이벤트 발생 사실만 전달 (수신측이 조회) |
| Event-Carried State Transfer | 이벤트에 변경 데이터 포함 (수신측 별도 조회 불필요) |
| Request/Reply | 비동기지만 응답을 기다림 (임시 reply queue 사용) |

---

## API Gateway

```
클라이언트 → [API Gateway] → [User Service]
                           → [Order Service]
                           → [Product Service]
```

역할:
- 라우팅 (어떤 서비스로 보낼지)
- 인증/인가 (JWT 검증)
- Rate Limiting
- 요청 집계 (BFF 패턴)
- SSL 종단

대표 도구: Kong, AWS API Gateway, Nginx, Spring Cloud Gateway

---

## 서비스 디스커버리

서비스 인스턴스가 동적으로 늘어나면 IP/Port를 하드코딩할 수 없음.

```
[Service A] → [Service Registry(Consul/Eureka)] → 현재 [Service B]의 위치 조회
           → 조회된 주소로 직접 호출
```

| 방식 | 설명 |
|---|---|
| Client-side Discovery | 클라이언트가 레지스트리 직접 조회 후 호출 (Eureka + Ribbon) |
| Server-side Discovery | 로드밸런서가 레지스트리 조회 후 라우팅 (AWS ELB, Kubernetes) |

---

## 통신 선택 기준

```
즉각적인 응답이 필요한가?
  Yes → REST or gRPC
    내부 서비스 간 고성능? → gRPC
    외부/표준 인터페이스?  → REST

  No → 메시지 브로커
    순서 보장 + 대용량? → Kafka
    유연한 라우팅?     → RabbitMQ
```
