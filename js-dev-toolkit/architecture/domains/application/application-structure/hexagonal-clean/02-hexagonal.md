# 헥사고날 아키텍처 (Ports & Adapters)

## 구조

```
                    ┌──────────────────────────────┐
                    │           Hexagon             │
  HTTP 요청 ─▶ [Driving Adapter]                   │
                    │  ┌──────────────────────┐    │
  CLI 명령  ─▶ [    │  │                      │    │]
                    │  │   Application Core   │    │
  Test      ─▶ [    │  │   (Domain + UseCases)│    │]
                    │  │                      │    │
                    │  └──────────────────────┘    │
                    │                   [Driven Adapter] ─▶ MySQL
                    │                   [Driven Adapter] ─▶ Redis
                    │                   [Driven Adapter] ─▶ 외부 API
                    └──────────────────────────────┘
```

- **Driving Side (왼쪽)**: 외부에서 앱을 구동하는 쪽 (HTTP, CLI, 테스트)
- **Driven Side (오른쪽)**: 앱이 외부를 구동하는 쪽 (DB, 외부 API, 이메일)

---

## Port와 Adapter

> **Port = 인터페이스 (규격)**  
> **Adapter = 구현체 (실제 플러그)**

### Driving Port (Input Port)

```typescript
// Port: 애플리케이션이 외부에 제공하는 Use Case 인터페이스
interface PlaceOrderUseCase {
  execute(command: PlaceOrderCommand): Promise<OrderId>
}

// Driving Adapter: HTTP Controller가 Port를 사용
class OrderController {
  constructor(private useCase: PlaceOrderUseCase) {}
  
  async post(req: Request) {
    return this.useCase.execute(req.body)
  }
}
```

### Driven Port (Output Port)

```typescript
// Port: 도메인이 외부에 요구하는 인터페이스
interface OrderRepository {
  save(order: Order): Promise<void>
  findById(id: OrderId): Promise<Order | null>
}

// Driven Adapter: 실제 DB 구현
class PostgresOrderRepository implements OrderRepository {
  async save(order: Order) { /* SQL 실행 */ }
  async findById(id: OrderId) { /* SQL 조회 */ }
}

// Test Adapter: 테스트용 인메모리 구현
class InMemoryOrderRepository implements OrderRepository {
  private store = new Map<string, Order>()
  async save(order: Order) { this.store.set(order.id, order) }
  async findById(id: OrderId) { return this.store.get(id) ?? null }
}
```

---

## 왜 "헥사고날(육각형)"인가?

```
       [HTTP]  [CLI]
          \    /
     [Driving Adapters]
            │
         (Port)
    ┌──────────────┐
    │    Domain    │ ← 육각형 (여러 면에 포트가 붙을 수 있음)
    └──────────────┘
         (Port)
            │
     [Driven Adapters]
          /    \
      [DB]   [외부 API]
```

육각형의 각 면에 포트(인터페이스)가 붙고, 어댑터가 연결된다.  
면의 수는 임의적 — "여러 방향에서 교체 가능한 연결점이 있다"는 의미.
