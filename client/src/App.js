import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import MovieList from './components/MovieList'
import AddMovie from './components/AddMovie'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <AddMovie/>
        <MovieList/>
      </div>
    </ApolloProvider>
  );
}

export default App;
