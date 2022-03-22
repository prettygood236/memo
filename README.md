# memo-app
drama&amp;company assignment

## 설명
- 본 프로젝트는 DRAMA & COMPANY 웹 개발자 직무 지원 과제로 간단한 메모장 프로그램

## 개발 환경
- 해당 프로젝트는 NodeJS 16.13.1 버전에서 개발

## 사용 라이브러리 및 프레임워크
- react, axios, redux, material-ui, moment

## 설치
1. 실행을 위해선 https://github.com/dramancompany/memoapp-api-v2 의 서버가 반드시 필요
2. memoapp-api-v2 실행
3. npm 을 사용하여 dependency 설치 후 프로그램 시작
``` npm
npm install
npm start
```

## 프로젝트 디렉토리 구조
* [src](./memo-app/src) : source directory
  * [components](./memo-app/src/components) : 공통 컴포넌트 디렉토리
  * [pages/memo](./memo-app/src/pages/memo) : 각 페이지별 디렉토리
  * [state](./memo-app/src/state) : 상태관리를 위한 디렉토리
  
## 개선사항
- useMemo 를 이용한 페이지 최적화
