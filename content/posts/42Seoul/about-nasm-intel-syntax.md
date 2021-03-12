---
title: "[42-libasm] nasm intel assembly syntax 알아보기!"
date: 2021-03-12
tags: ["libasm", "42Seoul", "assembly"]
draft: false
---

42Seoul에서 assembly 관련 서브젝트를 진행하게 되어서 개인적으로 정리한 내용입니다. 틀린 부분이 존재 할 수 있으니 발견하게 된다면 댓글로 이야기 해주세요!

> nasm syntax 란?
>
> The Netwide Assembler (NASM) uses a syntax "designed to be simple and easy to understand, similar to Intel's but less complex".
>
> NASM (Netwide Assembler)은 "인텔 문법과 비슷하지만 덜 복잡하면서 이해하기 쉽게 디자인 된"구문을 사용한다.

# HelloWorld 예제와 함께 문법 알아 보기!

Assembly는 기본적으로 기계어와 1대1 매칭이 되는 언어 이기 때문에 운영체제에 따른 변화가 존재 한다.

helloworld_mac.asm

```assembly
            global      start               ; Exporting Symbols to Other Modules

            section     .text               ; text(code) section
start:      mov         rax, 0x02000004     ; set system call for write
            mov         rdi, 1              ; set first argument for write function, stdout
            mov         rsi, message        ; set second argument for wirte function, address of string to c++
            mov         rdx, 13             ; set third argument for write function, number of bytes
            syscall                         ; invoke operating system to do the write
            mov         rax, 0x02000001     ; set system call for exit
            xor         rdi, rdi            ; set exit code 0;
            syscall                         ; invoke operation system to exit

            section     .data               ; data section
message:    db          "Hello, World", 10  ; "Hello, World\n"
```

> nasm -fmacho64 helloworld_mac.asm && ld -macosx_version_min 10.7 helloworld_mac.o && ./a.out

helloworld_linux.asm

```assembly
            global      _start              ; Exporting Symbols to Other Modules

            section     .text               ; text(code) section
_start:     mov         rax, 1              ; set system call for write
            mov         rdi, 1              ; set first argument for write function, stdout
            mov         rsi, message        ; set second argument for wirte function, address of string to c++
            mov         rdx, 13             ; set third argument for write function, number of bytes
            syscall                         ; invoke operating system to do the write
            mov         rax, 60             ; set system call for exit
            xor         rdi, rdi            ; set exit code 0;
            syscall                         ; invoke operation system to exit

            section     .data               ; data section
message:    db          "Hello, World", 10  ; "Hello, World\n"
```

> nasm -fmacho64 helloworld_linux.asm && ld helloworld_linux.o && ./a.out

위와 같이 동일한 Hello, World 를 출력하는 어셈블리 이지만 Syscall를 할 때 사용하는 포인터가 다른 것과 또 시작 점으로 정해진 EntryPoint가 start 와 \_start 로 다른 것을 볼 수 있다.

> 현재 ld 명령어가 macos에서 entrypoint가 start로 되는 것을 막고 있기 때문에 -macosx_version_min 10.7 플래그를 추가하여 해결을 한다!

# Structure of a NASM Program

```assembly
;LABELS         INSTRUCTIONS            OPERANDS
;DIRECTICES
                global                  start

;SECTIONS
;SECTION - text
                section                 .text
start:          mov                     rax, 0x020000004
                mov                     rdi, 1
                mov                     rsi, message
                mov                     rdx, 13
                syscall
                mov                     rax, 0x020000001
                xor                     rdi, rdi
                syscall

;SECTION - data
                section                 .data
message:        db                      "Hello, World", 10
```

기본적으로 NASM Assembly 문법은 하나이상의 DIRECTIES 로 구성이 되어 있고 옵션인 Label 그리고 Instruction, operand로 구성되어 있다.

global 키워드를 통해서 외부 모듈이나 심볼에 대해서 Exports 처리가 가능하다

section .text 영역에 실제 동작하는 코드에 대한 정보를 작성을 하고 section .data 에 정적인 데이터를 선언을 한다.

위의 예제 에서는 나오지는 않았지만 section .bss 에서는 사용하게 되는 변수에 대해서 정의 하게 된다.

# basic Instructions

기본적으로 필요한 Instructions에 대해서만 정리 하였다.

- mov x, y → x = y
- and x, y → x &= y
- or x, y → x |= y
- xor x, y → x ^= y
- add x, y → x += y
- sub x, y → x -= y
- inc x → x += 1
- dec x → x -= 1
- syscall → Invoke an operating system routine (운영 체제 루틴 호출)
- db → A pseudo-instruction that declares bytes that will be in memory when the program runs (프로그램이 실행되었을 때 메모리에 선언하는 의사 명령어)

# Register Operands

## General Registers

| 64-bit register | Lower 32 bits | Lower 16 bits | Lower 8 bits | Higher 8 bits |
| --------------- | ------------- | ------------- | ------------ | ------------- |
| **rax, r0**     | **eax, r0d**  | **ax, r0w**   | **al, r0b**  | **ah**        |
| **rbx, r1**     | **ebx, r1d**  | **bx, r1w**   | **bl, r1b**  | **bh**        |
| **rcx, r2**     | **ecx, r2d**  | **cx, r2w**   | **cl, r2b**  | **ch**        |
| **rdx, r3**     | **edx, r3d**  | **dx, r3w**   | **dl, r3b**  | **dh**        |
| **rsi, r4**     | **esi, r4d**  | **si, r4w**   | **sil, r4b** |               |
| **rdi, r5**     | **edi, r5d**  | **di, r5w**   | **dil, r5b** |               |
| **rbp, r6**     | **ebp, r6d**  | **bp, r6w**   | **bpl, r6b** |               |
| **rsp, r7**     | **esp, r7d**  | **sp, r7w**   | **spl, r7b** |               |
| **r8**          | **r8d**       | **r8w**       | **r8b**      |               |
| **r9**          | **r9d**       | **r9w**       | **r9b**      |               |
| **r10**         | **r10d**      | **r10w**      | **r10b**     |               |
| **r11**         | **r11d**      | **r11w**      | **r11b**     |               |
| **r12**         | **r12d**      | **r12w**      | **r12b**     |               |
| **r13**         | **r13d**      | **r13w**      | **r13b**     |               |
| **r14**         | **r14d**      | **r14w**      | **r14b**     |               |
| **r15**         | **r15d**      | **r15w**      | **r15b**     |               |

![rdx.png](image/about-nasm-intel-syntax/rdx.png)

하나의 64bit의 register를 위의 표처럼 공간을 나누어서 접근이 가능하다.

그리고 위에서 나온 Register 이외에도 128bit의 크기를 가진 16개의 XMM Register(XMM0 ... XMM15)가 존재한다.

이러한 register는 floating-point 연산에 사용하게 된다.

위의 표에서 r0(rax) ~ r7(rsp) 까지는 다른 이름으로 이미 예약이 되어 있는 것을 볼 수 있는데 이러한 이유는 이미 주요하게 사용 되는 역할이 정해져 있기 때문이다.

미리 예약된 registers에 대해서 정리를 하면 아래와 같다.

### Data Registers

AX 는 Accumulator Register로 피 연산자에 대한 결과에 대한 **누산기** 로 사용이 된다. 이러한 특성 때문에 함수의 **return 값**을 저장할 때에도 사용이 된다.

BX 는 Base Register로 주소값에 대해 **Index 하는 용도**로 사용하거나 **데이터의 주소를 가리키는 포인터**로 사용할 수 있다. SI , DI 와 결합하여 Index 에 사용된다.

CX 는 Count Register로 반복 동작에서 루프에 대해 **카운트** 할 때 사용할 수 있다.

DX 는 Data Register로 산술 연산과 I/O 명령에서 사용한다.

### Pointer Registers

SP 는 Stack Pointer로 **스택의 최상단을 가르키는 포인터로 사용된다.**

BP 는 Stack Base Pointer로 **스택의 베이스를 가리키는 포인터로 사용된다.**

IP 는 Instruction Pointer로 **다음에 시행할 명령어가 저장된 메모리 주소가 저장된다.** 현재 명령어를 모두 실행한 다음 IP 레지스터에 저장된 주소에 있는 명령어를 실행한다. (특수 레지스터)

### Index Registers

SI 는 Source Index Register로 **소스를 가리키는 포인터 또는 Index로 사용된다.**

DI 는 Destination Index Register로 **목적지를 가리키는 포인터 또는 Index로 사용된다.**

## Control Registers

많은 명령어 에는 비교와 수학적 계산이 포함이 되고, Flag의 상태를 변경을 하고 조건에 따른 제어 흐름을 이동시키기 위하여 이러한 상태 플래그의 값을 사용하게 된다.

- **Overflow Flag (OF)** −부호있는 산술 연산 후 데이터의 상위 비트 (가장 왼쪽 비트)의 오버플로를 나타낸다.
- **Direction Flag (DF)** − 문자열 데이터를 이동하거나 비교할 때 왼쪽 또는 오른쪽 방향을 결정합니다. DF 값이 0이면 문자열 연산은 왼쪽에서 오른쪽 방향을 취하고 값이 1로 설정되면 문자열 연산은 오른쪽에서 왼쪽 방향을 취한다.
- **Interrupt Flag (IF)** − 키보드 입력 등과 같은 외부 인터럽트를 무시하거나 처리할지 여부를 결정합니다. 값이 0이면 외부 인터럽트를 비활성화하고 1로 설정하면 인터럽트를 활성화한다.
- **Trap Flag (TF)** − 프로세서 작동을 single-step mode로 설정할 수 있습니다. DEBUG 프로그램은 Trap Flag를 설정하므로 한 번에 한 명령 씩 실행할 수 있다.
- **Sign Flag (SF)** − 산술 연산 결과의 부호를 보여줍니다. 이 플래그는 산술 연산 후 데이터 항목의 부호에 따라 설정됩니다. 부호는 가장 왼쪽 비트의 높은 순서로 표시됩니다. 양수 결과는 SF 값을 0으로 지우고 음수 결과는 1로 설정한다.
- **Zero Flag (ZF)** − 산술 또는 비교 연산의 결과를 나타냅니다. 0이 아닌 결과는 Zero Flag를 0으로 지우고 0 결과는 1로 설정한다.
- **Auxiliary Carry Flag (AF)** − 산술 연산 후 비트 3에서 비트 4 로의 캐리를 포함합니다. 특수 산술에 사용됩니다. AF는 1 바이트 산술 연산으로 인해 비트 3에서 비트 4로 캐리가 발생할 때 설정한다.(It contains the carry from bit 3 to bit 4 following an arithmetic operation; used for specialized arithmetic. The AF is set when a 1-byte arithmetic operation causes a carry from bit 3 into bit 4.)
- **Parity Flag (PF)** − 산술 연산에서 얻은 결과의 총 1 비트 수를 나타냅니다. 1 비트의 짝수는 패리티 플래그를 0으로 지우고 1 비트의 홀수는 패리티 플래그를 1로 설정한다.
- **Carry Flag (CF)** − 산술 연산 후 상위 비트 (가장 왼쪽)에서 0 또는 1의 캐리를 포함합니다. 또한 이동 또는 회전 작업의 마지막 비트 내용도 저장한다.

The following table indicates the position of flag bits in the 16-bit Flags register:

| Flag:   |     |     |     |     | O   | D   | I   | T   | S   | Z   |     | A   |     | P   |     | C   |
| ------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Bit no: | 15  | 14  | 13  | 12  | 11  | 10  | 9   | 8   | 7   | 6   | 5   | 4   | 3   | 2   | 1   | 0   |

## Segment Registers

Segment는 데이터, 코드, 스택을 포함하기 위해 프로그램에 정의되어 있는 특정한 공간

- **Code Segment** : 실행될 명령어들이 포함이 되고 CS(Code Segment) Register에는 Code Segment의 시작 주소를 저장하게 된다.
- **Data Segment** : 데이터, 상수, 작업 영역을 포함하게 된다. DS(Data Segment) Register에는 Data Segment의 시작 주소를 지정한다.
- **Stack Segment**: 데이터, 서브루틴, procedures의 주소를 포함하게 된다. 이러한 데이터 들은 Stack 형태로 구현되어 있습니다. SS(Stack Segment) Register에는 Stack Segment의 시작 주소가 포함되어 있다.

CS, DS, SS register에는 추가적으로 extra segment registers를 포함하고 있다.

**ES(extra segment), FS, GS** 는 데이터 저장을 위한 추가 segment를 제공한다. (e,f,g…)

어셈블리 프로그래밍에서는 프로그램의 메모리 위치에 접근을 하여야 한다. segment 내의 모든 메모리의 위치는 segment 시작 주소에 대하여 상대적이다.

segment는 16 또는 16 진수 10으로 균등하게 나눌 수있는 주소에서 시작합니다. 따라서 이러한 모든 메모리 주소에서 가장 오른쪽 16 진수는 0이며 일반적으로 segment register에 저장되지 않는다.

segment register는 segment의 시작 주소를 저장한다. segment 내의 데이터나 명령어의 정확한 위치를 얻기 위해서는 오프셋 값이 필요하다.

# Memory Operands

address에 대하여 접근하는 기본적인 형태 :

1. [reg]
2. [reg + displacement]
3. [displacement]
4. [reg * constant + reg]
5. [reg * constant + reg + displacement]

constant는 1, 2, 4, 8 만 올 수 있다. (scale의 용도로 사용됨)

Examples:

```assembly
[750]                  ; displacement only
[rbp]                  ; base register only
[rcx + rsi*4]          ; base + index * scale
[rbp + rdx]            ; scale is 1
[rbx - 8]              ; displacement is -8
[rax + rdi*8 + 500]    ; all four components
[rbx + counter]        ; uses the address of the variable 'counter' as the displacement
```

# Immediate Operands

Examples:

```assembly
200          ; decimal
0200         ; still decimal - the leading 0 does not make it octal
0200d        ; explicitly decimal - d suffix
0d200        ; also decimal - 0d prefex
0c8h         ; hex - h suffix, but leading 0 is required because c8h looks like a var
0xc8         ; hex - the classic 0x prefix
0hc8         ; hex - for some reason NASM likes 0h
310q         ; octal - q suffix
0q310        ; octal - 0q prefix
11001000b    ; binary - b suffix
0b1100_1000  ; binary - 0b prefix, and by the way, underscores are allowed
```

# Defining Data and Reserving Space

.data 영역에 아래와 같이 데이터를 선언 할 수 있다.

```assembly
      db    0x55                ; just the byte 0x55
      db    0x55,0x56,0x57      ; three bytes in succession
      db    'a',0x55            ; character constants are OK
      db    'hello',13,10,'$'   ; so are string constants
      dw    0x1234              ; 0x34 0x12
      dw    'a'                 ; 0x61 0x00 (it's just a number)
      dw    'ab'                ; 0x61 0x62 (character constant)
      dw    'abc'               ; 0x61 0x62 0x63 0x00 (string)
      dd    0x12345678          ; 0x78 0x56 0x34 0x12
      dd    1.234567e20         ; floating-point constant
      dq    0x123456789abcdef0  ; eight byte constant
      dq    1.234567e20         ; double-precision float
      dt    1.234567e20         ; extended-precision float
```

To reserve space (without initializing), you can use the following pseudo instructions. They should go in a section called .bss (you'll get an error if you try to use them in a .text section)

공간예약을 하지만 초기화를 하지 않는 경우에는 아래와 같이 .bss 영역에 선언 할 수 있다.

```assembly
buffer:         resb    64              ; reserve 64 bytes
wordvar:        resw    1               ; reserve a word
realarray:      resq    10              ; array of ten reals
```

# Calling Conventions

기본적으로 함수에 대한 인자는 아래의 표와 같이 전달되게 된다.

이때 Unix 계열과 Windows는 전달되는 인자의 register가 일부 차이가 발생하게 된다.

> windows

| 매개 변수 유형                         | 다섯 번째 이상 | 네 번째 | 세 번째 | second | 가장 왼쪽 |
| -------------------------------------- | -------------- | ------- | ------- | ------ | --------- |
| 부동 소수점                            | 스택           | XMM3    | XMM2    | XMM1   | XMM0      |
| integer                                | 스택           | R9      | R8      | RDX    | RCX       |
| 집계(8, 16, 32 또는 64비트) 및 \_\_m64 | 스택           | R9      | R8      | RDX    | RCX       |
| 기타 집계, 포인터로                    | 스택           | R9      | R8      | RDX    | RCX       |
| \_\_m128 , 포인터로                    | 스택           | R9      | R8      | RDX    | RCX       |

> unix 계열 (linux)

| 매개 변수 유형                         | 여섯 번째 이상 | 여섯 번째 | 다섯 번째 | 네 번째 | 세 번째 | second | 가장 왼쪽 |
| -------------------------------------- | -------------- | --------- | --------- | ------- | ------- | ------ | --------- |
| 부동 소수점                            | 스택           | XMM5      | XMM4      | XMM3    | XMM2    | XMM1   | XMM0      |
| integer                                | 스택           | R9        | R8        | RCX     | RDX     | RSI    | RDI       |
| 집계(8, 16, 32 또는 64비트) 및 \_\_m64 | 스택           | R9        | R8        | RCX     | RDX     | RSI    | RDI       |
| 기타 집계, 포인터로                    | 스택           | R9        | R8        | RCX     | RDX     | RSI    | RDI       |
| \_\_m128 , 포인터로                    | 스택           | R9        | R8        | RCX     | RDX     | RSI    | RDI       |

## Example of argument passing - all integers

C

```c
void   func1(int a, int b, int c, int d, int e, int f);
// windows: a in RCX, b in RDX, c in R8, d in R9, f then e pushed on stack
// unix(linux): a in RDI, b in RSI, c in RDX, d in RCS, e in R8, f in R9
```

## Example of argument passing 2 - all floats

C

```c
void  func2(float a, double b, float c, double d, float e, float f);
// windows: a in XMM0, b in XMM1, c in XMM2, d in XMM3, f then e pushed on stack
// unix(linux): a in XMM0, b in XMM1, c in XMM2, d in XMM3, e in XMM4, f in XMM5
```

## Example of argument passing 3 - mixed ints and floats

C

```c
void  func3(int a, double b, int c, float d, int e, float f);
// windows: a in RCX, b in XMM1, c in R8, d in XMM3, f then e pushed on stack
// unix(linux): a in RDI, b in XMM1, c in RDX, d in XMM3, e in R8, f in XMM5
```

## Example of argument passing 4 - **m64, **m128, and aggregates

C++

```c
func4(__m64 a, __m128 b, struct c, float d, __m128 e, __m128 f);
// windows:
// a in RCX, ptr to b in RDX, ptr to c in R8, d in XMM3,
// ptr to f pushed on stack, then ptr to e pushed on stack
// unix(linux):
// a in RDI, ptr to b in RSI, ptr to c in RDX, d in XMM3,
// ptr to e in R8, ptr to f in R9
```

## v\_ args

assembly 에서의 가변인자의 경우 보통 동일하게 인자가 들어오고 특정 갯수 이상은 Stack에 쌓이게 된다.

부동 소수점에 경우에만 사용자가 정수로 받아 들일 수 있기 때문에 integer용 register에도 값이 들어오게 된다.

## return value

일반적인 Scalar 값의 경우에는 RAX 에 리턴 값이 저장하게 되지만 float, double, vector type과 같은 Non-scalar type의 경우에는 XMM0 에 저장하여 return 하게 된다.

### Example of return value 1 - 64-bit result

c++

```c++
__int64 func1(int a, float b, int c, int d, int e);
// callee returns __int64 result in RAX.
```

### Example of return value 2 - 128-bit result

c++

```c++
__m128 func2(float a, double b, int c, __m64 d);
// callee returns __m128 result in XMM0.
```

### Example of return value 3 - user type result by pointer

c++

```c++
struct Struct1 {
   int j, k, l;    // Struct1 exceeds 64 bits.
};
Struct1 func3(int a, double b, int c, float d);
// Caller allocates memory for Struct1 returned and passes pointer in RCX
// callee returns pointer to Struct1 result in RAX.
```

### Example of return value 4 - user type result by value

c++

```c++
struct Struct2 {
   int j, k;    // Struct2 fits in 64 bits, and meets requirements for return by value.
};
Struct2 func4(int a, double b, int c, float d);
// callee returns Struct2 result by value in RAX.
```

# system call

system call은 운영 체제의 커널이 제공하는 서비스에 대해 응용 프로그램의 요청에 따라 커널에 접근하기 위한 인터페이스 이다.

이러한 systen call에 접근하기 위해서는 **운영체제**(커널)에 따라 사용하는 방법이 달라 지게 된다.

기본적으로 syscall 명령어는 RAX에 syscall 번호를 넣어서 해당하는 기능을 호출을 한다.

## linux

linux의 소스코드를 보게 되면 아래와 같이 write 에 대한 syscall 번호가 할당 되어 있는 것 을 볼 수 있다.

https://github.com/torvalds/linux/blob/master/arch/x86/entry/syscalls/syscall_64.tbl#L12

```assembly
0	common	read			sys_read
1	common	write			sys_write
2	common	open			sys_open
3	common	close			sys_close
```

## mac os

mac os의 경우 syscall number를 0x2000000 부터 시작을 하는 것을 볼 수 있는 데 이것은 xnu kernel에서 syscall number에 magic number를 추가하여 구분을 하기 때문.

https://opensource.apple.com/source/xnu/xnu-792.13.8/osfmk/mach/i386/syscall_sw.h

```c
#define SYSCALL_CLASS_NONE  0   /* Invalid */
#define SYSCALL_CLASS_MACH  1   /* Mach */
#define SYSCALL_CLASS_UNIX  2   /* Unix/BSD */
#define SYSCALL_CLASS_MDEP  3   /* Machine-dependent */
#define SYSCALL_CLASS_DIAG  4   /* Diagnostics */
```

mac os는 BSD 계열 이므로 아래의 매크로에 의해서 0x2000000 이라는 syscall 영역을 할당 받는 것을 볼 수 있습니다.

```c
// 2 << 24
#define SYSCALL_CONSTRUCT_UNIX(syscall_number) \
            ((SYSCALL_CLASS_UNIX << SYSCALL_CLASS_SHIFT) | \
             (SYSCALL_NUMBER_MASK & (syscall_number)))
```

이제 mac os에서 정의 된 syscall class + syscall number를 통해 mac os에서 사용되는 정확한 syscall number를 구할 수 있다.

https://opensource.apple.com/source/xnu/xnu-1504.3.12/bsd/kern/syscalls.master

```assembly
0	AUE_NULL	ALL	{ int nosys(void); }   { indirect syscall }
1	AUE_EXIT	ALL	{ void exit(int rval); }
2	AUE_FORK	ALL	{ int fork(void); }
3	AUE_NULL	ALL	{ user_ssize_t read(int fd, user_addr_t cbuf, user_size_t nbyte); }
4	AUE_NULL	ALL	{ user_ssize_t write(int fd, user_addr_t cbuf, user_size_t nbyte); }
5	AUE_OPEN_RWTC	ALL	{ int open(user_addr_t path, int flags, int mode); }
6	AUE_CLOSE	ALL	{ int close(int fd); }
```

---

> reference :
>
> https://github.com/torvalds/linux
>
> [https://ko.wikipedia.org/wiki/%EC%8B%9C%EC%8A%A4%ED%85%9C\_%ED%98%B8%EC%B6%9C](https://ko.wikipedia.org/wiki/시스템_호출)
>
> https://opensource.apple.com/
>
> https://cs.lmu.edu/~ray/notes/nasmtutorial/
>
> https://www.tutorialspoint.com/assembly_programming/index.htm
>
> https://docs.microsoft.com/ko-kr/cpp/build/x64-calling-convention?view=msvc-160
