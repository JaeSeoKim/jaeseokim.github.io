---
title: "[TypeScript] Basic Types"
date: 2020-09-01 19:40
tags: ["TypeScript"]
draft: true
---

TypeScript는 다양한 타입을 가지고 있기 때문에 타입에 대해서 정리를 해보았다.

## any

any 타입은 어떤 타입이 와도 전부 허용을 한다는 타입이다. 하지만 이 타입을 사용할 때에는 주의를 기울어서 사용을 해야 한다.

만약 any타입을 남발해서 사용을 하게 된다면 TypeChecker가 동작하지 않게 되고 기존 JavaScript와 다른 점이 없어지게 되므로 TypeScript에서 오는 장점이 사라지니 이것을 남발해서는 안된다.

```ts
let a: any = "test"
a = false
a = 42

let b: any[] = [a, "test", 42, true]
```

위와 같이 컴파일 시간에서 확실하게 알수 없거나 동적으로 변하는 상황에서 사용할 수 있다.

## unknown

unknown은 말 그대로 타입에 대해서 알 수 없는 값이 있을 때 사용된다.

위에서 설명했던 any처럼 모든 값에 대해서 들어 올 수 있다. 이때 unknown의 장점은 타입을 검사하여 정제(refine) 하기 전까지는 타입스크립트가 unknown 타입의 값을 사용할 수 없게 강제 할 수 있다.

즉 타입에 대해 미리 알수 없는 값이 들어올때 any 대신에 unknown을 사용 할 수 있다.

```ts
let a: unknown = 30 // unknown
let b = a === 123 // bolean
let c = a + 10 // Operator '+' cannot be applied to types 'unknown' and '10'.ts(2365)

if (typeof a === "number") {
  // 타입 정제를 통해 unknown 타입을 사용 할 수 있다.
  let d = a + 10 // number
}
```

> unknown은 (==, ===, ||, && , ?, !) 지원하고 `typeof`, `instanceof` 연산자로 정제가 가능하다.

# boolean

boolean 타입은 true, false 두 개의 값을 가지고 있다.

```ts
let a = true // boolean
var b = false // boolean
const c = true // true
let d: boolean = true // boolean
let e: true = true // true
let f: true = false // Type 'false' is not assignable to type 'true'.ts(2322)
```
