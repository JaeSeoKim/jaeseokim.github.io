---
title: "[TypeScript] Basic Types"
date: 2020-09-19 19:40:00
tags: ["TypeScript"]
draft: false
---

TypeScript는 다양한 타입을 가지고 있기 때문에 타입에 대해서 정리를 해보았다.

# Any

any 타입은 어떤 타입이 와도 전부 허용을 한다는 타입이다. 하지만 이 타입을 사용할 때에는 주의를 기울어서 사용을 해야 한다.

만약 any타입을 남발해서 사용을 하게 된다면 TypeChecker가 동작하지 않게 되고 기존 JavaScript와 다른 점이 없어지게 되므로 TypeScript에서 오는 장점이 사라지니 이것을 남발해서는 안된다.

```ts {numberLines}
let a: any = "test"
a = false
a = 42

let b: any[] = [a, "test", 42, true]
```

위와 같이 컴파일 시간에서 확실하게 알 수 없거나 동적으로 변하는 상황에서 사용할 수 있다.

# Unknown

unknown은 말 그대로 타입에 대해서 알 수 없는 값이 있을 때 사용된다.

위에서 설명했던 any처럼 모든 값에 대해서 들어 올 수 있다. 이때 unknown의 장점은 타입을 검사하여 정제(refine) 하기 전까지는 타입 스크립트가 unknown 타입의 값을 사용할 수 없게 강제 할 수 있다.

즉 타입에 대해 미리 알 수 없는 값이 들어올 때 any 대신에 unknown을 사용 할 수 있다.

```ts {numberLines}
let a: unknown = 30 // unknown
let b = a === 123 // bolean
let c = a + 10 // Operator '+' cannot be applied to types 'unknown' and '10'.ts(2365)

if (typeof a === "number") {
  // 타입 정제를 통해 unknown 타입을 사용 할 수 있다.
  let d = a + 10 // number
}
```

> unknown은 (==, ===, ||, && , ?, !) 지원하고 `typeof`, `instanceof` 연산자로 정제가 가능하다.

# Boolean

boolean 타입은 true, false 두 개의 값을 가지고 있다.

# Number

number 타입은 모든 숫자(정수, 소수, 양수, 음수, Infinity, NaN 등)의 집합이다.

# Bigint

bitint는 JavaScript와 TypeScript에 새로 추가된 타입으로 number 타입의 2<sup>53</sup> - 1 까지의 정수보다 더 큰 수를 표현 할 때 사용이 가능하다.

아직 모든 엔진이 bigint를 지원하지 않으므로 대상 플랫폼이 지원을 하는지에 대해 확인이 필요하다.

```ts {numberLines}
let a = 1234n			// bigint
const b = 5678n			// 5678n
let c: bigint = 123n	// bigint
let d = BigInt("123")	// bigint
let e = BigInt(123n)	// bigint
let f = 12.34n			// A bigint literal must be an integer.ts(1353)
let g: bigint = 100     // Type '100' is not assignable to type 'bigint'.ts(2322)
```

# Symbol

symbol은 ES2015에서 새로 추가된 기능이다.

symbol은 변경 불가능한 원시 타입의 값이다. symbol은 주로 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키(property key)를 만들기 위해 사용한다.

symbol을 만들기 위해 `Symbol([description])` 를 통해 생성을 한다. 이때 들어가는 인자는 디버깅 용도를 위한 **description**으로 사용된다.

```ts {numberLines}
let a = Symbol("a") // symbol
let b = Symbol("a") // symbol
console.log(a === b) // output: false

const c = Symbol("c") // unique symbol
let d: unique symbol = Symbol("d") // A variable whose type is a 'unique symbol' type must be 'const'.ts(1332)
```

# Object

object 타입은 객체의 형태(shape)를 정의한다.

```ts {numberLines}
let a: object = {
  b: "x",
} // object
console.log(a.b) // Property 'b' does not exist on type 'object'.ts(2339)

let b = {
  c: "x",
} // {c: string}

console.log(b.c) // output: x

const c: {
  a: number
  b: string
} = {
  a: 123,
  b: "abc",
} //  {a: number, b: string}
```

위의 첫 번째 a 변수의 경우에는 선언까지는 정상적으로 동작하였으나 사용을 할 때 TypeScript는 처음 선언에서 object로 선언을 하였지만 형태는 초기 값 {} 으로 알고 있기 때문에 오류가 생기게 된다.

b 변수 선언처럼 타입 추론을 통해 알게 하거나 c 변수 선언처럼 초기에 object가 가지게 되는 프로퍼티에 대해 정의를 하여 사용 할 수 있다.

객체 타입에 대해 `?` 를 붙여 선택 형으로 사용이 가능하다.

```ts {numberLines}
let d: {
  a?: string
} = {}

let e: {
  a: string
} = {} // Property 'a' is missing in type '{}' but required in type '{ a: string; }'.ts(2741)
```

그리고 `readonly` Prefix를 이용하여 초기 값을 할당 이후에는 그 값을 바꾸지 못하도록 할 수 있다.

```ts {numberLines}
let f: {
  readonly a: number
} = {
  a: 42,
}

f.a = 0 // Cannot assign to 'a' because it is a read-only property.ts(2540)
```

또한 인덱스 시그니처(index signature) 기능을 통해 어떤 객체가 여러 키를 가질 수 있음을 알려 줄 수 있다.

선언은 `[key: Type]` 형태로 선언을 한다 이때 key에 대한 항목은 마음대로 이름을 바꾸어 사용이 가능하다.

```ts {numberLines}
let g: {
  a: number
  [key: number]: string
} = {
  a: 123,
  1: "test",
  2: "test2",
}
```

# Type alias

변수를 선언해서 값 대신 변수로 사용하는 듯이 type에 대해서도 별칭을 만들어 사용이 가능하다.

```ts {numberLines}
type Age = number
type Person = {
  age: Age
  name: string
}
```

타입 별칭을 사용하게 되면 가독성이 좋은 코드를 짜기가 쉬워 진다. 이때 TypeScript는 별칭에 대해서는 추론을 하지 않으므로 반드시 별칭의 타입을 명시적으로 정의해야 한다.

```ts {numberLines}
let age = 20
let jaeseokim: Person = {
  age: age,
  name: "김재서",
}
```

## Type Union, Intersection

Type에서 사용되는 특별한 연산자 Union(`|`), Intersection(`&`)이 존재한다.

### Union

```ts {numberLines}
type A = {
  Name: String
  A: boolean
}

type B = {
  Name: String
  B: boolean
}

type AorBorBoth = A | B

let union: AorBorBoth = {
  Name: "union",
} /*  Type '{ Name: string; }' is not assignable to type 'AorBorBoth'.
      Property 'B' is missing in type '{ Name: string; }' but required in type 'B'.ts(2322) */

let unionA: AorBorBoth = {
  Name: "union",
  A: true,
}

let unionB: AorBorBoth = {
  Name: "union",
  B: true,
}

let unionBoth: AorBorBoth = {
  Name: "union",
  A: true,
  B: true,
}
```

Union Type은 A type과 B type 중 하나의 Type에 속하거나 아니면 2 가지의 Type에 모두 속할 수가 있다.

### Intersection

```ts {numberLines}
type A = {
  Name: String
  A: boolean
}

type B = {
  Name: String
  B: boolean
}

type AandB = A & B

let intersection: AandB = {
  Name: "intersection",
  A: true,
  B: true,
}
```

intersection Type은 위와 같이 A type, B type에 대해 모두 가지고 있어야 한다.

### 사용 예시

보통 Intersection Type 보다는 Union Type이 자주 사용이 된다.

예를 들어 아래와 같은 함수가 있을 때 정상적인 status code 라면 string으로 된 응답 값을 return 하고 200~299 사이의 status code가 아니라면 status code를 즉 number를 return 해야 할 때 사용이 가능하다.

```ts {numberLines}
async function getData(url: string): Promise<string | number> {
  let response = await fetch(url)

  if (response.ok) {
    return await response.text()
  } else {
    return response.status
  }
}
```

# Array

TypeScript의 Array는 JavaScript와 동일 하게 contcatenation, pushing, searching, slicing 등을 지원하는 특별한 객체이다.

```ts {numberLines}
let a: number[] = [1, 2, 3]

let b: string[] = ["a", "b"]

let c: (number | string)[] = [1, "a"]

c.push(true) // Argument of type 'boolean' is not assignable to parameter of type 'string | number'.ts(2345)

let d: (number | boolean)[] = [1, true, "a"] // Type 'string' is not assignable to type 'number | boolean'.ts(2322)
```

Array는 보통 적으로 동형으로 만들게 되는데 동형으로 만들지 않게 되면 Array와 관련된 작업을 할 때 Type에 대해 안전 한지에 대한 추가 작업이 필요하게 된다.

이때 Typescript는 동형 배열의 처리가 쉬워진다. c의 예제를 보게 되면 number, string 2 가지의 Type 만이 허용을 하고 있는데 이때 boolean type를 push하게 되니 TypeScript에서 boolean은 허용된 Type이 아니기 때문에 에러를 발생하는 것을 볼 수 있다.

## Tuple

tuple은 array의 SubType이다.

tuple은 array와 달리 길이가 고정되어 있고, 각 인덱스의 타입이 알려진 배열의 일종이다.

```ts {numberLines}
let a: [string, number, string, number] = ["a", 1, "b", 2]

let b: [string, boolean] = ["a", "b"] // Type 'string' is not assignable to type 'boolean'.ts(2322)

let c: [string, ...string[]] = ["a"]
c.push("b")
c.push("c")

let d: [string, number?] = ["a"]
```

c의 예제와 같이 (`...`) 나머지 요소 연산자를 통해 tuple의 최소 길이를 정의할 때에도 사용이 가능하다.

d와 같이 선택 형 요소를 지원한다.

## readonly

array와 tuple은 readonly 키워드를 이용하여 기존 mutable 배열에서 immutable 배열로 만들 수 있게 된다.

즉 기존의 .push .splice 등의 작업을 사용이 불가능하게 되고 .concat .slice 와 같이 새로운 내용을 return하는 형태로 사용해야 한다.

```ts {numberLines}
type a = readonly string[]

let A: a = ["a"]

A[0] = "A" // Index signature in type 'a' only permits reading.ts(2542)
A.push("b") // Property 'push' does not exist on type 'a'.ts(2339)
```

단 readonly를 사용하여 배열을 바꾸는 작업을 자주 하게 되면 새로운 배열을 복사하여 작업해야 하기 때문에 오버헤드가 발생하여 프로그램이 느려질 수 있다.

# null, undefined, void, never

| Type      | Description                                              |
| --------- | -------------------------------------------------------- |
| null      | 값이 없음                                                |
| undefined | 아직 값을 변수에 할당하지 않음                           |
| void      | return문을 포함하지 않는 함수                            |
| never     | 절대 반환하지 않는 함수(예외를 던지거나 영원히 실행되는) |

# Enum

Enum은 해당 타입으로 사용할 수 있는 값을 열거하는 기법이다.

Enum은 키를 값에 할당하는, 순서가 없는 자료구조이다.

Enum은 문자열에서 숫자를 맵핑하는 `Numeric enum`, 문자열에서 문자열을 맵핑하는 `String enum` 두 가지가 있다.

> Enum은 이름을 단수 명사로 쓰고, 첫 문자는 대문자로 하는 것이 관례다. 키도 앞 글자를 대문자로 표시 한다.

## Numeric enum

```ts {numberLines}
enum Color {
  Red = 1,
  Green,
  Blue,
}
```

위와 같이 선언을 하게 되면 TypeScript는 자동으로 숫자 값에 대해 추론을 하여 1씩 증가된 2,3를 자동으로 할당한다.

이 때 `Numeric enum`은 `String enum`와 달리 `Reverse mapping` 이 가능하다.

```js {numberLines}
var Color
;(function (Color) {
  Color[(Color["Red"] = 1)] = "Red"
  Color[(Color["Green"] = 2)] = "Green"
  Color[(Color["Blue"] = 3)] = "Blue"
})(Color || (Color = {}))
```

위와 같이 컴파일이 되기 때문에 `Color.[1]` 과 같은 형태로도 사용이 가능하다.

## String enum

```ts {numberLines}
enum Language {
  Korean = "ko",
  English = "en",
  japanese, // Enum member must have initializer.ts(1061)
}
```

`String enum` 은 `Numeric enum`과 달리 추론이 안되기 때문에 반드시 초기화를 해주어야 한다.

또한 컴파일 시 아래와 같이 컴파일이 되어 `Reverse mapping` 이 불가능하다.

```js {numberLines}
var Language
;(function (Language) {
  Language["Korean"] = "ko"
  Language["English"] = "en"
  Language["japanese"] = "jp"
})(Language || (Language = {}))
```

---

아래와 같이 Numeric enum과 String enum를 혼합하여 사용도 가능하다.

```ts
enum Test {	// L1
  name = "JaeSeoKim",
  age = 20,
}
TypeScript -> JavaScript // L0
var Test;	// L1
(function (Test) {
    Test["name"] = "JaeSeoKim";
    Test[Test["age"] = 20] = "age";
})(Test || (Test = {}));
```

## Const enum

```ts {numberLines}
enum Color {
  Red = 1,
  Green = 2,
  Blue = 3,
}

console.log(Color[5]) // undefined
```

enum은 `Reverse mapping`을 통해 값으로 참조가 가능하지만 위와 같이 `Color[5]`은 접근할 수 없어야 하지만 TypeScript는 접근을 허용한다.

이에 대해서 해결할 수 있는 방법은 `const` 를 사용하면 위와 같은 오류를 막을 수 있다.

```ts {numberLines}
const enum Color {
  Red = 1,
  Green = 2,
  Blue = 3,
}

console.log(Color[5]) // A const enum member can only be accessed using a string literal.ts(2476)
```

또한 Const enum은 Complie시 아무 자바스크립트 코드를 생성하지 않으며 그 대신 필요한 곳에 열거형 멤버의 값을 채워 넣는다.

```ts
const enum Test {	// L1
  name = "JaeSeoKim",
  age = 20,
}

console.log(Test.name, Test.age)

let test1 = Test.name
let age = Test.age
// L0
TypeScript -> JavaScript // L0
// L0
console.log("JaeSeoKim" /* name */, 20 /* age */);	// L1
var test1 = "JaeSeoKim" /* name */;
var age = 20 /* age */;
```
