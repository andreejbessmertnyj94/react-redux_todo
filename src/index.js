import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
