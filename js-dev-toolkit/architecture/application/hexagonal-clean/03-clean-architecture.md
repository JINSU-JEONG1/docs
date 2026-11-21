# 클린 아키텍처

## 구조: 양파 레이어

> **비유**: 양파처럼 레이어가 겹쳐져 있다.  
> 안쪽 레이어는 바깥쪽을 **절대 모른다**.  
> 의존성은 항상 바깥 → 안쪽 방향으로만.

```
┌────────────────────────────────────────┐
│  Frameworks & Drivers                   │  ← DB, Web, UI
│  ┌──────────────────────────────────┐  │
│  │  Interface Adapters              │  │  ← Controller, Repository 구현
│  │  ┌──────────────────────────┐   │  │
│  │  │  Application Business   │   │  │  ← Use Cases
│  │  │  ┌────────────────────┐ │   │  │
│  │  │  │  Enterprise        │ │   │  │  ← Entities (핵심 도메인)
│  │  │  │  Business Rules    │ │   │  │
│  │  │  └────────────────────┘ │   │  │
│  │  └──────────────────────────┘   │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘

의존성 방향: 바깥 ──▶ 안쪽 (역방향 절대 금지)
```

---

## 각 레이어의 역할

### 1. Entities (가장 안쪽)

```typescript
// 순수 비즈니스 규칙. DB, HTTP, 프레임워크 import 없음
class Order {
  private items: OrderItem[] = []
  
  addItem(item: OrderItem) {
    if (item.quantity <= 0) throw new Error('수량은 1 이상')
    this.items.push(item)
  }
  
  get totalAmount() {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  }
}
```

### 2. Use Cases (Application 레이어)

```typescript
// 애플리케이션 흐름 조율. Entity 사용. 외부 의존 없음.
class PlaceOrderUseCase {
  constructor(
    private orderRepo: OrderRepository,   // 인터페이스 (포트)
    private paymentGateway: PaymentPort,  // 인터페이스 (포트)
  ) {}
  
  async execute(cmd: PlaceOrderCommand): Promise<OrderId> {
    const order = new Order(cmd.userId, cmd.items)
    await this.paymentGateway.charge(order.totalAmount)
    await this.orderRepo.save(order)
    return order.id
  }
}
```

### 3. Interface Adapters

```typescript
// Controller: HTTP 요청 → Use Case 호출
class OrderController {
  async createOrder(req: Request, res: Response) {
    const orderId = await this.placeOrder.execute(req.body)
    res.json({ orderId })
  }
}

// Repository 구현: DB → Domain Entity로 변환
class PrismaOrderRepository implements OrderRepository {
  async save(order: Order) {
    await prisma.order.create({ data: toDbModel(order) })
  }
}
```

### 4. Frameworks & Drivers (가장 바깥)

```typescript
// Express, Prisma, Kafka 설정 등
// 이 레이어만 프레임워크를 직접 다룬다
app.post('/orders', orderController.createOrder)
```

---

## 의존성 규칙 위반 탐지

```
✅ 허용
Frameworks ─▶ Adapters ─▶ Use Cases ─▶ Entities

❌ 금지 (즉시 수정 필요)
Use Case에서 express.Request import
Entity에서 prisma import
Use Case에서 axios.get 직접 호출
```
