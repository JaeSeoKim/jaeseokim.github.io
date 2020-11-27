---
title: "🐳 Docker 기초 부터 Wordpress 서비스 직접 구현 까지!"
date: 2020-11-27
tags: ["docker", "ft_server", "42seoul"]
draft: true
---

![Moby-logo.png (601×431)](image/docker기초부터-wordpress서비스-직접구현까지/Moby-logo.png)

> 귀여운 Docker Logo!

# 🐳 Docker란!

Docker는 Linux Container 기술을 이용하여 만든 Container 기술 중 하나!

<details>
<summary>📦Linux Container 기술이란?</summary>

---

Linux Container는 기본적으로 프로세스를 격리 시킨다는 개념에서 출발.

예를 들어 `chroot` 명령어는 프로세스가 접근 할 수 있는 `/` 경로를 변경하여 접근 하는 파일에 대해서 제어 가능.

하지만 `chroot` 명령어 만으로는 네트워크 및 프로세스 등을 제한하기 어렵기 때문에 `cgroups` 기능을 이용하여 각종 리소스에 대해서 제어가 가능.

위와 같은 기능들을 이용하고 발전 시켜서 Linux Container 기술이 탄생됨.

Host와 프로세스, 리소스 격리를 통하여 컨테이너로 가둔 환경을 생성.

이를 통해 가상화와 달리 운영체제를 가상화 하기 위한 시스템이 별도로 필요가 없고 격리를 이용하여 Native 수준으로 실행이 가능함.

---

</details>

Docker를 이용하게 되면 응용 프로그램을 Host와 격리되어 실행이 되고 응용 프로그램을 위한 환경 전체가 미리 이미지에 대해 정의가 되어 실행이 되기 때문에 host의 환경과 상관없이 언제나 동일한 실행할 수 있다!

또한 가상화와 달리 격리하여 프로세스를 실행하는 것 이기 때문에 평범한 프로그램을 실행하고 종료하는 것과 같이 빠른 실행과 종료가 가능하다.

위 장점들을 통해서 하나의 이미지에서 **개발과 테스트 배포** 모든 것이 **빠르고 신속**하게 이루어 질 수 있다.

Docker는 대부분의 운영 체제에서 지원을 하나 Linux Container 기술이기 때문에 Linux 이외의 환경, Mac, Windows에서는 VM위에서 동작하게 된다.

## 💿 Docker Image

Docker는 만들어진 Container 환경 상태를 Image로 저장을 할 수 있도록 지원을 한다.

이렇게 만들어진 Docker Image를 기반으로 새로운 이미지를 만들거나 다른 서버에서 동일하게 실행이 가능하다.

이러한 Docker Image를 업로드 하여 보관하고 버전 관리 하는 곳이 있는데 그 곳을 `registry` 라고 한다.

대표적인 registry로 [**Docker Hub**](https://hub.docker.com/)가 있다.

## 🗂 Dockerfile

Dockerfile은 image를 생성하기 위한 Script 파일이다.

Dockerfile은 Image를 만들기 위한 작업이 기재되어 있기 때문에 Build가 되면 동일한 Image를 만들어내게 된다.

이 점을 이용하여 배포 시에 Build 후 나온 몇 기가 이상되는 이미지를 이용하여 배포하기 보다는 Dockerfile를 이용하여 build 하여 배포를 한다.

### 📝Dockerfile 작성 문법!

#### 📋 FROM

기본적으로 Dockerfile은 어떤 이미지를 기반으로 시작하는 지에 대해서 정의를 시작한다.

```dockerfile
# FROM <image-name>:<label>
FROM debian:buster
```

위와 같이 `FROM` 뒤에 이미지의 이름이 오고 그 다음에는 이미지의 label이 오게 된다.

여기서 이미지는 기본적으로 [\*\*Docker Hub](https://hub.docker.com/)\*\* 와 Alias가 되어 있어서 다른 registry에서 이미지를 가져 올 때에는 registry의 전체 url를 포함하여 작성을 해야 한다.

#### 📋 RUN

Dockerfile에서 이미지 내부에서 실행 되어야 하는 명령어를 작성을 할 수 있다.

```dockerfile
# RUN <command>
RUN apt update -y
```

위와 같이 `RUN` 뒤에 실행이 필요한 명령어를 작성을 하여 사용을 한다.

이때 위와 같이 사용 하는 방법만이 있는 것이 아니라 직접 실행 되어야 하는 경로를 직접 적어 주는 방법과 인자에 대해서 확실하게 array형태로 정의 해주는 방법도 존재 한다.

```dockerfile
RUN /bin/bash -c 'echo "Hello World!"'
RUN ["/bin/bash", "-c" "echo 'Hello World!'"]
```

이때 명령어를 실행한 후에 만들어지는 이미지를 레이어 별로 저장을 하게 되어서 `Dockerfile`에서 수정을 하여도 이전 레이어를 활용하여 빠르게 빌드가 가능하다.

#### 📋 COPY

Docker image를 만들면서 내부에 Sourcefile를 복사하여 이동이 필요 할 때가 있는데 이러한 상황에서는 아래와 같이 사용을 할 수 있다.

```dockerfile
# COPY <src> <dst>
COPY init.sh /
```

#### 📋 ADD

Dockerfile에는 `COPY` 와 유사한 성격인 `ADD` 명령어가 존재를 한다.

`ADD` 는 `COPY` 와 달리 파일의 src 부분에 url를 적게 되면 자동으로 파일을 다운 받아서 복사를 하고 압축 파일의 경우에는 압축을 해제해서 전달하게 되는 특징이 존재한다.

```dockerfile
# ADD <src(url)> <dest>
ADD <https://www.docker.com/sites/default/files/d8/2019-07/Moby-logo.png> /
```

이러한 특성이 존재하기 때문에 `COPY` 와 `ADD` 를 적절히 선택을 하여서 사용을 해야 한다.

#### 📋 ENV

Dockerfile에서는 내부 이미지에서 설정되는 환경 변수에 대해서도 아래와 같이 설정이 가능하다.

```dockerfile
# ENV name=value
ENV DEV_ENV=true
```

#### 📋 WORKDIR

Dockerfile에서 작업 하는 경로에 대해서 정의를 할 때에는 `WORKDIR` 를 이용하여 정의를 하게 된다.

```dockerfile
# WORKDIR <dir>
WORKDIR /root
```

#### 📋 USER

`WORKDIR` 를 이용하여 작업 경로를 지정하는 것과 같이 작업하는 사용자에 대해서도 정의가 가능하다.

```dockerfile
 # USER <user>[:<group>] | <UID>[:<GID>]
USER 0:0
```

단 이때 사용 되는 user에 대해서는 미리 `RUN` 를 이용해서 user와 group를 추가를 하거나 이미지에 등록이 된 user여만 작동을 하게 된다.

#### 📋 RUN

`RUN` 를 할 때에 사용이 되는 기본 shell에 대해 아래와 같이 정의가 가능 하다.

```dockerfile
# SHELL [<executable>, <parameters>]
SHELL ["/bin/bash", "-"]
```

#### 📋 ARG

Dockerfile은 image를 만들어주는 script 이므로 동적으로 할당이 가능한 `ARG` 를 사용 가능을 하다.

```dockerfile
# ARG <name>[=<default value>]
ARG user=root
```

이때 `ARG` 명령어로 정의하게 된 환경 변수는 동일한 `ARG` 변수를 재정의 한다.

빌드 할 때 만약 arg의 값을 변경하고 싶다면 아래와 같이 사용 한다.

```bash
$ docker build --build-arg user=jaeskim .
```

만약 환경 변수를 arg를 이용하여 재정의 하여 사용을 하고 싶다면 아래와 같이 사용 할 수 있다.

```dockerfile
ARG TEST
ENV TEST=${TEST:-hello_world}
RUN echo $TEST
```

#### 📋 EXPOSE

컨테이너 내부에서 네트워크 포트를 수신 대기 함을 Docker에게 미리 알려줄 수 있는데 이때 `EXPOSE` 명령어로 설정한다.

```dockerfile
# EXPOSE <port> | <port><protocol>
EXPOSE 80
EXPOSE 443/tcps
```

기본적으로 protocol에 대해서 정의를 하지 않게 된다면 tcp로 작동을 하게 되고, 여기서 정의를 하였다고 바로 HOST와 port가 연결이 되는 것이 아니기 때문에 run time시에 port binding 작업이 수행 되어야 한다.

#### 📋 CMD, ENTRYPOINT

이제 `Dockerfile` 에서 컨테이너가 올라가고 실행이 명령어에 대해서 정의 하는 방법에 대해 알아 본다.

`CMD` , `ENTRYPOINT` 라는 명령어를 이용하여 정의를 하게 되는데 각 각 사용 할 때와 같이 사용할 때의 예제와 함께 차이를 알아 본다.

```dockerfile
CMD ["echo", "hello"]
```

위와 같이 만들어진 dockerfile를 빌드 후 실행을 하게 되면 `echo hello` 가 작동 하는 것을 볼 수 있다.

이 때 `docker run test:cmd echo hi` 와 같이 마지막에 실행 인자를 전달 하게 되면 `echo hi` 가 실행이 되고 `inspect` 명령어로 확인을 해보면 `CMD` 부분의 정보가 새로 정의한 내용으로 변경이 되어 있는 것을 볼 수 가 있다.

이번에는 `ENTRYPOINT` 명령어를 단독으로 사용을 해본다.

```dockerfile
ENTRYPOINT ["echo", "hello"]
```

위와 같이 작성한 dockerfile를 빌드 후 실행하면 당연하게 `hello` 가 출력이 되는 것을 볼 수 있다.

이 때 `docker run test:entrypoint echo world` 로 실행을 하게 되면 `hello echo world` 가 나오는 것을 볼 수 있다.

이러한 동작이 나온 이유를 `inspect` 명령어를 통해 알아본다.

```json
...
"Cmd": [
  "echo",
  "world"
],
"Image": "test:entrypoint",
"Volumes": null,
"WorkingDir": "",
"Entrypoint": [
  "echo",
  "hello"
],
...
```

dcokerfile에서 작성된 `ENTRYPOINT` 는 재정의 되지 않고 `CMD` 부분은 재정의 되었지만 `ENTRYPOINT` + `CMD` 부분이 이어져서 작동을 한다.

즉 `ENTRYPOINT` 에는 서비스로 돌아가는 어플리케이션 으로 정의를 하고 `CMD` 부분을 추가 적으로 인자를 통해 정보를 전달 하는 형태로 만들어지는 것이 권장 된다.

#### 📋 VOLUME

Docker에서는 기본적으로 데이터를 이미지 레이어에 저장을 하게 되므로 container가 내려가고 새로운 것을 올릴 때마다 초기 설정된 데이터로 초기화 되는 휘발성이라는 특징을 가지고 있다.

이때 log file이나 db와 같은 데이터는 휘발성이 아닌 비 휘발성으로 관리 되어야 하므로 아래와 같이 특정 폴더를 기본 volume으로 저장을 하지 않고 따로 저장을 할 수 있다.

```dockerfile
# VOLUME [<dir>]
VOLUME ["/data"]
```

#### 📋 ONBUILD

만약 만들어진 image를 가지고 FROM를 할 때에 미리 수행 되어야 하는 작업이 있을 때 `ONBUILD` 를 사용한다.

예를 들어서 아래와 같이 `python build` 에 관련된 이미지라면 `FROM` 으로 사용하면 build를 할 때 src 파일들을 가져와 사용을 하게 만들 수 있다.

```dockerfile
# ONBUILD <INSTRUCTION>
ONBUILD ADD . /app/src
ONBUILD RUN /usr/local/bin/python-build --dir /app/src
```

#### 📋 STOPSIGNAL

기본적으로 Docker Container를 종료하게 되면 내부에서 작동하는 프로세스에게 `SIGTERM` 를 보내게 되는데 이 때 보내지는 SIGNAL에 대해서 정의가 가능하다.

```dockerfile
# STOPSIGNAL signal
STOPSIGNAL SIGKILL
```

#### 📋 HEALTHCHECK

DockerContainer가 올라갔을 때 실제로 프로세스가 정상적으로 동작 하는 지에 대해서 Healthcheck가 가능한데 이것을 아래와 같이 사용한다.

```dockerfile
# HEALTHCHECK [OPTIONS] CMD command
HEALTHCHECK --interval=5m --timeout=3s \\
  CMD curl -f <http://localhost/> || exit 1
```

여기서 사용 되는 옵션은 아래와 같이 사용이 된다.

- `-interval=DURATION` (default: `30s`)
- `-timeout=DURATION` (default: `30s`)
- `-start-period=DURATION` (default: `0s`)
- `-retries=N` (default: `3`)

#### 📋 LABEL

생성된 image에 대해 여러가지 정보를 담을 때에는 아래와 같이 사용을 한다.

```dockerfile
# LABEL <name>=<value>
LABEL maintainer="jaeskim <jaeskim.student.42seoul.kr>"
```

## 🖥 docker 명령어

docker를 관리 할 때 사용되는 다양한 명령어가 존재 하는데 그 중 자주 사용되고 중요한 명령어에 대해서 알아 본다.

옵션이 방대하여 모든 내용을 설명을 못하므로 필요한 기능이 있을 때에는 [reference site](https://docs.docker.com/engine/reference/commandline/docker/)에서 확인 하여 사용을 한다.

### ⚙️ build

`build` 명령어는 기본적으로 `Dockerfile` 를 이용하여 image를 만들 때 사용을 하게 된다.

```bash
# docker build [OPTIONS] PATH | URL | -
$ docker build --tag test:v1 .
```

기본적으로 위와 같은 구조로 작동이 되는데 자주 사용 되는 옵션에 대해서만 설명을 한다.

- `-t`, `--tag` name:tag 와 같은 형태로 인자를 주고 생성되는 image의 tag를 지정하는 옵션이다.
- `-f`, `--file string` 특정 `Dockerfile` 를 지정 하여서 이미지를 만들 때 사용한다.
- `--build-arg` Dockerfile에 정의된 변수에 대해서 값을 지정할 때 사용한다.
- `--no-cache` build 할 때 cache를 남기지 않도록 할 때 사용한다.

### 🏃🏻‍♂️ run

`run` 명령어는 만들어진 image를 가지고 실행 할 때 사용을 하게 된다.

```sh
# docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
$ docker run -p 8080:80 -it --rm --name testserver test:v1 /bin/bash
```

기본적으로 위와 같은 구조로 작동이 되는데 자주 사용 되는 옵션에 대해서만 설명을 한다.

- `-p`, `--publish` (host_port:container_port) container 내부의 port와 host의 port를 binding 할 때 사용이 된다.
- `-i`, `--interactive` STDIN를 container와 연결 하여서 동적으로 반응 할 수 있도록 한다.
- `-t`, `--tty` tty처럼 작동 할 수 있게 한다.
- `--rm` container가 종료되면 자동으로 image를 지워주는 옵션이다.
- `-e`, `--env` 환경변수를 정의할 때 사용하게 된다.
- `--name` 컨테이너 이름을 정의 한다.
- `-d`, `--detach` background로 container가 동작하게 되고 ID를 출력한다.
- `-v`, `--volume` volume를 마운트 시킬 때 사용한다.

### ✋ stop

`stop` 명령어는 container를 중지 시킬때 사용한다.

```sh
# docker stop [OPTIONS] CONTAINER [CONTAINER...]
$ docker stop testserver
```

- `-t`, `--time` STOPSIGNAL 시그널을 보내고 몇초간 대기를 할지 설정하는 옵션이다.

### 🎬 start

`start` 명령어는 멈춰진 container를 다시 동작 시킬 때 사용한다.

```sh
# docker start [OPTIONS] CONTAINER [CONTAINER...]
docker start testserver
```

- `-a`, `--attach` stdout/stderr 연결 한다.
- `-i`, `--interactive` STDIN를 container와 연결 하여서 동적으로 반응 할 수 있도록 한다.
