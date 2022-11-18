const CLIENT_ID = "";
const REDIRECT_URI = "http://localhost:3000/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

//redirect경로는 백엔드와 동일해야함.
