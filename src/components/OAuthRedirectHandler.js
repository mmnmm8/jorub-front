import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OAuthRedirectHandler() {
  let code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api?code=${code}`);
        const token = res.headers.authorization;
        window.localStorage.setItem('token', token);
        navigate('/clubs');
      } catch (e) {
        console.log('소셜로그인 에러', e);
        window.alert('로그인에 실패하였습니다');
        navigate('/login');
      }
    })();
  }, []);
}

export default OAuthRedirectHandler;
