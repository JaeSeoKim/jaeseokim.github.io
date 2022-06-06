---
title: "Framer Motion의 AnimatePresence 동작 원리 분석하기!"
date: 2022-06-06
tags: ["framer-motion", "open source", "react"]
draft: false
---

# Framer Motion의 AnimatePresence 동작 원리 분석하기!

Framer Motion의 `AnimatePresence` 또는 `React Transition Group`를 사용해본 개발자라면 공통적으로 떠오르게 되는 의문점이 하나 있습니다.

> #### 어떻게 UnMount 된 Component를 유지하며 애니메이션을 동작시키는 것이지?

이 궁금증을 해결하기 위해 한번 Framer Motion의 소스코드를 뜯어보며 공부하게 되었습니다.

> #### 분석한 시점의 깃허브 코드 링크
>
> [https://github.com/framer/motion/blob/85a60580d57650777871184561fc5e88508d7519/packages/framer-motion/src/components/AnimatePresence/index.tsx](https://github.com/framer/motion/blob/85a60580d57650777871184561fc5e88508d7519/packages/framer-motion/src/components/AnimatePresence/index.tsx)

그러면서 약 2년동안 해결되지 않은 애니메이션 관련 버그와 일부 잘못된 코드에 대해서 기여할 수 있는 기회가 되었습니다.! 🤓 🥳

<details>

<summary>코드기여 내용</summary>

[Fix AnimatePresence won't unmount fastly changing content by JaeSeoKim · Pull Request #1569 · framer/motion](https://github.com/framer/motion/pull/1569)

![Image.png](https://res.craft.do/user/full/9b73b1e8-42ea-cb9a-4429-738126302e2a/doc/F15132A1-9A4D-4DE6-B39E-314A720C2D54/828B5C8E-51BF-4D37-AB02-AB0BB6A8CCCF_2/HCisdd25EULCQmVgvAPjK9MSbLAIM4x73W8fpMEYqAsz/Image.png)

[Remove unnecessary log codes by JaeSeoKim · Pull Request #1531 · framer/motion](https://github.com/framer/motion/pull/1531)

![스크린샷 2022-06-02 오후 8.08.32.png](https://res.craft.do/user/full/9b73b1e8-42ea-cb9a-4429-738126302e2a/doc/F15132A1-9A4D-4DE6-B39E-314A720C2D54/BCB95CAA-8799-478F-B72C-6C89BD58E6F2_2/Q87qCQvU84Fto6diHGiiHCydylsPA9jUA6CFYVcxt4Mz/%202022-06-02%20%208.08.32.png)

</details>

# 사전 지식 학습하기

`AnimatePresence` 를 분석하기 이전에 내부에서 사용하는 custom hook과 일부 React API에 대해 먼저 간단하게 설명하고 진행합니다.

# React 공식 API, Hook

## ReactNode

React에서 렌더링 할 수 있는 type에 대한 집합이며, 이 때 `boolean` , `null`, `undefined` 와 같은 값도 포함된 것을 확인 할 수 있습니다.

```tsx
type ReactFragment = Iterable<ReactNode>
type ReactNode =
  | ReactElement
  | string
  | number
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined
```

### ReactElement

`React.createElement` 함수를 사용시 반환하는 type으로 일반적으로는 JSX 문법을 사용시 얻게 되는 객체 입니다.

해당 객체 내부에는 `props`와 같은 정보와 함께 `key` 에 대해서 접근하여 가져올 수 있습니다.

```tsx
interface ReactElement<
  P = any,
  T extends string | JSXElementConstructor<any> =
    | string
    | JSXElementConstructor<any>
> {
  type: T
  props: P
  key: Key | null
}
```

## cloneElement()

```tsx
React.cloneElement(element, [config], [...children])
```

element 를 기준으로 하여 새로운 ReactElement를 복사하고 반환합니다.

이때

## isValidElement()

아래와 같이 `object` 를 넘기면 해당 객체가 `ReactElement` 인지 검증하는함수 입니다.

```tsx
React.isValidElement(object)
```

[React Top-Level API – React](https://reactjs.org/docs/react-api.html#isvalidelement)

## React.Children

`this.props.children` 으로 넘어온 불명확한 데이터 구조를 다루기 위한 아래와 같은 유틸리티를 포함하고 있습니다.

### React.Children.only

```tsx
React.Children.only(children)
```

`this.props.children` 으로 넘어온 객체가 단일 객체인지에 대해서 판별하는 함수입니다.

만약 `children` 이 `Fragment` 로 감싸져 있다면, 단일 객체로 취급합니다.

### React.Children.forEach

```tsx
React.Children.forEach(children, function[(thisArg)])
```

위와 같이 `children` 내부의 객체를 순환하여 `forEach` 함수와 동일한 기능을 수행합니다.

이때 `children` 이 단일 객체라면 순환하지 않습니다.

## useRef

```tsx
const refContainer = useRef(initialValue)
```

수정이 가능한 `ref` 객체를 반환하며, `.current` 객체로 초기값이 전달됩니다.

해당 객체는 컴포넌트의 전 생명주기 동안 유지됩니다.

## useLayoutEffect

`useEffect` 와 사용법이 동일하며 효과도 매우 유사하지만, `useEffect` 의 경우 화면의 paint가 끝난 이후 실행이 되지만, React에서 dom를 업데이트 후 브라우저에서 paint 하기 이전에 `useLayoutEffect` 가 동작합니다.

# Custom React Hook

## useIsomorphicLayoutEffect

```tsx
import { useEffect, useLayoutEffect } from "react"
import { isBrowser } from "./is-browser"

export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect
```

SSR 시점에는 `useLayoutEffect` 에 대해서 수행할 수 있는 작업이 없기 때문에 SSR 이후 `hydrate` 불일치 문제가 발생하므로, 해당 문제를 해결하기 위해 `isBrowser` 즉 `typeof document !== "undefined"` 인지 체크 하는 것으로 브라우저 인 경우 `useLayoutEffect` 를 SSR 시점에는 `useEffect` 사용하는 것으로 이 문제점을 해결 하는 Hook 입니다.

## useIsMounted

```tsx
import { useRef } from "react"
import { useIsomorphicLayoutEffect } from "./use-isomorphic-effect"

export function useIsMounted() {
  const isMounted = useRef(false)
  useIsomorphicLayoutEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted
}
```

useRef 객체에 마운트 시점과 언마운트 시점에 해당 상태를 기록 하며, 해당 마운트 ref 객체를 반환하는 hook 입니다.

이를 통해 리렌더링은 일어나지 않지만 `isMounted.current` 에 접근하는 것으로 마운트 되었는지에 대해서 알 수 있습니다.

## useForceUpdate

```tsx
import sync from "framesync"
import { useState, useCallback } from "react"
import { useIsMounted } from "./use-is-mounted"

export function useForceUpdate(): [VoidFunction, number] {
  const isMounted = useIsMounted()
  const [forcedRenderCount, setForcedRenderCount] = useState(0)

  const forceRender = useCallback(() => {
    isMounted.current && setForcedRenderCount(forcedRenderCount + 1)
  }, [forcedRenderCount])

  /**
   * Defer this to the end of the next animation frame in case there are multiple
   * synchronous calls.
   */
  const deferredForceRender = useCallback(
    () => sync.postRender(forceRender),
    [forceRender]
  )

  return [deferredForceRender, forcedRenderCount]
}
```

`framer motion` 내부에서 정의된 custom hook으로 `state` 를 증가시킴으로써 해당 hook를 사용하는 컴포넌트를 리렌더링을 시킵니다.

또한 `hook` 의 경우 정의 순서에 따른 sideEffect가 달라지기 때문에 정확하게 forceUpdate 하기 위해서는 최상단의 첫번째 hook으로써 정의해야 합니다.

이때 `framer motion` 은 `popmotion` 이라는 javascript animation 라이브러리를 사용하므로, `framesync` 를 통해 다음 애니메이션 프레임에 강제 렌더링 시행 시키도록 구현된 것을 볼 수 있습니다.

## useUnmountEffect

```tsx
import { useEffect } from "react"

export function useUnmountEffect(callback: () => void) {
  return useEffect(() => () => callback(), [])
}
```

의존성 배열이 비어있는 `useEffect` cleanUp 동작에 정의 하는 것으로 언마운트 시점에 동작할 함수를 정의 할 수 있습니다.

해당 컴포넌트가 unmount 되는 시점에 정확하게 동작시키기 위해서는 hook 정의 순서대로 동작한다는 특성을 고려하여 맨마지막의 hook으로써 정의 해야 합니다.

# AnimatePresence 코드 분석하기!

```tsx
// We want to force a re-render once all exiting animations have finished. We
// either use a local forceRender function, or one from a parent context if it exists.
let [forceRender] = useForceUpdate()
const forceRenderLayoutGroup = useContext(LayoutGroupContext).forceRender
if (forceRenderLayoutGroup) forceRender = forceRenderLayoutGroup
```

[packages/framer-motion/src/components/AnimatePresence/index.tsx#L86-L90](https://github.com/framer/motion/blob/85a60580d57650777871184561fc5e88508d7519/packages/framer-motion/src/components/AnimatePresence/index.tsx#L86-L90)

코드를 보게 되면 첫 hook으로 `useForceUpdate()` 사용하지만 주석과 함께 이후의 코드를 확인하면, 모든 애니메이션이 끝난 이후에 리 렌더링이 일어나야 하므로, `context` 를 통해 이전에 정의된 forceRender가 있는지 확인하여 있다면 부모의 forceRender를 사용하는 것을 볼 수 있습니다.

```tsx
const isMounted = useIsMounted()

// Filter out any children that aren't ReactElements. We can only track ReactElements with a props.key
const filteredChildren = onlyElements(children)
let childrenToRender = filteredChildren
```

[packages/framer-motion/src/components/AnimatePresence/index.tsx#L92-L96](https://github.com/framer/motion/blob/85a60580d57650777871184561fc5e88508d7519/packages/framer-motion/src/components/AnimatePresence/index.tsx#L92-L96)

그 다음에는 children에서 `React.Children` 와 `isValidElement` 함수를 이용하여 Element만 추출 하는 것을 볼 수 있습니다.

이후 렌더링 해야 하는 대상을 저장하는 변수는 `childrenToRender` 에 저장합니다.

```tsx
const exiting = new Set<ComponentKey>()

// Keep a living record of the children we're actually rendering so we
// can diff to figure out which are entering and exiting
const presentChildren = useRef(childrenToRender)

// A lookup table to quickly reference components by key
const allChildren = useRef(new Map<ComponentKey, ReactElement<any>>()).current

// If this is the initial component render, just deal with logic surrounding whether
// we play onMount animations or not.
const isInitialRender = useRef(true)
```

[packages/framer-motion/src/components/AnimatePresence/index.tsx#L98-L111](https://github.com/framer/motion/blob/85a60580d57650777871184561fc5e88508d7519/packages/framer-motion/src/components/AnimatePresence/index.tsx#L98-L111)

존재 여부에 대해서 사용하는 `exiting` 초기화 하고 `useRef` 를 이용하여 라이프 사이클에서 지속적으로 유지될 이전에 넘어온 Children를 저장하는 `presentChildren` 를 만듭니다.

> 이 때 한가지의 오류를 발견할 수 있는데 바로 `exiting` 객체는 `useRef` 로 감싸져 있지 않다는 문제점 입니다.
> 이 때 문에 라이프사이클 전반에 이루어 매번 초기화 작업이 이루어 지기 때문에 이후에 이야기 하는 특정 작업에서 버그가 발생하게 됩니다.

[Fix AnimatePresence won't unmount fastly changing content by JaeSeoKim · Pull Request #1569 · framer/motion](https://github.com/framer/motion/pull/1569)

또한 ComponentKey 와 ReactElement를 key value 쌍으로 묶어 전 라이프 사이클에서 걸쳐 기록 할 수 있는 ref를 만듭니다.

```tsx
useIsomorphicLayoutEffect(() => {
  isInitialRender.current = false

  updateChildLookup(filteredChildren, allChildren)
  presentChildren.current = childrenToRender
})
```

[packages/framer-motion/src/components/AnimatePresence/index.tsx#L113-L118](https://github.com/framer/motion/blob/85a60580d57650777871184561fc5e88508d7519/packages/framer-motion/src/components/AnimatePresence/index.tsx#L113-L118)

의존성에 대해서 정의 하지 않는 것으로 리렌더링 될 때 마다 동작하게 되는 `effect` 를 정의 합니다.

이 때 `presentChildren` 에 현재 props로 넘어온 children에서 추출한 ReactElement를 넣는 것을 볼 수 있습니다.

```tsx
type ComponentKey = string | number

const getChildKey = (child: ReactElement<any>): ComponentKey => child.key || ""

function updateChildLookup(
  children: ReactElement<any>[],
  allChildren: Map<ComponentKey, ReactElement<any>>
) {
  children.forEach((child) => {
    const key = getChildKey(child)
    allChildren.set(key, child)
  })
}
```

[packages/framer-motion/src/components/AnimatePresence/index.tsx#L20-L32](https://github.com/framer/motion/blob/85a60580d57650777871184561fc5e88508d7519/packages/framer-motion/src/components/AnimatePresence/index.tsx#L20-L32)

위와 같이 `updateChildLookup` 함수를 통해 `allChildren` 이라는 `Map` 자료형에 `Componentkey` 를 이용하여 `child` 를 저장 하는 것을 볼 수 있습니다.

![Image.png](https://res.craft.do/user/full/9b73b1e8-42ea-cb9a-4429-738126302e2a/doc/F15132A1-9A4D-4DE6-B39E-314A720C2D54/C89AD05F-B18A-4DF4-BA33-A4E7695674B9_2/Ng7Fizy1TfJlCyopirWE2cfmL2qHNSqk2RjBl4mjX7Qz/Image.png)

이와 같이 `Component` 의 `key` 를 이용하여 이전 컴포넌트를 기억하고 이를 통해 애니메이션을 구현한 다는 것을 알 수 있습니다.

```tsx
useUnmountEffect(() => {
  isInitialRender.current = true
  allChildren.clear()
  exiting.clear()
})
```

[packages/framer-motion/src/components/AnimatePresence/index.tsx#L120-L124](https://github.com/framer/motion/blob/85a60580d57650777871184561fc5e88508d7519/packages/framer-motion/src/components/AnimatePresence/index.tsx#L120-L124)

최종적으로 `unmount` 될 때에 `useRef` 를 통해 저장한 값을 모두 초기 상태로 돌리는 것을 볼 수 있습니다.

```tsx
if (isInitialRender.current) {
  return (
    <>
      {childrenToRender.map((child) => (
        <PresenceChild
          key={getChildKey(child)}
          isPresent
          initial={initial ? undefined : false}
          presenceAffectsLayout={presenceAffectsLayout}
        >
          {child}
        </PresenceChild>
      ))}
    </>
  )
}
```

[packages/framer-motion/src/components/AnimatePresence/index.tsx#L126-L141](https://github.com/framer/motion/blob/85a60580d57650777871184561fc5e88508d7519/packages/framer-motion/src/components/AnimatePresence/index.tsx#L126-L141)

이제 실제 렌더링 하는 부분 입니다. 만약 최초 렌더링 이라면, 만들어둔 `childrenToRender` 에 있는 `ReactElement` 를 꺼내 하나씩 애니메이션 구현을 위한 `PresenceChild` 컴포넌트를 감싸서 렌더링을 합니다.

```tsx
// If this is a subsequent render, deal with entering and exiting children
childrenToRender = [...childrenToRender]

// Diff the keys of the currently-present and target children to update our
// exiting list.
const presentKeys = presentChildren.current.map(getChildKey)
const targetKeys = filteredChildren.map(getChildKey)

// Diff the present children with our target children and mark those that are exiting
const numPresent = presentKeys.length
for (let i = 0; i < numPresent; i++) {
  const key = presentKeys[i]

  if (targetKeys.indexOf(key) === -1) {
    exiting.add(key)
  }
}

// If we currently have exiting children, and we're deferring rendering incoming children
// until after all current children have exiting, empty the childrenToRender array
if (exitBeforeEnter && exiting.size) {
  childrenToRender = []
}
```

[packages/framer-motion/src/components/AnimatePresence/index.tsx#L143-L165](https://github.com/framer/motion/blob/85a60580d57650777871184561fc5e88508d7519/packages/framer-motion/src/components/AnimatePresence/index.tsx#L143-L165)

이후 최초 렌더링이 아니라면 이제 해당 로직들이 실행 됩니다.

> 첫번 째 줄인 `childrenToRender` 에 다시 spread 문법을 통해서 재할당 하는 모습을 볼 수 있는데, 이 코드에 대한 히스토리를 살펴본 결과 리팩토링 과정에서 실수 한 것을 보여 해당 라인에 대해서 제거하는 PR를 생성하였습니다.

`presentChildren` 과 props로 넘어온 `children` 의 key를 추출하여 `presentChildren` 에 존재하였던 `key` 가 현재 `Children` 에 없다면 `exiting` 중인 상태로 정의 합니다.

`exitBeforeEnter` 옵션이 켜져있다면, `exiting` 이 전부 끝난 이후 렌더링을 할 수 있돌고 `childrenToRender` 를 비워줍니다.

```tsx
// Loop through all currently exiting components and clone them to overwrite `animate`
// with any `exit` prop they might have defined.
exiting.forEach((key) => {
  // If this component is actually entering again, early return
  if (targetKeys.indexOf(key) !== -1) return

  const child = allChildren.get(key)
  if (!child) return

  const insertionIndex = presentKeys.indexOf(key)

  const onExit = () => {
    allChildren.delete(key)
    exiting.delete(key)

    // Remove this child from the present children
    const removeIndex = presentChildren.current.findIndex(
      (presentChild) => presentChild.key === key
    )
    presentChildren.current.splice(removeIndex, 1)

    // Defer re-rendering until all exiting children have indeed left
    if (!exiting.size) {
      presentChildren.current = filteredChildren

      if (isMounted.current === false) return

      forceRender()
      onExitComplete && onExitComplete()
    }
  }

  childrenToRender.splice(
    insertionIndex,
    0,
    <PresenceChild
      key={getChildKey(child)}
      isPresent={false}
      onExitComplete={onExit}
      custom={custom}
      presenceAffectsLayout={presenceAffectsLayout}
    >
      {child}
    </PresenceChild>
  )
})
```

[packages/framer-motion/src/components/AnimatePresence/index.tsx#L167-L212](https://github.com/framer/motion/blob/85a60580d57650777871184561fc5e88508d7519/packages/framer-motion/src/components/AnimatePresence/index.tsx#L167-L212)

`exiting` 에 정의된 `key` 를 순환하면서 `childrenToRender` 에 이전에 위치하던 곳에 추가합니다.

이때 `onExit` 에 해당하는 이벤트를 추가하는데, exit 애니메이션 종료이후 `exiting`, `allChildren` `presentChildren` 에서 모두 제거 하여 추후 다시 마운트후 제거시 애니메이션이 동작 할 수 있도록 합니다.

또한 `exit` 애니메이션이 종료후 바로 렌더링 하는 것이 아닌 모든 `exiting` 객체가 종료 이후 렌더링을 연기합니다.

> 하지만 여기서 기존코드는 `const exiting = new Set<ComponentKey>()` 으로 매번 초기화 되기 때문에 연속적으로 빠르게 exiting이 발생시 서로 다른 exiting 객체를 가리키고 있어서 `re-rendering` 이 발생하지 않는 이슈가 있습니다.
>
> 해당 이슈는 `const exiting = useRef(new Set()).current` 로 감싸 모두 동일한 객체를 바라 볼 수 있도록 함으로 해결하였습니다.

[Fix AnimatePresence won't unmount fastly changing content by JaeSeoKim · Pull Request #1569 · framer/motion](https://github.com/framer/motion/pull/1569)

```tsx
// Add `MotionContext` even to children that don't need it to ensure we're rendering
// the same tree between renders
childrenToRender = childrenToRender.map((child) => {
  const key = child.key as string | number
  return exiting.has(key) ? (
    child
  ) : (
    <PresenceChild
      key={getChildKey(child)}
      isPresent
      presenceAffectsLayout={presenceAffectsLayout}
    >
      {child}
    </PresenceChild>
  )
})
```

[packages/framer-motion/src/components/AnimatePresence/index.tsx#L214-L229](https://github.com/framer/motion/blob/85a60580d57650777871184561fc5e88508d7519/packages/framer-motion/src/components/AnimatePresence/index.tsx#L214-L229)

`childrenToRender` 를 순회 하면서 `exiting` 객체에 속하지 않는 최초 렌더링 child의 경우 `MotionContext` 를 포함해야 하므로, 해당 내용을 주입합니다.

```tsx
if (env !== "production" && exitBeforeEnter && childrenToRender.length > 1) {
  console.warn(
    `You're attempting to animate multiple children within AnimatePresence, but its exitBeforeEnter prop is set to true. This will lead to odd visual behaviour.`
  )
}

return (
  <>
    {exiting.size
      ? childrenToRender
      : childrenToRender.map((child) => cloneElement(child))}
  </>
)
```

[packages/framer-motion/src/components/AnimatePresence/index.tsx#L231-L247](https://github.com/framer/motion/blob/85a60580d57650777871184561fc5e88508d7519/packages/framer-motion/src/components/AnimatePresence/index.tsx#L231-L247)

`exitBeforeEnter` 사용시에 대한 비쥬얼 경고 코드가 있고, 이제 마지막으로 `childrenToRender` 를 화면에 렌더링 할 수 있도록 반환합니다.

이제 `PresenceChild` 컴포넌트에서는 넘어온 데이터를 바탕으로 애니메이션을 동작시킨 이후, `exit` 애니메이션을 동작해야 한다면, 해당 애니메이션을 동작후 props로 넘어온 `onExitComplete` 를 호출 시켜, `AnimatePresence` 에서 해당 정보를 알 수 있습니다.

# 분석하면서…

`framer-motion` 를 사용해보고 흥미가 생겨서 분석을 해보게 되었는데, 다양하게 활용하는 방법에 대해서 깊게 공부 할 수 있는 기회가 되었고, 또 코드를 읽으면서 의문점이 생긴 부분을 통해 코드 기여까지 갈 수 있다는게 좋았습니다.

제가 분석한 글이 도움이 안될수 있지만, 다른 분들도 꼭 오픈소스를 분석하면서 공부와 함께 코드기여를 해볼수 있다는 것을 알 수 있으면 좋겠습니다.
