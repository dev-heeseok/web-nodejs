# Node.js tutorial project

Node.js 를 공부하면서 샘플 테스트를 작성하기 위한 프로젝트이다. 간단한 웹 페이지 작성 및 필요한 기록들을 문서로 작성하여 관리할 예정이다.

## Language

JavaScript, HTML, CSS, jQuery, Node.js

## Environment

Node.js 홈페이지에 업로드 되어진 설치파일을 다운 받아 사용하면 된다. 샘플 코드를 작성할 때에는 최신버전인('22.04.22 기준) v18.0.0 을 사용하고 있다.

### module 설치

[Express](https://expressjs.com/) 홈페이지에 Getting started 를 참고하여 Express 모듈을 설치하려고 한다. 

```sh
# express module 설치
npm install express

# 수정사항을 즉시 반영하기 위해 pm2 모듈을 사용한다.
npm install -g pm2

# pm2 를 이용하여 main.js 수정사항 모니터링
pm2 start main.js --watch
```

## How to use

샘플코드는 tutorial 폴더에 추가되어 있다. Node.js Application 은 node 를 이용하여 js 를 실행하고 웹브라우저를 이용하여 localhost:\${port}/\${tutorial} 에 접속하여 확인하면 된다.

```sh
# server 실행
node web2-nodejs/server/main.js

# 브라우저를 통해 client 실행
localhost:3000/server/main.js
```

## Sample codes

- [HelloWorld](tutorial\helloworld\helloworld.js)
- [Default Server](tutorial\server\main.js)
- [Query String](tutorial\querystring\main.js)

### Syntax

- [File System](tutorial\syntax\filesystem.js)

## References

- 생활코딩 Web1 HTML
- 생활코딩 Web2 Node.js
