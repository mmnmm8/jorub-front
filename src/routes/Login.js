import { Link } from 'react-router-dom';
import { KAKAO_AUTH_URL } from '../OAuth';

function Login() {
  console.log(KAKAO_AUTH_URL);
  return (
    <div>
      <h1>Log In</h1>
      <Link to={KAKAO_AUTH_URL}>
        <button>카카오로 로그인하기</button>
      </Link>
    </div>
  );
}

export default Login;
