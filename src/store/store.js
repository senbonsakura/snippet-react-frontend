import storage from 'redux-persist/es/storage';
import { applyMiddleware, createStore } from 'redux';
import { createFilter   } from 'redux-persist-transform-filter';
import { persistReducer, persistStore } from 'redux-persist'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import apiMiddleware from '../middleware';
import logger from 'redux-logger'




export default (history) => {
  const persistedFilter = createFilter(
    'auth', ['access', 'refresh']
  );

  const reducer = persistReducer(
    {
      key: 'snippets',
      storage: storage,
      whitelist: ['auth'],
      transforms: [persistedFilter],
    },
    rootReducer
  );

  const store = createStore(
    reducer, {},
    applyMiddleware(
      thunk,
      apiMiddleware,
      routerMiddleware(history),
      logger)
  );
  persistStore(store);
  return store
}
