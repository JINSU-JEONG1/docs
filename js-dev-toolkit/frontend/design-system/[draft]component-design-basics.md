# 공통 UI 컴포넌트 설계: 버튼 예시

| 항목 | 내용 |
|---|---|
| 버전 | v0.1 |
| 상태 | 초안 |
| 수정일 | 2026-11-21 |
| 작성자 | Codex |

## 목차

- [이 문서에서 말하는 컴포넌트](#이-문서에서-말하는-컴포넌트)
- [컴포넌트 규칙을 정하는 순서](#컴포넌트-규칙을-정하는-순서)
- [버튼 규칙 예시](#버튼-규칙-예시)
- [React 스타일 구현 방식](#react-스타일-구현-방식)
- [Vue 구현 예시](#vue-구현-예시)
- [다음에 살펴볼 작은 컴포넌트](#다음에-살펴볼-작은-컴포넌트)
- [참고 자료](#참고-자료)

## 이 문서에서 말하는 컴포넌트

여기서는 여러 화면에서 공통으로 쓰는 UI 요소와 그 사용 규칙을 컴포넌트라고 부릅니다. 버튼의 색이나 간격은 앞 문서에서 설명한 디자인 토큰을 사용하고, 이 문서에서는 버튼이 어떤 행동을 뜻하며 어떤 상태와 사용 규칙을 가져야 하는지 다룹니다.

컴포넌트 설계는 React나 Vue의 코드 구조를 정하는 일과 구분됩니다. 먼저 화면 기술과 관계없이 사용자에게 보여야 할 규칙을 정한 뒤, React·Vue 코드로 각 프레임워크에서 구현하는 예를 볼 수 있습니다.

## 컴포넌트 규칙을 정하는 순서

1. **목적과 사용 시점:** 어떤 사용자 행동이나 정보를 지원하는지 적습니다.
2. **구성:** 텍스트, 아이콘, 입력 영역 등 무엇으로 이루어지는지 정합니다.
3. **변형:** 역할이 달라 실제 사용이 달라지는 경우에만 종류나 크기 선택을 둡니다.
4. **상태와 동작:** 기본, 포커스, 비활성, 로딩, 오류 상태에서 무엇이 보이고 어떻게 동작하는지 정합니다.
5. **접근성:** 키보드 조작, 이름, 레이블, 상태 전달을 확인합니다.
6. **사용 지침:** 적절한 사용 사례와 피해야 할 사용 사례를 예로 듭니다.

## 버튼 규칙 예시

버튼은 사용자가 현재 화면에서 어떤 동작을 실행할 때 사용합니다. 라벨은 “확인”처럼 모호하게 두기보다 “저장”, “다음 단계로 이동”처럼 동작을 설명합니다. GOV.UK의 버튼 안내도 버튼이 수행하는 행동을 분명하게 적도록 설명합니다.

| 항목 | 규칙 예시 |
|---|---|
| 목적 | 저장, 제출, 이동처럼 화면에서 실행할 동작을 시작합니다. |
| 변형 | 주요 동작용 `primary`, 덜 강조할 동작용 `secondary`를 둡니다. |
| 상태 | 기본, 키보드 포커스, 눌림, 비활성, 처리 중 상태를 구분합니다. |
| 접근성 | 실제 `<button>` 요소를 사용하고, 버튼 이름을 분명히 하며, 비활성은 네이티브 `disabled`로 전달합니다. |
| 사용 기준 | 화면에서 가장 중요한 동작은 강조하고, 같은 수준의 강조 버튼을 과도하게 늘리지 않습니다. |

여기서 색상, 간격, 모서리, 테두리 값은 앞 문서에서 정의한 디자인 토큰을 사용합니다. 아래 React 예시는 같은 버튼 규칙을 네 가지 스타일 방식으로 표현합니다. CSS 기반 방식은 `var(--토큰이름)`으로, StyleX는 `defineVars`로 토큰을 참조합니다.

## React 스타일 구현 방식

### StyleX

StyleX는 Meta가 공개한 스타일 시스템입니다. 테마에 따라 바뀌는 토큰은 `defineVars`로 선언하고, 스타일 객체에서 참조합니다. 변수 선언 파일은 `.stylex.ts`로 분리합니다. [Meta StyleX 변수 작성 가이드](https://github.com/facebook/stylex/blob/main/packages/docs/static/llm/stylex-authoring.md)

```tsx
// tokens.stylex.ts
import * as stylex from '@stylexjs/stylex';

export const tokens = stylex.defineVars({
  colorPrimary: '#4f46e5',
  colorOnPrimary: '#ffffff',
  spaceControlHorizontal: '16px',
  spaceControlVertical: '8px',
  radiusControl: '6px',
  borderWidthControl: '1px',
});
```

```tsx
// Button.tsx
import * as stylex from '@stylexjs/stylex';
import { tokens } from './tokens.stylex';

const styles = stylex.create({
  base: {
    paddingBlock: tokens.spaceControlVertical,
    paddingInline: tokens.spaceControlHorizontal,
    borderRadius: tokens.radiusControl,
    borderWidth: tokens.borderWidthControl,
    borderStyle: 'solid',
  },
  primary: {
    color: tokens.colorOnPrimary,
    backgroundColor: tokens.colorPrimary,
    borderColor: tokens.colorPrimary,
  },
  secondary: {
    color: tokens.colorPrimary,
    backgroundColor: 'transparent',
    borderColor: tokens.colorPrimary,
  },
});

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary';
};

function Button({ variant = 'primary', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      {...stylex.props(styles.base, variant === 'primary' ? styles.primary : styles.secondary)}
      {...props}
      type={type}
    />
  );
}
```

### styled-components

styled-components는 대표적인 CSS-in-JS 라이브러리입니다. CSS처럼 작성한 스타일을 컴포넌트로 만들고, props에 따라 스타일을 선택할 수 있습니다. [styled-components 문서](https://styled-components.com/docs/basics#coming-from-css)

```tsx
import styled from 'styled-components';

const StyledButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  padding: var(--space-control-vertical) var(--space-control-horizontal);
  border: var(--border-width-control) solid var(--color-primary);
  border-radius: var(--radius-control);
  color: ${({ $variant }) => ($variant === 'primary' ? 'var(--color-on-primary)' : 'var(--color-primary)')};
  background: ${({ $variant }) => ($variant === 'primary' ? 'var(--color-primary)' : 'transparent')};
`;

type ButtonProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> & {
  variant?: 'primary' | 'secondary';
};

function Button({ variant = 'primary', type = 'button', ...props }: ButtonProps) {
  return <StyledButton $variant={variant} type={type} {...props} />;
}
```

### Emotion

Emotion도 CSS-in-JS 라이브러리입니다. `css` prop에 스타일을 작성하며, variant별 스타일을 객체로 분리해 조합할 수 있습니다. styled-components와 같은 범주지만 API와 빌드·설정 방식은 다릅니다. [Emotion 문서](https://emotion.sh/docs/introduction)

```tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const base = css({
  padding: 'var(--space-control-vertical) var(--space-control-horizontal)',
  borderWidth: 'var(--border-width-control)',
  borderStyle: 'solid',
  borderColor: 'var(--color-primary)',
  borderRadius: 'var(--radius-control)',
});
const variants = {
  primary: css({ color: 'var(--color-on-primary)', backgroundColor: 'var(--color-primary)' }),
  secondary: css({ color: 'var(--color-primary)', backgroundColor: 'transparent' }),
};

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  variant?: keyof typeof variants;
};

function Button({ variant = 'primary', type = 'button', ...props }: ButtonProps) {
  return <button css={[base, variants[variant]]} type={type} {...props} />;
}
```

### CSS Modules

CSS Modules는 CSS 파일의 클래스 이름을 컴포넌트 단위로 관리하는 방식입니다. 스타일이 별도 파일에 있어 CSS와 React 로직을 분리하기 쉽습니다.

```tsx
import styles from './Button.module.css';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary';
};

function Button({ variant = 'primary', type = 'button', ...props }: ButtonProps) {
  return <button className={`${styles.base} ${styles[variant]}`} type={type} {...props} />;
}
```

```css
/* Button.module.css */
.base {
  padding: var(--space-control-vertical) var(--space-control-horizontal);
  border: var(--border-width-control) solid var(--color-primary);
  border-radius: var(--radius-control);
}
.primary { color: var(--color-on-primary); background: var(--color-primary); }
.secondary { color: var(--color-primary); background: transparent; }
```

**이 예시들은 모두 같은 의미 토큰을 사용하지만, 토큰을 코드에 연결하는 방법은 도구마다 다릅니다.** StyleX는 `defineVars`, 나머지 세 방식은 CSS 사용자 정의 속성을 참조합니다. 실제 앱에서는 토큰 정의를 한 곳에서 관리하고 테마별 값을 연결합니다. React는 특정 스타일 방식을 정하지 않으며, 표준 버튼 속성은 각 구현에서 전달할 수 있습니다. [React props 안내](https://react.dev/learn/passing-props-to-a-component)

## Vue 구현 예시

```vue
<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary';

defineProps<{
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}>();
</script>

<template>
  <button
    :class="['button', `button--${variant ?? 'primary'}`]"
    :type="type ?? 'button'"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
```

Vue에서도 `ButtonVariant`로 허용할 변형을 제한하고, 버튼의 기본 HTML 속성인 `type`과 `disabled`를 그대로 전달합니다. `defineProps`는 속성 계약을 선언하고 `<slot />`은 부모가 전달한 버튼 내용을 표시합니다. 클릭 이벤트와 추가 접근성 속성은 루트 `<button>`에 전달할 수 있습니다. [Vue props 안내](https://vuejs.org/guide/components/props.html)

React와 Vue 예시가 보여주는 공통점은 색이나 크기 값보다 **버튼의 역할·변형·상태와 네이티브 동작**이 컴포넌트의 규칙이라는 점입니다. 실제 서비스에서는 `variant` 값을 무제한으로 늘리지 말고, 팀이 합의한 역할만 제공해야 합니다.

## 다음에 살펴볼 작은 컴포넌트

“아토믹 컴포넌트”는 Atomic Design에서 가장 작은 단위의 UI를 가리키지만, 팀마다 경계와 이름을 다르게 쓸 수 있습니다. 여기서는 이를 엄격한 표준 분류라기보다 버튼처럼 다른 UI의 기초가 되는 작은 컴포넌트라는 뜻으로 사용합니다.

| 먼저 볼 컴포넌트 | 배우기 좋은 이유 |
|---|---|
| 텍스트 입력창 | 레이블, 힌트, 오류, 필수 여부가 연결되는 방식을 익힙니다. |
| 체크박스 | 독립 선택과 선택 상태 전달을 익힙니다. |
| 라디오 버튼 | 한 그룹에서 하나만 선택되는 구조와 그룹 레이블을 익힙니다. |
| 배지 또는 상태 표시 | 색상만으로 뜻을 전달하지 않고 텍스트와 의미를 함께 표현하는 방법을 익힙니다. |
| 아이콘 버튼 | 아이콘만 보이는 버튼에 접근 가능한 이름을 제공하는 방법을 익힙니다. |

그다음에는 입력창과 레이블·힌트·오류 문구를 묶은 필드처럼 여러 작은 컴포넌트를 조합한 구성요소를 살펴보면 좋습니다. GOV.UK 컴포넌트 목록에도 버튼, 텍스트 입력, 체크박스, 라디오 등이 독립 항목으로 정리되어 있습니다. [GOV.UK Components](https://design-system.service.gov.uk/components/)

## 참고 자료

- [GOV.UK Button](https://design-system.service.gov.uk/components/button/): 버튼을 언제 쓰고 라벨을 어떻게 작성할지 참고합니다.
- [GOV.UK Text input](https://design-system.service.gov.uk/components/text-input/): 레이블과 입력창을 함께 설계하는 기준을 참고합니다.
- [React: Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component): React 컴포넌트의 props 전달 방식을 설명합니다.
- [Vue: Props](https://vuejs.org/guide/components/props.html): Vue 컴포넌트의 props 선언과 전달을 설명합니다.

