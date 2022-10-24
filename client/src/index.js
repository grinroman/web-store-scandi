import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reducer from './reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './scss/index.scss';
const client = new ApolloClient({
   uri: `http://localhost:4000/`,
   cache: new InMemoryCache(),
});

const store = createStore(
   reducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
