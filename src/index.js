import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import theme from './theme.js';

const store = createStore((state, action) => {
  switch(action.type) {
    case "SET_PERCENTAGE":
      return {
        ...state,
        isPercentage: action.value,
      };
    default:
      return state;
  }
}, {
  isPercentage: JSON.parse(sessionStorage.getItem("percentage")) || false,
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
  const state = store.getState();
  sessionStorage.setItem("percentage",
    JSON.stringify(state.isPercentage, null, ''));
});

ReactDOM.render((
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
), document.getElementById('root'));
registerServiceWorker();
