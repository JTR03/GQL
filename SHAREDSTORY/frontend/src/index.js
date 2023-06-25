import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom"

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("sharedStory-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:5005/",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router> 
  </ApolloProvider>
);
