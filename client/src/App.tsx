import React from 'react';
import './App.scss';
import { ApolloProvider, ApolloClient, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { Router } from './components/Router';
import { environment, AppEnum } from './utils';
import { cache } from './cache';

const wsLink = new WebSocketLink({
  uri: environment.webSocketUrl,
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: environment.baseUrl,
  headers: {
    authorization: localStorage.getItem(AppEnum.Token) || '',
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
};

export default App;
