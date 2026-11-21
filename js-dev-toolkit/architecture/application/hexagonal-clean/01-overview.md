# 헥사고날 & 클린 아키텍처: 왜 필요한가?

## 문제: 의존성이 도메인을 오염시킨다

```
❌ 전통적인 레이어드 아키텍처
                                    
Controller ─▶ Service ─▶ Repository ─▶ MySQL
                                    
문제: Service(비즈니스 로직)가 MySQL에 의존
  → MySQL → PostgreSQL 교체 시 Service 코드도 수정
  → 테스트 시 실제 DB 필요 (느리고 무거움)
  → 외부 API 변경 시 비즈니스 로직까지 영향
```

---

## 핵심 아이디어: 의존성 역전

> **비유**: 콘센트와 플러그.  
> 컴퓨터(도메인)는 USB 규격(포트/인터페이스)만 알고 있다.  
> 마우스든, 키보드든, SSD든 — USB를 구현하면 교체 가능.  
> 컴퓨터가 "Samsung USB 마우스"를 직접 알 필요가 없다.

```
❌ 의존성 역전 전
도메인 ─────────▶ MySQL 구현체
도메인이 구현체를 직접 안다

✅ 의존성 역전 후
도메인 ─────────▶ [Repository 인터페이스]
                           ▲
                  MySQL 구현체 (implements)
도메인은 인터페이스만 알고, 구현체가 인터페이스를 따른다
```

```typescript
// ✅ 도메인이 인터페이스에만 의존
interface OrderRepository {
  save(order: Order): Promise<void>
  findById(id: string): Promise<Order>
}

class OrderService {
  constructor(private repo: OrderRepository) {} // 어떤 구현체든 OK
}

// 실제 구현체는 외부 레이어
class MySQLOrderRepository implements OrderRepository { ... }
class InMemoryOrderRepository implements OrderRepository { ... } // 테스트용
```

---

## 이것이 가져다주는 것

| 효과 | 설명 |
|---|---|
| 기술 교체 | DB, 외부 API 교체 시 도메인 코드 무변경 |
| 순수 단위 테스트 | DB 없이 InMemory 구현체로 빠른 테스트 |
| 비즈니스 로직 보호 | 프레임워크 업그레이드가 핵심 로직에 영향 없음 |
| 구조 명확성 | 어디에 무엇을 써야 하는지 명확 |
