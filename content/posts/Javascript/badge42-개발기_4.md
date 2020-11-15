---
title: "[Typescript] badge42 개발기(4)"
date: 2020-11-09
tags: ["badge42", "Readme Badge", "Javascript", "42seoul"]
draft: true
---

**토이 프로젝트(badge42) 개발기 3편 입니다!**

**[이전글 1편 보러 가기!](https://jaeseokim.github.io/Javascript/42-readme-stats-%EA%B0%9C%EB%B0%9C%EA%B8%B0_1/)**

**[이전글 2편 보러 가기!](https://jaeseokim.github.io/Javascript/badge42-%EA%B0%9C%EB%B0%9C%EA%B8%B0_2_aka_42-readme-stats/)**

**[이전글 3편 보러 가기!](https://jaeseokim.github.io/Javascript/badge42-%EA%B0%9C%EB%B0%9C%EA%B8%B0_3_aka_42-readme-stats/)**

# 📌 badge42!

이번에 `ft_printf` 프로젝트를 진행을 하다 중간에 리프레쉬를 하는 기분으로 한번 이전에 손을 안대고 있던 typescript로 이전을 해보았다!

typescript로 이전을 하면서 기존에 있었던 오류 상황가 애니메이션에 대해서 새롭게 기능들을 추가를 했는데 그 부분에 대해서 자세히 설명을 해볼려고 한다!

## ♻️ Typescript로 이전!

이전 부터 작업을 하면서 불만 이였던 부분중 하나인 API 응답값을 가지고 SVG render를 하기 위해 데이터를 참조를 하다가 잘못된 데이터를 접근 하는 경우가 많았는데 이번에 Typescript로 type를 지정하여 이렇한 문제점이 없도록 하고자 이전을 하였다.

일단 이전을 하면서 크게 변경된 부분은 일단 현재는 필요가 없는 `next.js` 를 제거 하였고 velog.io의 백엔드로 사용이 되고 있다고 알려진 `Koa`에 관심을 가지게 되어서 Express에서 Koa로 이전을 하게 되었다.

이전 작업을 하면서 많은 실수들이 있었는데 처음 실수 한 부분은 vscode의 auto import 기능을 사용을 하여서 개발을 하다 보니 `node_module` 에 상대 경로로 접근하여 import 하는 것을 보지 못하여 tsc 빌드 후 왜 오류가 나는 거지 하면서 오류를 못찾고 실

## 🙈 마무리 하면서...

이번에 같은 42서울에서 공부하는 동료 뿐만 아니라 해외에서 공부하는 42 동료께 이슈를 받게 되어서 기분이 신기하고 뭔가 기쁘다.

하지만 한편으로는 아직 완성도가 매우 떨어져 있는 상황이라서 빨리 `ft_printf` 를 끝내고 `TypeScript` Code refactoring도 해보고 싶고 TDD도 적용을 해서 안정성 있는 서비스를 만들어 보고 싶다!
