import { UserProvider } from "./contexts/user";
import { ApolloProvider } from "@apollo/client";
import { client } from "./services/graphql/client";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
