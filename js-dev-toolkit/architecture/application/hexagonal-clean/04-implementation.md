# 실전 폴더 구조 및 구현

## 폴더 구조 예시

```
src/
├── domain/                    ← Entities (가장 안쪽)
│   ├── order/
│   │   ├── order.entity.ts
│   │   ├── order-item.vo.ts
│   │   └── order.errors.ts
│   └── payment/
│       └── payment.entity.ts
│
├── application/               ← Use Cases
│   ├── order/
│   │   ├── place-order.usecase.ts
│   │   ├── cancel-order.usecase.ts
│   │   └── ports/
│   │       ├── order.repository.port.ts    ← Output Port (인터페이스)
│   │       └── payment.gateway.port.ts     ← Output Port (인터페이스)
│   └── ...
│
├── adapter/                   ← Interface Adapters
│   ├── in/                    ← Driving Adapters
│   │   ├── http/
│   │   │   └── order.controller.ts
│   │   └── event/
│   │       └── order-event.handler.ts
│   └── out/                   ← Driven Adapters
│       ├── persistence/
│       │   └── prisma-order.repository.ts
│       └── payment/
│           └── stripe.gateway.ts
│
└── main.ts                    ← DI 조립 (Frameworks 레이어)
```

---

## DI(의존성 주입) 조립

```typescript
// main.ts: 모든 구현체를 여기서 연결
const orderRepo = new PrismaOrderRepository(prisma)
const paymentGateway = new StripePaymentGateway(stripeClient)
const placeOrderUseCase = new PlaceOrderUseCase(orderRepo, paymentGateway)
const orderController = new OrderController(placeOrderUseCase)

// 테스트 환경에서는 인메모리로 교체
const orderRepo = new InMemoryOrderRepository()
const paymentGateway = new FakePaymentGateway()
const placeOrderUseCase = new PlaceOrderUseCase(orderRepo, paymentGateway)
```

---

## 테스트 전략

```
도메인 단위 테스트 (빠름, DB 없음)
  └── order.entity.test.ts
      └── new Order(), addItem(), totalAmount 검증

Use Case 단위 테스트 (빠름, InMemory 사용)
  └── place-order.usecase.test.ts
      └── InMemoryOrderRepository, FakePaymentGateway 사용

통합 테스트 (느림, 실제 DB)
  └── order.repository.test.ts
      └── 실제 PostgreSQL 연결
```

---

## 언제 이 아키텍처가 과도한가?

```
✅ 적합한 경우
- 복잡한 비즈니스 규칙이 있는 서비스
- 기술 교체 가능성이 있는 경우 (DB 마이그레이션, API 변경)
- 팀이 커서 레이어 경계가 필요한 경우

❌ 과도한 경우
- CRUD만 있는 단순 서비스 → 레이어드 아키텍처로 충분
- 프로토타입, MVP 단계 → 오버엔지니어링
- 비즈니스 규칙이 없는 데이터 파이프라인
```
