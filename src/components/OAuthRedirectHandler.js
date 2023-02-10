import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OAuthRedirectHandler() {
  let code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`api/code=${code}`);
        const token = res.headers.authorization;
        window.localStorage.setItem('token', token);
        navigate('/clubs');
      } catch (e) {
        console.error(e);
        navigate('/login');
      }
    })();
  }, []);
}

export default OAuthRedirectHandler;
