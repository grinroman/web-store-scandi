import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reducer from './reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './scss/index.scss';

const defaultOptions = {
   watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
   },
   query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
   },
};

const client = new ApolloClient({
   uri: `http://localhost:4000/`,
   cache: new InMemoryCache(),
   defaultOptions,
});

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <ApolloProvider client={client}>
            <App />
         </ApolloProvider>
      </Provider>
   </React.StrictMode>
);
