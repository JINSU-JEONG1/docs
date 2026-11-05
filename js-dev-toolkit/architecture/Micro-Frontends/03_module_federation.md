# Module Federation

## 개념

> **비유**: 도서관 간 상호 대출.  
> A 도서관이 B 도서관의 책을 필요할 때 빌려 쓴다.  
> B 도서관이 책을 업데이트하면, A는 다음 빌릴 때 자동으로 최신본을 받는다.  
> A는 B의 책을 자기 서가에 복사해 둘 필요가 없다.

```
빌드 타임 (기존 방식)                  런타임 (Module Federation)

[Shell]                                [Shell]
  └── 모든 MFE 코드 포함               │
  └── 하나의 큰 번들                   │ 런타임에 원격에서 로드
  → MFE 변경 시 Shell 재빌드 필요      │
                                       ▼ import('order@remoteEntry.js')
                                  [Order MFE 서버] → 최신 코드 반환
                                       ▼ import('payment@remoteEntry.js')
                                  [Payment MFE 서버] → 최신 코드 반환
```

---

## Host / Remote 구조

```
Host (Shell App)
├── remotes 설정: 어디서 무엇을 가져올지
└── 런타임에 Remote 컴포넌트를 lazy load

Remote (각 MFE)
├── exposes 설정: 무엇을 외부에 노출할지
└── 독립적으로 빌드·배포
```

### Remote 설정 (주문 팀)

```javascript
// order-app/webpack.config.js
new ModuleFederationPlugin({
  name: 'order',
  filename: 'remoteEntry.js',    // ← 이 파일이 진입점
  exposes: {
    './OrderPage': './src/pages/OrderPage',
    './OrderWidget': './src/components/OrderWidget',
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
})
```

### Host 설정 (Shell)

```javascript
// shell/webpack.config.js
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    order: 'order@https://order.myapp.com/remoteEntry.js',
    payment: 'payment@https://payment.myapp.com/remoteEntry.js',
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
})
```

### Shell에서 사용

```tsx
// Shell App
const OrderPage = React.lazy(() => import('order/OrderPage'))
const PaymentWidget = React.lazy(() => import('payment/PaymentWidget'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Route path="/order" element={<OrderPage />} />
    </Suspense>
  )
}
```

---

## shared 설정: 중복 로드 방지

```javascript
// singleton: true → React는 하나만 로드 (버전 충돌 방지)
shared: {
  react: { singleton: true, requiredVersion: '^18.0.0' },
  'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
}
```

`singleton: false`이면 각 MFE가 React를 따로 로드 → 번들 낭비 + Hook 오류.

---

## 배포 흐름

```
1. 주문 팀이 OrderPage 수정
2. 주문 MFE만 빌드 → order.myapp.com/remoteEntry.js 업데이트
3. Shell 재빌드 불필요
4. 사용자가 /order 방문 시 → 최신 remoteEntry.js 로드
```
