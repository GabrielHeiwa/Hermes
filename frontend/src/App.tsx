import { UserProvider } from './contexts/user';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './services/hasura';
import AppRoutes from './routes';
import { Provider } from 'react-redux';
import store from './redux';
import { CookiesProvider, useCookies } from 'react-cookie';

function App() {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <Apollo>
          <UserProvider>
            <AppRoutes />
          </UserProvider>
        </Apollo>
      </CookiesProvider>
    </Provider>
  );
}

interface ApolloProps {
  children: React.ReactNode;
}

function Apollo({ children }: ApolloProps) {
  const [cookies] = useCookies(['accessToken', 'refreshToken']);
  const client = createApolloClient(cookies.accessToken);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default App;
