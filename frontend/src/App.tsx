import { UserProvider } from './contexts/user'
import { ApolloProvider } from '@apollo/client'
import { client } from './services/graphql/client'
import AppRoutes from "./routes";
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux'

function App() {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
  })

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
