# Magazine Frontend

- 서버 코드 테스트를 위해 간단하게 프론트 부분을 구현해보았습니다.

## 테스트 내용

- 사용자 인증(회원가입, 로그인, 인증 상태 유지)
- 게시물 조회, 작성, 수정, 삭제
- 게시물 좋아요 기능
- 게시물 댓글 조회, 작성, 수정, 삭제
- 서버 측 미들웨어 예외 처리

## 협의 사항

- [[Issue #1] 좋아요 개수 처리 및 로그아웃 기능 회의](https://github.com/PBL-magazine/frontend-choewy/issues/1)

## 프론트엔드 분들께 전달할 내용

- 서버로 API 요청을 보내는 부분은 `/actions` 안의 파일을 참고하시면 좋을 것 같습니다.
- 서버로 API를 요청할 때 쿠키의 토큰 정보를 Header에 담아서 전달하는 부분은 `utils/Axios.js` 파일을 참고하시면 좋을 것 같습니다.
- 이미지 미리보기 기능은 `components/PostWritePage.js`, 이미지 파일을 서버로 전송하는 부분은 `actions/PostActions.js`를 참고하시면 좋을 것 같습니다.
- Redux를 사용하는 경우 데이터 변경 시 페이지를 새로고침 하지 않아도 되나, 현재 제가 구현한 프로젝트에서는 페이지를 새로고침하도록 하였으니(`Redux 미사용`), 이 부분을 참고해주시기 바랍니다.

## 직접 실행하는 방법

먼저, `npm`과 `node` 버전을 확인하세요.

- `npm @8.6.0`
- `node @v16.14.2`

### Git Clone

```
$ git clone https://github.com/PBL-magazine/frontend-choewy.git
```

### npm install

```
$ cd frontend-choewy
$ npm install
```

### package.json

```json
{
  "proxy": "자신의 로컬 서버 주소를 넣으세요"
}
```

### Run

```
$ npm start
```
