import type { AxiosResponse } from 'axios';
import { api } from '../services/api';

interface loginData {
  email: string;
  password: string;
}

async function loginRequest<T>(loginData: loginData): Promise<T> {
  try {
    const { data } = await api.post<unknown, AxiosResponse<T>>('/user/login', loginData);
    return data;
  } catch (err: any) {
    const errMessage =
      err.message || err.response?.data.message || 'Houve um erro ao tentar realizar o login do usuário';

    console.error(errMessage);

    throw new Error(errMessage);
  }
}

export { loginRequest };
