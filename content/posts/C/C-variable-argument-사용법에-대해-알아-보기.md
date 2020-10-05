---
title: "[C] variable argument 사용법에 대해 알아 보기!"
date: 2020-10-05 20:09:12
tags: ["c", "ft_printf", "42seoul"]
draft: true
---

# Intro

42Seoul의 본 과정을 드디어 시작을 하여서 빠르게 `Libft` 프로젝트를 클리어 하여서 `ft_printf` 프로젝트를 풀기 위해 준비를 하게 되었다.

일단 함수의 proto type은 반드시 `ft_printf(const char *, ...);` 이여야 한다는 조건과 함께 `va_*` 와 같은 함수들의 제약 조건이 해제 되어 있는 것을 보고 가변길이 인자에 대해 공부가 필요 하다고 판단이 되어서 글을 작성하게 되었다.

# variable argument?

variable argument(가변 인자)란? 말 그대로 인자에 대해서 가변적으로 작동을 한다는 의미 이다. 대표적인 가변 인자 함수로써는 `printf` `scanf` 등이 있다.

기본적으로 variable argument는 고정적으로 사용되는 인자 `ex) const *char str` 다음에 `...` 를 인자로 작성하는 것으로 선언을 한다.

가변인자에 대한 함수가 선언이 된 헤더 `stdarg.h` 를 include 하여 한번 간단하게 example code를 작성한다.

```c {numberLines}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   test.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.k>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/05 21:09:48 by jaeskim           #+#    #+#             */
/*   Updated: 2020/10/05 21:16:05 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>
#include <stdarg.h>

void    printNum(int argc, ...)
{
    va_list args;	// 가변 인자를 저장하기 위한 변수 선언.

    va_start(args, argc); // 가변 인자의 값을 가져오기 위한 
    while (argc-- > 0)
    {
        printf("%d ", va_arg(args, int));
    }
    va_end(args);
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

