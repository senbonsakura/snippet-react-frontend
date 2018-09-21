import storage from 'redux-persist/es/storage'
import { applyMiddleware, createStore, compose } from 'redux'
import { createFilter   } from 'redux-persist-transform-filter';
import { persistReducer, persistStore } from 'redux-persist'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers/index';
import apiMiddleware from '../middleware';
import logger from 'redux-logger'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



export default (history) => {
  const persistedFilter = createFilter(
    'auth', ['access', 'refresh']
  );

  const reducer = persistReducer(
    {
      key: 'snippets',
      storage: storage,
      whitelist: ['auth'],
      transforms: [persistedFilter]
    },
    rootReducer
  )

  const store = createStore(
    reducer, {},
    composeEnhancers(applyMiddleware(
      apiMiddleware,
      routerMiddleware(history),
      logger,))
  )
  persistStore(store);
  return store
}
