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

위와 같이 컴파일 시간에서 확실하게 알 수 없거나 동적으로 변하는 상황에서 사용할 수 있다.

## unknown

unknown은 말 그대로 타입에 대해서 알 수 없는 값이 있을 때 사용된다.

위에서 설명했던 any처럼 모든 값에 대해서 들어 올 수 있다. 이때 unknown의 장점은 타입을 검사하여 정제(refine) 하기 전까지는 타입 스크립트가 unknown 타입의 값을 사용할 수 없게 강제 할 수 있다.

즉 타입에 대해 미리 알 수 없는 값이 들어올 때 any 대신에 unknown을 사용 할 수 있다.

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

# number

number 타입은 모든 숫자(정수, 소수, 양수, 음수, Infinity, NaN 등)의 집합이다.

# bigint

bitint는 JavaScript와 TypeScript에 새로 추가된 타입으로 number 타입의 2<sup>53</sup> - 1 까지의 정수보다 더 큰 수를 표현 할 때 사용이 가능합니다.

아직 모든 엔진이 bigint를 지원하지 않으므로 대상 플랫폼이 지원을 하는지에 대해 확인이 필요하다.

```ts
let a = 1234n			// bigint
const b = 5678n			// 5678n
let c: bigint = 123n	// bigint
let d = BigInt("123")	// bigint
let e = BigInt(123n)	// bigint
let f = 12.34n			// A bigint literal must be an integer.ts(1353)
let g: bigint = 100     // Type '100' is not assignable to type 'bigint'.ts(2322)
```

# symbol

symbol은 ES2015에서 새로 추가된 기능이다.

symbol은 변경 불가능한 원시 타입의 값이다. symbol은 주로 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키(property key)를 만들기 위해 사용한다.

symbol을 만들기 위해 `Symbol([description])` 를 통해 생성을 한다. 이때 들어가는 인자는 디버깅 용도를 위한 **description**으로 사용된다.

```ts
let a = Symbol("a") // symbol
let b = Symbol("a") // symbol
console.log(a === b) // output: false

const c = Symbol("c") // unique symbol
let d: unique symbol = Symbol("d") // A variable whose type is a 'unique symbol' type must be 'const'.ts(1332)
```

# object

object 타입은 객체의 형태(shape)를 정의한다.
