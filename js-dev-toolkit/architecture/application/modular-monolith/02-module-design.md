# 모듈 설계 원칙

## 모듈이란?

> 하나의 비즈니스 도메인을 담당하는 코드 단위.  
> 외부에 공개할 것(Public API)과 내부에 숨길 것(Internal)을 명확히 구분한다.

```
[주문 모듈]
  ├── Public (외부에서 접근 가능)
  │     ├── OrderService.interface.ts   ← 다른 모듈은 이것만 안다
  │     └── OrderDTO.ts
  │
  └── Internal (외부 접근 금지)
        ├── order.entity.ts
        ├── order.repository.ts
        └── order-discount.service.ts   ← 주문 모듈 내부 로직
```

---

## 폴더 구조 예시

```
src/
├── modules/
│   ├── order/
│   │   ├── index.ts          ← Public API만 export
│   │   ├── order.service.ts
│   │   ├── order.entity.ts
│   │   └── order.repo.ts
│   │
│   ├── payment/
│   │   ├── index.ts
│   │   └── ...
│   │
│   └── user/
│       ├── index.ts
│       └── ...
│
└── shared/                   ← 모듈 간 공유 (최소화)
    ├── types/
    └── utils/
```

`index.ts`가 **방문(인터페이스)**이다. 외부 모듈은 이 파일만 import한다.

---

## 좋은 모듈 경계 찾기

### 기준 1: 같이 변경되는 코드

> "주문이 바뀌면 뭐가 같이 바뀌는가?"  
> → 같이 바뀌는 것들은 같은 모듈 안에.

### 기준 2: 같은 비즈니스 용어

```
"고객(Customer)"이 컨텍스트마다 다른 의미
├── 주문 모듈 → 배송지가 있는 주문자
├── 결제 모듈 → 카드 정보가 있는 납부자
└── 마케팅 모듈 → 구매 이력이 있는 타겟
```

→ 같은 단어가 다른 의미면 → 별도 모듈

### 기준 3: 팀 소유권

```
주문팀 → order/, cart/ 모듈 소유
결제팀 → payment/, billing/ 모듈 소유
```

---

## 나쁜 모듈 설계 패턴

### 기술 계층 기준으로 나누기

```
❌ 기술 기준 분리
src/
├── controllers/   ← 모든 도메인의 컨트롤러
├── services/      ← 모든 도메인의 서비스
└── repositories/  ← 모든 도메인의 레포지토리

✅ 도메인 기준 분리
src/
├── order/
│   ├── controller, service, repository
├── payment/
│   ├── controller, service, repository
```

기술 기준으로 나누면 "주문 기능 하나" 수정하려면 3개 폴더를 다 열어야 한다.

### 모듈 경계 뚫기

```
❌ 내부 파일 직접 접근
import { OrderDiscountService } from '../order/order-discount.service'
                                              ↑ Internal 파일 직접 import

✅ Public API만 사용
import { OrderService } from '../order'
                                ↑ index.ts의 공개 인터페이스만
```
