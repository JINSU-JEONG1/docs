# MFE 통합 방식

## 3가지 주요 통합 방식

### 1. iFrame 통합

```html
<!-- Shell App -->
<div id="order-section">
  <iframe src="https://order.myapp.com/widget" />
</div>
```

| 장점 | 단점 |
|---|---|
| 완벽한 격리 (CSS, JS 전혀 공유 안 됨) | 스크롤, 리사이즈 처리 어려움 |
| 기술 스택 완전 자유 | 부모-자식 통신 복잡 (postMessage) |
| 구현 단순 | SEO 불리 |
| | UX 일관성 유지 어려움 |

→ 레거시 시스템 점진적 통합 시 유용. 신규 서비스엔 비추.

---

### 2. Web Components 통합

```html
<!-- Shell App: 커스텀 엘리먼트처럼 사용 -->
<order-widget user-id="123"></order-widget>
<payment-widget order-id="456"></payment-widget>
```

```typescript
// 주문 팀: Web Component로 노출
class OrderWidget extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div>주문 위젯 (React로 렌더링)</div>`
    ReactDOM.render(<OrderApp />, this)
  }
}
customElements.define('order-widget', OrderWidget)
```

| 장점 | 단점 |
|---|---|
| 브라우저 표준 (프레임워크 독립) | Shadow DOM 스타일링 복잡 |
| 각 팀 내부 구현 완전 자유 | 서버사이드 렌더링 지원 제한적 |
| | 팀마다 React 등 중복 로드 위험 |

---

### 3. Module Federation (권장)

Webpack 5의 Module Federation을 사용해 **런타임에 원격 모듈을 동적 로드**.

```javascript
// Shell (Host) webpack.config.js
new ModuleFederationPlugin({
  remotes: {
    orderApp: 'order@https://order.myapp.com/remoteEntry.js',
    paymentApp: 'payment@https://payment.myapp.com/remoteEntry.js',
  }
})

// Shell에서 원격 컴포넌트 사용
const OrderPage = React.lazy(() => import('orderApp/OrderPage'))
```

| 장점 | 단점 |
|---|---|
| 런타임 독립 배포 가능 | Webpack 5 필요 |
| 공유 라이브러리 중복 로드 방지 | 설정 복잡 |
| React 등 같은 스택 간 자연스러운 통합 | 버전 충돌 관리 필요 |

→ 다음 파일 `03-module-federation.md`에서 상세 설명.

---

## 통합 방식 선택 기준

```
기존 레거시를 점진적으로 통합하는가?
  Yes → iFrame (빠른 적용)

팀별 완전히 다른 기술 스택인가?
  Yes → Web Components

같은 기술 스택(React 등) 다중 팀인가?
  Yes → Module Federation ✅ (일반적 추천)
```
