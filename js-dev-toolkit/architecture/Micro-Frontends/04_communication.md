# MFE 간 통신

## 기본 원칙

> MFE 간 직접 통신은 결합도를 높인다.  
> MFE는 서로를 모르는 것이 이상적이다.

```
❌ 나쁜 예
OrderMFE → PaymentMFE.processPayment(amount)
→ 직접 참조 → 강결합

✅ 좋은 예
OrderMFE → [이벤트: order.ready] → Shell or EventBus
PaymentMFE ← [이벤트 구독] ← 주문 완료 사실만 받음
```

---

## 통신 방식 3가지

### 1. Custom Events (브라우저 표준)

```typescript
// 주문 MFE: 이벤트 발행
window.dispatchEvent(new CustomEvent('mfe:order-placed', {
  detail: { orderId: '123', amount: 50000 }
}))

// 결제 MFE: 이벤트 구독
window.addEventListener('mfe:order-placed', (event) => {
  const { orderId, amount } = event.detail
  initPayment(orderId, amount)
})
```

- 브라우저 표준, 추가 라이브러리 불필요
- MFE가 서로를 직접 모름
- 단점: 타입 안전성 없음, 디버깅 어려움

---

### 2. URL / Router 기반

```
/order/123              → 주문 MFE 렌더링
/order/123/payment      → 결제 MFE 렌더링 (orderId를 URL로 전달)
```

```typescript
// Shell의 라우터가 MFE 간 전환 담당
<Route path="/order/:orderId" element={<OrderPage />} />
<Route path="/order/:orderId/payment" element={<PaymentPage />} />
```

- 가장 단순하고 명확
- 브라우저 뒤로가기, 북마크 자연스럽게 동작
- 데이터 전달은 URL 파라미터로 제한

---

### 3. Shell을 통한 Props/State 전달

```typescript
// Shell App: 공유 상태를 관리하고 각 MFE에 주입
function Shell() {
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <>
      <OrderPage user={currentUser} />      // props로 전달
      <PaymentPage userId={currentUser.id} />
    </>
  )
}
```

- Shell이 중재자 역할
- MFE가 직접 통신 안 함
- 단점: Shell이 비대해질 수 있음

---

## 공유 상태: 무엇을 공유하고 무엇을 격리하나?

```
공유해야 하는 것                격리해야 하는 것
─────────────────               ─────────────────
인증 토큰 (currentUser)         주문 폼 상태
테마 (다크/라이트 모드)          장바구니 내부 로직
언어 설정                       결제 입력 필드 상태
전역 알림 (Toast)
```

```typescript
// 공유 상태는 Shell에서 관리 or 전역 스토어 (Zustand, Redux)
// 각 MFE의 로컬 상태는 MFE 안에서만 관리
```

---

## 통신 방식 선택 기준

| 상황 | 권장 방식 |
|---|---|
| MFE 간 페이지 이동 | URL/Router |
| MFE가 사건을 알려야 할 때 | Custom Events |
| Shell이 MFE에 데이터 전달 | Props |
| 로그인 정보 등 전역 공유 | 공유 스토어 or Context |
