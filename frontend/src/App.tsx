import { UserProvider } from './contexts/user'
import { ApolloProvider } from '@apollo/client'
import { client } from './services/graphql/client'
import AppRoutes from "./routes";
import { Provider } from 'react-redux'
import store from './redux';

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
