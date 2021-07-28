import React from 'react';
import './App.scss';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { Router } from './components/Router';
import { environment, AppEnum } from './utils';
import { cache } from './cache';

const client = new ApolloClient({
  uri: environment.baseUrl,
  cache,
  headers: {
    authorization: localStorage.getItem(AppEnum.Token) || '',
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
};

export default App;
