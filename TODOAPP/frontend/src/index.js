import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloProvider,createHttpLink,InMemoryCache,ApolloClient } from '@apollo/client';
import {setContext} from '@apollo/client/link/context'

const authLink = setContext((_,{headers})=>{
  const token = localStorage.getItem('noteApp-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}`: null
    }
  }
})

const httpLink = createHttpLink({
  uri:"http://localhost:4000/"
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <ApolloProvider client={client}>
    <App />
 </ApolloProvider>
);

