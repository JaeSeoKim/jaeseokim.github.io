---
title: "[C] variable argument 사용법에 대해 알아 보기!"
date: 2020-10-06
tags: ["c", "ft_printf", "42Seoul"]
draft: false
---

# Intro

42Seoul의 본 과정을 드디어 시작을 하여서 빠르게 `Libft` 프로젝트를 클리어 하여서 `ft_printf` 프로젝트를 풀기 위해 준비를 하게 되었다.

일단 함수의 proto type은 반드시 `ft_printf(const char *, ...);` 이여야 한다는 조건과 함께 `va_*` 와 같은 함수들의 제약 조건이 해제 되어 있는 것을 보고 가변 길이 인자에 대해 공부가 필요 하다고 판단이 되어서 글을 작성하게 되었다.

# variable argument?

variable argument(가변 인자)란? 말 그대로 인자에 대해서 가변적으로 작동을 한다는 의미입니다.
대표적인 가변 인자 함수로써는 `printf` `scanf` 등이 있습니다..

기본적으로 variable argument는 고정적으로 사용되는 인자 `ex) const *char str` 다음에 `...` 를 인자로 작성하는 것으로 선언을 합니다.

가변 인자에 대한 함수가 선언이 된 헤더 `stdarg.h` 를 include 하여 한번 간단하게 example code를 작성해봅니다.

```c {numberLines}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   test.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/05 21:09:48 by jaeskim           #+#    #+#             */
/*   Updated: 2020/10/06 18:44:01 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>
#include <stdarg.h>

void    printNum(int argc, ...)
{
    va_list ap;	// 가변 인자를 저장하기 위한 변수 선언.

    va_start(ap, argc); // 가변 인자의 시작 포인터 설정.
    while (argc-- > 0)
        printf("%d ", va_arg(ap, int)); // 가변 인자의 값을 return (2번째 인자에서 가져오는 type를 정의)
    va_end(ap); // 사용후 va_list의 포인터 값을 null로 초기화!
    printf("\n");
}

int     main(void)
{
    printNum(1, 1);
    printNum(2, 1, 2);
    printNum(3, 1, 2, 3);
    return (0);
}
```

실행을 해보게 되면 아래와 같이 결과물이 나오게 됩니다.

```bash
❯ gcc test.c
❯ ./a.out
1
1 2
1 2 3
```

이제 위에서 사용한 함수들을 정리해보게 되면 아래와 같이 정리가 됩니다.

## va_list

가변 인자의 Point를 저장하게 되는 Struct 입니다.

## va_start

가변 인자의 초기화를 담당하는 매크로 입니다.

`va_start(ap, pN)` 와 같은 형태로 사용을 하고 여기서 `ap` 는 가변 인자를 저장하는 변수(va_list), `pN` 은 마지막 고정 인수 입니다.

매크로 내부에서는 `pN`를 기준으로 그 다음 메모리 pointer로 초기화 합니다.

## va_arg

가변 인자를 값을 가져오는 매크로입니다.

`va_arg(ap, type)` 와 같은 형태로 사용을 하고 `ap` 는 가변 인자를 저장하는 변수(va_list), type은 가져오게 되는 변수의 Type 입니다!
내부적으로 ap에서 type만큼의 값을 읽어 오고 ap에는 `sizeof(type)` 만큼의 포인터를 이동하여 저장 시킵니다!

## va_end

ap(va_list)에 들어있는 포인터를 참조하여 초기화 시켜 주는 매크로입니다!
대부분의 구현에서는 `#define va_end(AP) ((void)0)` 형태로 아무 작업을 하지 않지만 일부 플랫폼에서는 문제가 발생하기 때문에 같이 사용하는 것이 권장 됩니다!
