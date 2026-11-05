# 의존성 규칙

## 허용되는 의존 vs 금지되는 의존

```
✅ 허용: 단방향 의존
order → user    (주문이 사용자 정보를 조회)
payment → order (결제가 주문 정보를 조회)

❌ 금지: 순환 의존
order → payment
payment → order   ← 순환! 하나 바꾸면 다른 것도 영향
```

> 비유: A가 B에게 전화하고, B도 A에게 전화한다면 — 둘은 분리된 게 아니다.

---

## 의존성 방향 설계

```
         [shared / kernel]
               ↑
    ┌──────────┼──────────┐
    │          │          │
 [user]    [order]    [payment]
               │
               ↓
           [inventory]
```

- `shared`는 공통 유틸/타입만. 비즈니스 로직 절대 금지.
- 상위 도메인이 하위 도메인을 알아야 할 이유가 생기면 → 설계 재검토

---

## 순환 의존 해결 방법

### 방법 1: 이벤트로 분리

```
❌ 순환 의존
order.service → payment.service (결제 요청)
payment.service → order.service (주문 상태 업데이트)

✅ 이벤트로 분리
order.service → [이벤트: payment.requested]
payment.service → [이벤트: payment.completed]
order.service ← 이벤트 구독 → 상태 업데이트
```

### 방법 2: 공통 모듈로 분리

```
❌ 순환
notification → user (이메일 조회)
user → notification (알림 발송)

✅ 분리
notification → user (이메일 조회만, 단방향)
user가 알림을 보내야 하면 → notification 직접 사용 or 이벤트
```

---

## 공유 DB 사용 규칙

모듈러 모놀리스는 단일 DB를 공유하지만, **테이블 소유권**은 명확히 한다.

```
✅ 올바른 DB 접근
order 모듈 → orders 테이블, order_items 테이블 (소유)
payment 모듈 → payments 테이블 (소유)

❌ 잘못된 DB 접근
payment 모듈 → orders 테이블 직접 조회  ← 소유권 침해
→ 대신 order 모듈의 Public API를 통해 조회
```

| 규칙 | 설명 |
|---|---|
| 테이블은 하나의 모듈이 소유 | 다른 모듈이 직접 접근 금지 |
| 읽기 전용 뷰는 허용 | 읽기 성능 위해 DB View 공유 가능 |
| JOIN은 같은 모듈 테이블 간만 | 모듈 간 JOIN → API 호출로 대체 |
