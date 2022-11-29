import { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { meRequest } from '../../requests/meRequest';
// import { GET_USER_DATA } from "../../services/graphql/queries/user";

interface userProps {
  id: string;
  email: string;
  name: string;
}

interface userContextProps {
  user: userProps | undefined;
  isAuthenticated: () => Promise<boolean>;
  logout: () => void;
}

export const userContext = createContext({} as userContextProps);

interface userProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: userProviderProps) {
  // States
  const [user] = useState<userProps>();

  // Hooks
  const [cookies, , removeCookie] = useCookies(['@hermes/userId']);

  // GraphQL
  // const { data } = useQuery<{ users: userProps[] }>(GET_USER_DATA);

  // Functions
  async function isAuthenticated() {
    try {
      const userId = cookies['@hermes/userId'];
      if (!userId) throw new Error('User id cookie not found');

      await meRequest({ userId });
      console.log(cookies);
      return true;
    } catch (error: any) {
      console.error(error);
      toast.error('Usuário não autenticado');
      removeCookie('@hermes/userId');
      window.location.replace('/');

      return false;
    }
  }

  function logout() {
    removeCookie('@hermes/userId');
    window.location.replace('/login');
  }

  return <userContext.Provider value={{ user, isAuthenticated, logout }}>{children}</userContext.Provider>;
}

export function useUser() {
  const user = useContext(userContext);

  return { ...user };
}
