import { api } from '../services/api';

interface loginData {
  email: string;
  password: string;
}

async function loginRequest(loginData: loginData) {
  return await api.post('/login', loginData);
}

export { loginRequest };
