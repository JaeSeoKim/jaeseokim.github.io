---
title: "[TypeScript] Basic Types"
date: 2020-09-01 19:40
tags: ["TypeScript"]
draft: true
---

# TypeScript Basic Types

TypeScript는 다양한 타입을 가지고 있기 때문에 타입에 대해서 정리를 해보았다.

## any

any 타입은 어떤 타입이 와도 전부 허용을 한다는 타입이다. 하지만 이 타입을 사용할 때에는 주의를 기울어서 사용을 해야 한다.

만약 any타입을 남발해서 사용을 하게 된다면 TypeChecker가 동작하지 않게 되고 기존 JavaScript와 다른 점이 없어지게 되므로 TypeScript에서 오는 장점이 사라지니 이것을 남발해서는 안된다.

## unknown

unknown은 말 그대로 타입에 대해서 알 수 없는 값이 있을 때 사용된다.

위에서 설명했던 any처럼
