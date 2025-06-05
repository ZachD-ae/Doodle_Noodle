import React from 'react';
import {  Outlet } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import ProtectedRoutes from './components/ProtectedRoutes';

import { Navbar } from 'react-bootstrap';

const httpLink = createHttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      {/* {Auth.loggedIn() ? <ProtectedRoutes /> : <Outlet />} */}
      <Outlet />
    </ApolloProvider>
  );
};

export default App;
