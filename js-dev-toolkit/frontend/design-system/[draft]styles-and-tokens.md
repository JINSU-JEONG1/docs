# 스타일과 디자인 토큰

| 항목 | 내용 |
|---|---|
| 버전 | v0.1 |
| 상태 | 초안 |
| 수정일 | 2026-11-21 |
| 작성자 | Codex |

## 목차

- [스타일은 화면의 공통 규칙입니다](#스타일은-화면의-공통-규칙입니다)
- [디자인 토큰은 값에 붙인 이름입니다](#디자인-토큰은-값에-붙인-이름입니다)
- [토큰 없이 쓸 때와 비교하기](#토큰-없이-쓸-때와-비교하기)
- [토큰을 어떻게 나누는가](#토큰을-어떻게-나누는가)
- [React 화면에서 CSS 토큰 사용하기](#react-화면에서-css-토큰-사용하기)
- [보통 어떤 방식으로 적용하는가](#보통-어떤-방식으로-적용하는가)
- [참고 자료](#참고-자료)

## 스타일은 화면의 공통 규칙입니다

스타일은 화면 요소가 어떻게 보이고 반응할지 정하는 규칙입니다. 색상, 글자 크기, 간격, 테두리, 그림자뿐 아니라 버튼의 포커스나 비활성 상태도 스타일에 포함됩니다.

여러 화면에서 규칙을 매번 따로 정하면 같은 역할의 버튼도 색이나 높이가 달라질 수 있습니다. 디자인 시스템은 자주 쓰는 규칙을 합의해 여러 화면이 함께 쓰도록 합니다. Material Design, Carbon, Fluent와 GOV.UK도 시각 스타일과 컴포넌트 지침을 공개합니다.

## 디자인 토큰은 값에 붙인 이름입니다

디자인 토큰은 반복해서 쓰는 디자인 값에 의미 있는 이름을 붙여 관리하는 방법입니다. 예를 들어 `#4f46e5`를 화면마다 직접 쓰지 않고 `color-primary`라는 이름으로 정하면, 그 값이 주요 색상이라는 의미가 드러납니다.

```text
이름: color-primary
값:   #4f46e5
뜻:   제품에서 주요 동작을 강조하는 색
```

토큰은 색상만을 뜻하지 않습니다. 간격, 글꼴 크기, 테두리 둥글기, 그림자처럼 여러 화면에서 공유할 값에도 이름을 붙일 수 있습니다.

## 토큰 없이 쓸 때와 비교하기

토큰이 없으면 값이 여러 곳에 반복됩니다.

```css
.primaryButton {
  background: #4f46e5;
}

.activeLink {
  color: #4f46e5;
}
```

토큰을 사용하면 같은 의미의 값을 한 곳에서 정의하고 여러 UI가 가져다 씁니다.

```css
:root {
  --color-primary: #4f46e5;
}

.primaryButton {
  background: var(--color-primary);
}

.activeLink {
  color: var(--color-primary);
}
```

이제 주요 색상을 바꾸려면 토큰 값을 수정하면 됩니다. 토큰을 바꾼다고 모든 화면이 자동으로 좋아지는 것은 아니므로, 그 색이 실제로 같은 의미와 용도로 쓰이는지 먼저 확인해야 합니다.

## 토큰을 어떻게 나누는가

처음에는 두 수준으로 이해하면 충분합니다.

| 수준 | 예 | 설명 |
|---|---|---|
| 기본 값 | `purple-600`, `space-4` | 색상 팔레트나 간격 눈금처럼 원본 값을 보관합니다. |
| 의미 값 | `color-primary`, `space-control-horizontal` | 값이 어떤 역할에 쓰이는지 표현합니다. |

예를 들어 `purple-600`은 보라색 팔레트의 한 값이고, `color-primary`는 주요 동작에 사용할 색이라는 의미입니다. 현재는 두 이름이 같은 실제 색을 가리킬 수 있습니다. 나중에 브랜드 색이 바뀌면 `color-primary`가 다른 팔레트 값으로 연결되어도 버튼 코드의 의미는 유지됩니다.

이름을 지나치게 많이 만들 필요는 없습니다. 먼저 반복해서 쓰는 색과 간격을 찾고, 같은 역할을 하는 값에만 토큰을 정의합니다.

## React 화면에서 CSS 토큰 사용하기

토큰은 React 전용 기능이 아닙니다. CSS에서 정의한 사용자 정의 속성(CSS 변수)을 React가 렌더링하는 요소의 스타일에서도 사용할 수 있습니다.

```css
:root {
  --color-primary: #4f46e5;
  --color-on-primary: #ffffff;
  --space-control-horizontal: 16px;
  --space-control-vertical: 8px;
  --radius-control: 6px;
  --border-width-control: 1px;
}
```

```jsx
export function Button({ children }) {
  return <button className="button">{children}</button>;
}
```

```css
.button {
  color: var(--color-on-primary);
  background-color: var(--color-primary);
  padding-inline: var(--space-control-horizontal);
  border-radius: var(--radius-control);
}
```

React는 버튼의 구조를 만들고, CSS는 토큰 값을 이용해 모양을 정합니다. 디자인 토큰은 값과 의미를 공유하는 약속이고, CSS 변수는 웹 코드에서 그 값을 연결하는 한 가지 구현 방식입니다.

## 보통 어떤 방식으로 적용하는가

웹에서 디자인 토큰을 쓰는 데 특정 라이브러리가 필수인 것은 아닙니다. CSS 사용자 정의 속성(`--color-primary` 등)을 값의 연결 수단으로 쓰면 브라우저의 CSS 기능만으로 여러 스타일에서 값을 공유할 수 있습니다. React도 CSS를 적용하는 특정 방식을 정하지 않습니다. [React 공식 문서](https://react.dev/reference/react-dom/components/common)는 `className`으로 CSS 클래스를 연결하는 예를 보여줍니다.

React 프로젝트에서는 CSS 파일을 컴포넌트에 연결하는 CSS Modules, 유틸리티 클래스를 조합하는 Tailwind CSS, JavaScript 코드에서 스타일을 작성하는 CSS-in-JS 도구 등 여러 방식을 볼 수 있습니다. 이들은 스타일을 코드에 적용하는 선택지이며, 토큰이 무엇인지 또는 디자인 시스템을 어떻게 설계할지 정해주지는 않습니다.

처음 개념을 익힐 때는 CSS 변수 예시만 보면 충분합니다. 팀이 여러 플랫폼이나 디자인 도구 사이에서 토큰 데이터를 교환한다면 [Design Tokens Community Group(DTCG) 형식](https://www.designtokens.org/tr/2025.10/)을 참고할 수 있습니다. 이 문서는 토큰 데이터 교환 형식의 명세이며, W3C 웹 표준 자체나 React 스타일 라이브러리는 아닙니다. [DTCG 명세 상태](https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/)
## 참고 자료

- [Material Design 3](https://m3.material.io/): 색상·타이포그래피·형태와 토큰 체계를 살펴봅니다.
- [IBM Carbon Design System](https://carbondesignsystem.com/): 제품 전반에 토큰과 컴포넌트를 적용하는 사례를 살펴봅니다.
- [Microsoft Fluent 2](https://fluent2.microsoft.design/): 여러 플랫폼에서 공유하는 디자인 원칙과 스타일을 살펴봅니다.
- [한국형 웹 콘텐츠 접근성 지침·KRDS](https://www.krds.go.kr/): 국내 디지털 서비스의 디자인 기준과 토큰 이름 체계를 참고합니다.
- [NAVER D2: 데이터 기반으로 지속 성장이 가능한 네이버 검색 FE 시스템 구축하기](https://d2.naver.com/helloworld/3435419): 네이버 검색 서비스의 디자인 시스템 운영 사례입니다.
- [카카오 로그인 디자인 가이드](https://developers.kakao.com/docs/ko/kakaologin/design-guide): 브랜드 버튼의 색상, 구성과 사용 규칙을 확인합니다.

