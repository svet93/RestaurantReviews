import React from 'react';
import reduxThunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import Cookies from 'universal-cookie';
import { Provider } from 'react-redux';
import App from './App';
import reducers from './reducers';
import axios from './utils/axios';
import { API_URL } from './constants';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(reduxThunk)));

const persistor = persistStore(store);

const cookies = new Cookies();

if (!cookies.get('token')) {
  persistor.purge();
}

let lastInteraction = Date.now().valueOf();
const maxDifference = 60000;

// interval that checks if token exists and if it does, refreshes it
setInterval(async () => {
  const currentTimestamp = Date.now().valueOf();
  if (currentTimestamp - lastInteraction < maxDifference) {
    const currentToken = cookies.get('token');
    if (currentToken) {
      const url = `${API_URL}/account/refreshToken`;
      try {
        const res = await axios.post(url);
        const { token } = res.data;
        if (token) {
          cookies.remove('token', { path: '/' });
          cookies.set('token', token, {
            path: '/',
            expires: new Date(Date.now() + 14400000), // 4hours
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
}, 1000 * 58);

const handleInteraction = () => {
  lastInteraction = Date.now().valueOf();
};

// Index should only get called once upon loading the script and
// events should be deleted on page refresh so we should not suffer memory leaks
window.addEventListener('keyup', handleInteraction);
window.addEventListener('mousemove', handleInteraction);
window.addEventListener('click', handleInteraction);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
