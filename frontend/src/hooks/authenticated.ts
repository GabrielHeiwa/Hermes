import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function useAuthenticated() {
  // Hooks
  const [cookies, , removeCookie] = useCookies(['@hermes/accessToken', '@hermes/refreshToken']);

  let isAuthenticated = false;

  // Functions
  function logout() {
    removeCookie('@hermes/accessToken');
    removeCookie('@hermes/refreshToken');
    window.location.replace('/');

    return;
  }

  async function validateAccessToken() {
    try {
      await api.post('/access-token/validate-access-token', {
        headers: { authorization: 'Bearer ' + cookies['@hermes/accessToken'] },
      });
      isAuthenticated = true;
    } catch (err) {
      isAuthenticated = false;
    }
    return;
  }

  // UseEffects
  useEffect(() => {
    validateAccessToken();
  }, []);

  return {
    isAuthenticated,
    logout,
  };
}

export { useAuthenticated };
