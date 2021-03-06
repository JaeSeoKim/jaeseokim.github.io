---
title: "[42Seoul] ft_printf 프로젝트 기록."
date: 2020-11-24
tags: ["42Seoul", "ft_printf", "C"]
draft: false
---

> 🚧 프로젝트 진행 기간 2020.10.05 ~ 2020.11.19
>
> ![ft_printf-score](https://badge42.herokuapp.com/api/project/jaeskim/ft_printf)

이번에 `ft_printf` 프로젝트를 진행하면서 어떤 형태로 고민을 하고 해결을 하였는 지에 대해 기록을 하고자 작성을 해본다.

## ✈️ 프로젝트 시작

ft_printf라는 프로젝트를 들었을 때는 선발 과정인 피신 과정 진행 중 이였다.

처음에는 농담 식으로 이렇게 std libary를 구현 하라고 하고 printf를 사용 못 하게 하는거 보면 나중에 직접 구현 하라고 하는 거 아니에요? 라고 주변 동료들에게 농담으로 던졌는데 그게 실제로 본 과정에 있다는 것을 듣고 경악 한 기억이 있다.

그리고 본 과정을 시작을 하게 되고 첫 프로젝트인 Libft를 클리어 하고 나니 바로 `ft_printf` 프로젝트가 보이는 것을 볼 수 가 있었다 ㅠㅠ

![circle](image/42Seoul-ft_printf-프로젝트-기록/circle.png)

ft_printf 프로젝트가 워낙 어렵다고 소문이 있어서 처음 시작을 하기 전에 netwhat, get_next_line 를 완료 후 도전을 하게 되었다.

일단 첫 날에 시작을 하고 처음에는 어떤 것 부터 해야 하는지에 대해 엄청난 고민을 하다 일단 원 함수의 동작을 어떻게 하는지에 대해서 정리를 하자고 생각을 하게 되어서 github에 만들어 둔 42cursus repo의 ft_printf 폴더 안에다가 markdown으로 정리를 하기 시작을 하게 되었다.

[깃허브 링크](https://github.com/JaeSeoKim/42cursus/tree/master/01_ft_printf)

## 🗂 프로젝트 구조 만들기!

그렇게 일단 간단하게 내용을 정리하고 나서 그 다음으로 해야 하는 일이 무엇이 있을까 고민을 하면서 생각을 해보게 되었는데 일단 `ft_printf` 의 과제는 `printf` 와 기능을 똑같이 동작하는 `libftprintf.a` 라이브러리를 만들어야 하고 그리고 이것을 만들기 위해 이전 프로젝트인 `Libft` 을 가지고 작업을 하는 것이 허용이 되어 있는 것을 보게 되었다.

그래서 이전에 만든 libft를 쉽게 사용 할 수 있도록 `make -C` 옵션을 사용하여서 `libftprintf.a` 를 만들기 위해서는 `libft.a` 파일이 선행으로 complie이 되어야 하도록 설정을 하였다.

그리고 개발을 하다 보면 무수히 많은 c 파일이 만들어지게 되는데 이것을 한눈에 구분하여 소스 파일을 관리 할 수 있도록 c파일은 `src` 밑으로 header 파일은 `includes` 밑으로 파일을 두고 컴파일 시에 생성되는 object 파일들은 `obj` 밑으로 생성이 되도록 만들었다.

그리고 이렇게 만들어진 파일들을 이용하여 개발을 하면서 의도하고 방향으로 작동을 하는 지에 대해 test파일을 컴파일 후 실행을 하게 되는 target를 만들어서 개발할 때에 대해서 용이성을 늘렸다.

## 📖 가변 인자에 대해서 공부하기!

프로젝트 구조를 간단하게 만들어 두고 printf의 작동 기능에 대해서 정리를 하였으니 이제 코딩에 돌입 하기 위해서 `printf` 는 가변 적으로 인자를 받아 들이기 때문에 `stdarg.h` 에 정의 되어 있는 함수들 에 대해서 공부를 하게 되었다.

인터넷 검색을 통해서 공부를 진행하고 간단한 예제를 작성하여서 테스트를 하고 공부한 내용을 간단하게 정리하여서 블로그 글로 작성을 하게 되었다.

[variable argument 사용법에 대해 알아 보기!](https://jaeseokim.github.io/C/C-variable-argument-사용법에-대해-알아-보기/)

## 📝 parsing 하기!

일단 parsing를 하기 위해서 조건에 대해서 생각을 해보게 되었다.

원래 일반적으로 생각을 하게 된다면 처음 `%` 를 만나게 되면 parsing를 시작하게 되고 flag가 처음 오게 된 후 그 다음 width, precision, type순으로 오게 될 것이라고 생각을 하게 되는데 이것을 맨 처음 개인 노트북 wsl ubuntu환경에서 실행을 했을 때에는 위의 조건에서만 정상적으로 출력이 되고 그 이외의 경우에는 작성한 format이 그대로 출력 되는 모습을 볼 수 있었다.

하지만 실제로 똑같이 구현을 해야 하는 대상은 MacOS에서의 printf 이므로 MacOS에서는 여러가지 flag가 중복이 되거나 width가 여러번 오고, precision등의 위치가 변경이 되어도 정상적으로 전부 parsing를 하고 가장 마지막의 정보를 기준으로 출력을 하기 때문에 이러한 조건에 맞춰서 parsing를 하게 되었다.

최종적으로 완성하게 된 parsing 부분은 parsing를 하게 된 정보들이 저장된 구조 체를 들고 다니면서 저장을 하게 되고 탈출 조건에 성립되지 않는 다면 재귀 함수 형태로 무한하게 parsing를 하도록 만들었다.

탈출 조건은 총 3가지로 `format` 에 해당 하는 문자열이 끝나거나 `[flags][width][.precision][extend_type]` 에 해당 하는 문자열이 아닐 때는 `return 0` 를 통하여 parsing 종료만 하도록 하였고, `type` 에 해당하는 문자열을 만났을 때에만 문자열을 출력 하고 그에 따른 문자열 출력 길이를 반환하도록 만들었다.

## ⚔️ ft_sprintf를 동시에 구현하기!

위에서 했던 것 처럼 parsing 부분에 대해서 완료를 하고 난 이후에는 이제 출력을 조건에 따라서 진행을 하게 되면 되었는데 인터넷에서 처음 printf를 어떻게 구현이 가능할 까 고민을 하면서 찾아 보다가 어떤 한 사이트에서 매우 간단한 type만을 지원하는 printf 였지만 sprintf와 동시에 작동이 되도록 구현이 되어 있는 것을 보고 나중에 프로젝트를 진행하면서 유용하게 사용을 하게 될 것 같아서 sprintf도 같이 구현을 시작하게 되었다.

구현 하는 방법은 사실 매우 간단한 방법으로 진행 되었다.

`sprintf` 는 인자를 하나만 더 받게 되는데 그것은 바로 `char *` 로 된 buf 주소를 받게 된다.

sprintf는 기존 printf에서 stdout으로 출력을 하는 것을 처음 받은 buf 주소에 하나씩 채워 주기만 하면 되는 역할을 한다.

그래서 printf용 전용 custom 함수를 작성 하였고 아래와 같이 out이 null이 아니라면 buf에 문자열을 담고 포인터를 증가 시키고 out이 null이라면 기존 stdout으로 출력을 하도록 만들었다.

```c
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_putchar_out.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/14 18:14:49 by jaeskim           #+#    #+#             */
/*   Updated: 2020/10/22 23:00:14 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf_util.h"

void	ft_putchar_out(char **out, int c)
{
	if (out)
	{
		**out = c;
		++(*out);
	}
	else
		ft_putchar_fd(c, 1);
}
```

이렇게 만듬 으로 다른 추가적인 코드가 크게 필요가 없이 sprintf도 구현을 같이 진행하게 되었다.

## 📤 %d, i 출력 구현하기!

맨 처음 %d를 구현하기 시작 전에 `ft_printf` 의 Bonus 항목인 `l, ll, h, hh` 에 대해서 대응을 어떻게 할 까 고민을 하다가 가장 큰 type인 `long long` 에는 어떤 데이터든 저장이 가능하니 가변 인자에서 값을 가져올 때에만 각 type에 맞게 가져오고 `long long` 에 담아서 출력을 하면 문제가 없기 출력이 가능하기 때문에 가장 큰 변수 type를 기준으로 개발을 하였다.

```c
long long int			ft_get_extend_id(va_list ap, t_format *pf)
{
	if (pf->l_count == 1)
		return (va_arg(ap, long int));
	if (pf->l_count >= 2)
		return (va_arg(ap, long long int));
	if (pf->h_count == 1)
		return (short int)(va_arg(ap, int));
	if (pf->h_count >= 2)
		return (signed char)(va_arg(ap, int));
	return (va_arg(ap, int));
}
```

그리고 기존 libft에 작성되어 있는 itoa는 int type만을 대응하기 때문에 `long long` 과 같은 큰 type도 대응이 가능하도록 새로운 함수를 작성하여 개발을 진행 하였다.

출력하는 로직을 일단 parsing 하여 구한 정보를 기반으로 최종적으로 출력되는 최대 길이를 구하고 거기서 문자열의 길이와 precision의 길이를 빼서 width를 출력을 하게 하는 방향으로 완성을 하였다.

이 때 flag의 조건에 따라서 출력 되는 순서를 달리 하도록 만들어 둠으로 다양한 flag에 대해 작동이 가능하게 만들었다.

## 📤 %u, x, X, o, p 출력 구현하기!

첫 %d를 구현하고 나니 그 다음 부터는 처음 구현한 %d의 로직을 그대로 따라가면서 일부 flag에 대한 조건 변경을 하게 되면 되어서 쉽게 끝나게 되었다.

`%u` 같은 경우에는 unsinged 자료 형이기 때문에 기존`%d`에서 출력 한 부호의 출력을 제거한 로직을 사용하면 되었고 `x, X, o, p` 와 같은 경우에는 피신 때 만든 base_converter 함수를 이용하여 간단하게 문자열로 바꾸는 함수를 만들었다.

그리고 각 type에 맞는 flag 예외 처리를 추가 하여서 완성을 하였다.

## 📤 %c, s 출력 구현하기! (unicode encoding!)

이제 가장 기본적인 `%c` 와 `%s`에 대해서 구현을 시작을 했는데 이 때 발생한 문제는 바로 다름이 아닌 l과 같이 사용이 될 때 unicode에서의 encoding를 하게 되고 출력이 되어야 하기 때문에 그 부분에 대해서 encoding 과정에 대해서 공부를 해야 하는 문제가 있었다. (뒤 늦게 구현을 다 끝내고 알게 된 사실 이였지만 채점을 하는 구현 범위에는 포함되는 부분이 아니였다 ㅠㅠ)

그래서 구현을 하기 이전에 unicode를 인코딩 하는 방식 중 가장 대표적인 `UTF-8` 인코딩에 대해서 공부를 하고 비트 연산을 이용하여 인코딩 하는 방법에 대해 구상을 하였다.

[유니코드(unicode)에 대해 알아보기! (feat. 42seoul{ft_printf})](<https://jaeseokim.github.io/C/C-유니코드(unicode)에_대해_알아보기(feat.42seoul_ft_printf)/>)

그 결과 위의 글과 같이 내용을 정리하게 되었다..!!

이제 위에서 정리한 내용을 바탕으로 `%c`는 출력 시점에서 인코딩을 해서 출력을 하도록 하였고, 문자열의 경우는 출력되는 길이를 알고 있어야지 기존에 짜둔 로직이 문제 없이 돌아가기 때문에 unicode 배열을 utf-8방식으로 인코딩된 `char *` 반환하여 작동을 하도록 만들었다!

이때 `%s` 의 경우 precision이 들어오면 문자열을 precision만큼 출력을 하게 되는데 인코딩 되는 길이가 precision를 넘어가게 되면 해당하는 문자열을 출력을 하지 않아서 그 부분에 대해서 수정을 하여서 완성을 하였다!

## 📤 % f, g, e 출력 구현하기! (지옥의 시작....!!)

이제 `Mandatory` Part 부분은 끝나고 `% f,g,e` 에 해당하는 Bonus Part 부분만이 남게 되었다.

일단 맨 처음 부동 소수점에 대해서 잘 모르고 시작을 할 때에는 이거 그냥 간단하게 정수 부는 cast 연산으로 정수로 바꾸고 itoa 한 다음 . 붙이고 실수 부는 10 ^ n 된 값을 곱해서 itoa 하면 끝 아닌가? 하면서 간단한 dtoa 함수를 만들게 되었다.

이렇게 완성된 `dtoa` 를 이용하여 완성한 `%f` 항목은 간단한 형태에서는 동작을 잘 하지만 precision를 과도하게 준다거나 소수점 유효자리수를 벗어난 값은 제대로 출력이 안되는 문제가 생겼다.

사실 위에서 만든 방법대로 만들고 제출을 해도 통과가 되는 범위 였지만 제대로 부동 소수점에 대해서 모르고 완성도가 낮은 코드여서 다시 공부를 하면서 코딩을 하게 되었다.

그래서 공부 하면서 엉망이지만 아래와 같이 정리를 하게 되었다!

[부동소수점(Floating Point System) 알아보기!(feat.ft_printf)](<https://jaeseokim.github.io/Etc/부동소수점(Floating_Point_System)_알아보기!(feat.ft_printf)/>)

직접 union과 bitfield를 이용하여 bit의 값을 이용하여 실제 값을 구 하였고 이제 dtoa에서 각 `specifier` 에 해당하는 표현으로 반환이 가능하도록 만들었다.

## 🗂 프로젝트 구조 개선!

프로젝트를 진행하면서 이전에 만들었던 구조에서는 `/src` 하위에 대부분의 c 파일들이 분리 없지 저장이 되어 있어서 구조가 커지다 보니 불편함을 느끼게 되어서 전체적으로 개선에 들어갔다!

일단 `/src` 밑에 기능 단위로 기준으로 하여서 하위 폴더를 생성하여 소스 파일을 분리하였다.

그리고 폴더 별로 `header` 파일을 생성을 하여서 관리를 하도록 만들었다.

그리고 `typdef` 에 대한 내용을 `ft_<foldername>_type.h` 형태로 작성된 파일에 분리를 하였다!

이렇게 수정을 하여서 기존에 Norm 규칙에 맞추느라 TabSpace가 무수하게 커지는 문제가 있었는데 가독성을 지키면서 쉽게 확인이 가능하도록 수정을 하였다.

마지막으로 makefile에서 출력 하는 메세지를 `\\e[1K\\r` 를 이용하여 현재 line에서 교체 하면서 출력이 가능하게 수정을 하였다.

## 🙆‍♂️ 프로젝트 마무리 하면서!

42Seoul의 본 과정을 시작하면서 이렇게 오랫동안 프로젝트를 진행한 것은 처음 이여서 중간에 힘들고 지쳤던 적도 많았지만, 주변 동료들이 있어서 끝까지 포기 하지 않고 완성 할 수 있었던 것 같았다!

스터디 내부에서 처음으로 먼저 `ft_printf` 프로젝트를 시작하면서 고민을 하고 힘들어 했는데 `spark` 형이 내부에서 같이 하자면서 다른 프로젝트 뒤로 미루고 같이 시작 해주고 스터디 내부에서도 다같이 시작을 하면서 토론을 해서 진짜 빠르게 프로젝트를 완성 할 수 있었던 원동력이 되었던 것 같다!

42에서 살아남기 위해서는 역시 주변 동료들과 함께 있어야 하는 것 같다!
