# mern stack deploy tutorial

MongoDB, Express, React, Node.js 를 이용하여 제작된 프로젝트를 배포하기 위한 샘플 프로젝트이다.

## Environment

client 와 server 간의 folder 를 추가하고 각각의 project 마다 package.json 을 이용하여 필요한 환경을 구성하였다. 추가적으로 deploy 를 위해 필요한 구성은 client, server 의 상위 folder 에서 별도의 package.json 을 이용하여 관리하고 있다. 

### Client setting

client 는 toolchaine(create-react-app) 을 이용하여 개발환경 셋팅을 진행한다. client 는 typescript 문법을 활용한 react 프로젝트로 개발을 진행하려고 한다.

```sh
# toolchain setting
npm create-react-app . --template typescript 

# service start
npm start
```

### server setting

typescript 는 compiler 에 의해 javascript 의 형태로 번역하는 작업이 필요하다. 이때 사용하는 compiler 는 전역 모듈로 지정하여 필요시 마다 typescript 파일을 번역하여 javascript 를 사용할 수 있도록 처리한다.

```sh
# init setting
npm init -y

# typescript compiler 설치
npm i -g typescript
npm i -g ts-node

# typescript 환경 셋팅 (tsconfig.json 생성)
tsc --init 

# express module install
npm i express

# express 는 js 로 이루어져 있기 때문에 types 를 추가해주어야 한다.
npm i --save-dev @types/express 

# typescript compile
tsc

# service start (compile 후 js 실행)
node app.js
# service start (compile 자동 후 js 실행)
ts-node app.ts
```

## deploy setting

배포 시스템을 설정하기 위해서는 필요한 기능을 순차적으로 실행하도록 설정해야 한다. client 와 server 를 순차적으로 실행 시킬 수 있도록 package.json 을 이용하여 script 를 작성 및 실행할 수 있도록 환경을 구성해야 한다. 

```sh
# init setting
npm init -y 

# scripts 에 deploy 에 필요한 기능 구현
# scripts 는 `&&` 를 이용하여 필요한 기능을 연결할 수 있다.
```