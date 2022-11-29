import type { AxiosResponse } from 'axios';
import { api } from '../services/api';

interface registerData {
  email: string;
  password: string;
}

async function registerRequest<T>(registerData: registerData): Promise<T> {
  try {
    const { data } = await api.post<unknown, AxiosResponse<T>>('/user/register', registerData);
    return data;
  } catch (err: any) {
    const errMessage =
      err.message || err.response?.data.message || 'Houve um erro ao tentar realizar o registro do usuário';

    console.error(errMessage);

    throw new Error(errMessage);
  }
}

export { registerRequest };
