# Node.js tutorial project

Node.js 를 공부하면서 샘플 테스트를 작성하기 위한 프로젝트이다. 간단한 웹 페이지 작성 및 필요한 기록들을 문서로 작성하여 관리할 예정이다.

## Environment

Node.js 홈페이지에 업로드 되어진 설치파일을 다운 받아 사용하면 된다. 샘플 코드를 작성할 때에는 최신버전인('22.04.22 기준) v18.0.0 을 사용하고 있다.

## How to use

샘플코드는 web2-nodejs 폴더에 추가되어 있다. Node.js Application 은 node 를 이용하여 js 를 실행하고 웹브라우저를 이용하여 localhost:\${port}/\${tutorial} 에 접속하여 확인하면 된다.

```shell
; server 실행
node web2-nodejs/server/helloworld.js

; 브라우저를 통해 client 실행
localhost:3000/server/main.js
```

## Sample codes

- [HelloWorld](web2-nodejs\helloworld\helloworld.js)
- [Default Server](web2-nodejs\server\main.js)

## References

- 생활코딩 Web1 HTML
- 생활코딩 Web2 Node.js
