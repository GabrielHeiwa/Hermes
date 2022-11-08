import { split, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

function createApolloClient(token: string) {
  const httpLink = new HttpLink({
    uri: import.meta.env.VITE_APP_HASURA_HTTP_URL,
    headers: {
      // authorization: 'Bearer ' + token,
      'x-hasura-admin-secret': import.meta.env.VITE_APP_HASURA_ADMIN_SECRET,
    },
  });

  const wsLink = new WebSocketLink({
    uri: import.meta.env.VITE_APP_HASURA_WS_URL,
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          // authorization: 'Bearer ' + token,
          'x-hasura-admin-secret': import.meta.env.VITE_APP_HASURA_ADMIN_SECRET,
        },
      },
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  return client;
}

export { createApolloClient };
