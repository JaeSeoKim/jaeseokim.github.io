---
title: "부동소수점(Floating Point System) 알아보기!"
date: 2020-10-29
tags: []
draft: true
---

일단 부동소수점(Floating Point System)이란 컴퓨터에서 실수를 표현하는 방법 중 하나이다.

기본적으로 부동소수점이란 움직이지 않는다는 뜻의 부동이 아닌 자유 롭게 떠다닌다는 의미의 부동(浮動)이다.

즉 부동소수점이라는 것은 2bit로 표현을 할 때 소수점 위치에 대해 가변적으로 조절을 하여 사용한다고 이해를 하면 된다.

부동소수점(Floating Point System)은 IEEE에서 제안한 표준을 대부분 따르고 있는데 이 표준에 대하여 알아본다.

# IEEE Floating Point Standard (IEEE 754)

IEEE 754에서는 표현 하게 되는 수의 정밀도에 따라 32bit(4byte)의 단 정밀도(single-precision) 64bit(8byte)의 배 정밀도(double-precision)로 형식 뿐만 아니라 79bit(약 10byte) 이상으로 (보통 80bit로 구현됨) 이루어진 확장 정밀도(extended-precision) 등 다양하게 정의 하고 있다.

이 때 `C` 에서 사용하는 `float` 이 단 정밀도(single-precision)에 해당하게 되고 `double` 이 배 정밀도(double-precision), `long double` 이 확장 정밀도(extended-precision)에 해당하게 된다.

## 정의

EEE 754 부동소수점 표기 표준은 다음과 같이 항목들을 정의한다.

- 산술 형식: 유한한 수들(0을 포함한)과 무한대와 NaN(Not a number)값으로 구성된 2진수와 10진수의 부동소수점 데이터 집합
- 형식의 교환: 부동소수점 데이터를 효율적이고 압축적으로 전환할 수도 있는 인코딩
- 반올림 규칙: 산수와 전환의 과정에서 반올림을 할 때의 성질
- 작동: 산수와 산술 형식의 처리 방법 형식
- 예외 처리: 예외적인 조건의 표기 (0으로의 나누는 작업, 오버플로 등)

IEEE 754에 이 외에도 더 복잡한 예외 처리, 추가적인 작업(삼각함수 등), 표현의 평가, 그리고 생산 가능한 결과의 성취를 위한 여러 방법이 포함되어 있다.

## 실수의 표현

IEEE 754에서 정의한 표현 형식을 보게 되면 아래와 같이 비트 화 하여 저장하게 된다.

| 값                             | 저장                                                       |
| :----------------------------- | :--------------------------------------------------------- |
| 단정밀도(single-precision)     | sign bit, 8-bit exponent, 23-bit significand               |
| 배정밀도(double-precision)     | sign bit, 11-bit exponent, 52-bit significand              |
| 확장정밀도(extended-precision) | sign bit, 15-bit exponent, Integer bit, 63-bit significand |

기본적으로 float
