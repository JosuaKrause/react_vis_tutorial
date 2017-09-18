import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import theme from './theme.js';
import { getReducer, getDefault, fromStorage, toStorage } from './util.js';

const store = createStore(getReducer(), {
  isPercentage: getDefault(fromStorage("percentage"), false),
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
  const state = store.getState();
  toStorage("percentage", state.isPercentage);
});

ReactDOM.render((
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
), document.getElementById('root'));
registerServiceWorker();
