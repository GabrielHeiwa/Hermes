import type { AxiosResponse } from 'axios';
import { api } from '../services/api';

interface meData {
  userId: string;
}

async function meRequest<T>(meData: meData): Promise<T> {
  try {
    const { data } = await api.post<unknown, AxiosResponse<T>>('/user/me', meData);
    return data;
  } catch (err: any) {
    const errMessage =
      err.message || err.response?.data.message || 'Houve um erro ao tentar realizar a consulta do usuário';

    console.error(errMessage);

    throw new Error(errMessage);
  }
}

export { meRequest };
