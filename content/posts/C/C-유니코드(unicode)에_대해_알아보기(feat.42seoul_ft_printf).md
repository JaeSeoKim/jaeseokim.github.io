---
title: "[C] 유니코드(unicode)에 대해 알아보기! (feat. 42seoul{ft_printf})"
date: 2020-10-23
tags: ["c", "ft_printf", "42Seoul"]
draft: false
---

# intro

42Seoul에서 열심히 공부를 하면서 `ft_print` 서브젝트를 진행하면서 유니코드를 write() 함수로 직접 출력 해야 하는 부분이 있어서 공부를 하게 되었다.

# UNICODE?

> 유니코드(Unicode)는 전 세계의 모든 문자를 컴퓨터에서 일관되게 표현하고 다룰 수 있도록 설계된 산업 표준이며, 유니코드 협회(Unicode Consortium)가 제정한다. 또한 이 표준에는 ISO 10646 문자 집합, 문자 인코딩, 문자 정보 데이터베이스, 문자들을 다루기 위한 알고리즘 등을 포함하고 있다.
> [_- 출처 위키백과_](https://ko.wikipedia.org/wiki/유니코드)

기본적으로 유니코드의 탄생 과정은 기존 ASCII코드 (0~255) 1byte의 크기를 가지고 컴퓨터에서 문자에 대하여 표현을 하고 있었다.

하지만 Ascii는 기본적으로 영문자를 지원하기 때문에 각 나라에서는 이것을 해결하기 위하여 Ascii를 수정하여 자신의 나라의 언어로 배정하여 사용하는 등.. 다양한 방식으로 문자를 표현 하기 시작하였는데 이제 인터넷이 발달이 되면서 각 나라의 사람들이 동시에 같은 코드를 보게 되면 각기 다른 문자로 표현되는 일이 발생하였다.

이 점을 해결하기 위해 나온것이 유니코드 이다.

유니코드는 문자와 코드가 1대1로 매칭 되어 있는 코드표 이다.

# UTF-8하고 Unicode는 어떤 차이?

`unicde`는 위에서 말했던 것과 같이 전세계에서 공통으로 사용되는 규칙 이다.

하지만 이 규칙을 컴퓨터에서는 표현하는데 다양한 방법을 사용하는 데 그것을 인코딩이라고 한다.

그 중 UTF-8은 대표적인 인코딩 방식 중 하나이다.

# UTF-8

`UTF-8` 은 유니코드를 표현하기 위한 `가변 길이 문자 인코딩` 방식 중 하나이다.

| 코드값의 자릿수 | 범위                                                    | 첫 바이트 | 둘째 바이트 | 셋째 바이트 | 넷째 바이트 | 다섯째 바이트 | 여섯째 바이트 |
| --------------- | ------------------------------------------------------- | --------- | ----------- | ----------- | ----------- | ------------- | ------------- |
| 7비트           | 0 ~ 0x7F<sup>127</sup>                                  | 0xxxxxxx  |             |             |             |               |               |
| 11비트          | 0x80<sup>128</sup> ~ 0x7FF<sup>2,047</sup>              | 110xxxxx  | 10xxxxxx    |             |             |               |               |
| 16비트          | 0x800<sup>2,048</sup> ~ 0xFFFF<sup>65,535</sup>         | 1110xxxx  | 10xxxxxx    | 10xxxxxx    |             |               |               |
| 21비트          | 0x10000<sup>65,536</sup> ~ 0x1FFFFF<sup>2,097,151</sup> | 11110xxx  | 10xxxxxx    | 10xxxxxx    | 10xxxxxx    |               |               |
| 26비트          | (미사용)                                                | 111110xx  | 10xxxxxx    | 10xxxxxx    | 10xxxxxx    | 10xxxxxx      |               |
| 31비트          | (미사용)                                                | 1111110x  | 10xxxxxx    | 10xxxxxx    | 10xxxxxx    | 10xxxxxx      | 10xxxxxx      |

`UTF-8` 은 최소 1byte ~ 4byte 까지를 가변적으로 사용하게 되는 데 이때 각 표현이 가능한 문자열의 크기에 따라 정해 지게 된다.

예를 들어서 `☠` 문자를 보면 unicode 값으로는 `9760` 이다.
아래와 같이 `UTF-8` 인코딩 방식을 통해 3byte의 크기로 변환이 된다.

![utf-8-encoding](<image/C-유니코드(unicode)에_대해_알아보기(feat.42seoul_ft_printf)/utf-8-encoding.drawio.svg>)

이제 위 방법을 C로 구현을 해본다!

# UTF-8 Encoding with C!

일단 헤더파일을 만든 후 아래와 같이 Define를 해둔다.

```c
#define UTF8_1 0x7F
#define UTF8_2 0x7FF
#define UTF8_3 0xFFFF
#define UTF8_4 0x1FFFFF
```

위애서 Define를 한 값은 각 인코딩 되었을 때 바이트 별 최대 값이다.

이걸 이용 하여 Bit연산을 통해 몇 byte가 필요한지 구한다!

```c
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_putwchar_fd.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/23 17:46:22 by jaeskim           #+#    #+#             */
/*   Updated: 2020/10/23 21:27:57 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <unistd.h>
#include "ft_utf8.h"

static void	ft_utf_4(int unicode, int fd)
{
	unsigned char buf;

	buf = (unicode >> 18 & 7) | 240;
	write(fd, &buf, 1);
	buf = (unicode >> 12 & 63) | 128;
	write(fd, &buf, 1);
	buf = (unicode >> 6 & 63) | 128;
	write(fd, &buf, 1);
	buf = (unicode & 63) | 128;
	write(fd, &buf, 1);
}

static void	ft_utf_3(int unicode, int fd)
{
	unsigned char buf;

	buf = (unicode >> 12 & 15) | 224;
	write(fd, &buf, 1);
	buf = (unicode >> 6 & 63) | 128;
	write(fd, &buf, 1);
	buf = (unicode & 63) | 128;
	write(fd, &buf, 1);
}

static void	ft_utf_2(int unicode, int fd)
{
	unsigned char buf;

	buf = unicode >> 6 | 192;
	write(fd, &buf, 1);
	buf = (unicode & 63) | 128;
	write(fd, &buf, 1);
}

static void	ft_utf_1(char unicode, int fd)
{
	write(fd, &unicode, 1);
}

void		ft_putwchar_fd(int unicode, int fd)
{
	if ((unicode | UTF8_1) == UTF8_1)
		ft_utf_1(unicode, fd);
	else if ((unicode | UTF8_2) == UTF8_2)
		ft_utf_2(unicode, fd);
	else if ((unicode | UTF8_3) == UTF8_3)
		ft_utf_3(unicode, fd);
	else if ((unicode | UTF8_4) == UTF8_4)
		ft_utf_4(unicode, fd);
	else
		ft_putchar_fd(unicode, fd);
}
```

각 코드에 대해 설명을 하자면 일단 `ft_putwchar_fd` 에서 Define된 값을 이용하여 위에서 부터 1byte를 사용해야 할때 최대로 가질 수 있는 값과 or연산을 수행 후 그 값이 동일 하다면 그 범위안에 속한 것이기 때문에 1byte에 해당 하는 동작으로 넘어가게 된다!

이제 각 2byte, 3byte.. 등의 부분에서는 이제 쉬프트 연산을 통하여 각 첫 바이트에 들어가야 하는 부분을 가져와 and 연산을 통하여 정리후 or 연산으로 고정 비트를 추가 하여 write 한게 된다.

이 부분을 위에서 설명한 `☠(9760)` 문자를 가지고 설명을 해본다!.

일단 처음 uncode로 값이 들어 왔을 때 `9760` 이기 때문에 위에서부터 차례대로 내려오다 `ft_utf_3` 함수로 넘어가게 돤다.

그 후 일단 `9760` 를 2진수로 변환하여 생각 하였을 때 `0010 0110 0010 0000` 이다.

그리고 `buf = (unicode >> 12 & 15) | 224;` 부분에서 12를 shift 연산을 통해 이동하게되어 `1000 1000 0000 1001` 가 되고 and 연산을 통해 `0000 1001` 으로 초기화가 된다. 그리고 마지막으로 고정비트를 추가 해주는 or 연산을 통하여 `1110 1001` 으로 되어서 1byte 출력을 하게 된다.

그리고 나머지 2byte 부분은 shift 연산을 하는 동작 이외에는 동일하게 6bit씩만 사용하기 때문에 63과 and 연산을 통해 초기화 하고 128과 or 연산을 통하여 고정 비트를 추가하여 출력 하게 된다.
