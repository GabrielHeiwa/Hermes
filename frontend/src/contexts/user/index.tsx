import { useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
// import { GET_USER_DATA } from "../../services/graphql/queries/user";

interface userProps {
  id: string;
  email: string;
  name: string;
}

interface userContextProps {
  user: userProps | undefined;
  isAuthenticated: () => boolean;
}

export const userContext = createContext({} as userContextProps);

interface userProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: userProviderProps) {
  // States
  const [user, setUser] = useState<userProps>();

  // GraphQL
  // const { data } = useQuery<{ users: userProps[] }>(GET_USER_DATA);

  // Functions
  function isAuthenticated() {
    if (user?.email) return true;

    return false;
  }

  // useEffect
  // useEffect(() => {
  //   if (data) {
  //     setUser(data.users[0])
  //   }
  // }, [data]);

  return (
    <userContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  const user = useContext(userContext);

  return { ...user };
}
