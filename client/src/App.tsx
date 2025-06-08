import React, { createContext, useContext, useState, useEffect } from 'react';
import {  Outlet } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { useQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GET_DAILY_PROMPT, GET_USER_DATA } from './utils/queries';

import { UserData } from './models/userData';

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
type UserContextType = {
  user: UserData;
  setUser: (user:UserData) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {}
})

export const useUser = () => useContext(UserContext)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [user, setUser] = useState<UserData>(null)
  const { data } = useQuery(GET_USER_DATA);

  useEffect(() => {
    if (data && data.getUserData) {
      setUser(data.getUserData);
    }
  }, [data]);

  return (
    <UserContext.Provider value={({user,setUser})}>
      {children}
    </UserContext.Provider>
  )
}

type PromptContextType = {
  prompt: string;
  setPrompt: (prompt: string) => void;
};

const PromptContext = createContext<PromptContextType>({
  prompt: '',
  setPrompt: () => { },
});

export const usePrompt = () => useContext(PromptContext);

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prompt, setPrompt] = useState('');
  const { data, loading } = useQuery(GET_DAILY_PROMPT);

  useEffect(() => {
    if (!loading && data && data.dailyPrompt && data.dailyPrompt.prompt) {
      setPrompt(data.dailyPrompt.prompt.text);
    }
  }, [loading, data]);
  return (
    <PromptContext.Provider value={{ prompt, setPrompt }}>
      {children}
    </PromptContext.Provider>
  );
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
      <PromptProvider>
      <Navbar />
      {/* {Auth.loggedIn() ? <ProtectedRoutes /> : <Outlet />} */}
      <Outlet />
      </PromptProvider>
      </UserProvider>
    </ApolloProvider>
  );
};

export default App;
