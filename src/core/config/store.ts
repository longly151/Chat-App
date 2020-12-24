/* eslint-disable no-undef */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';
import rootReducer from './reducers';
import rootSaga from './sagas';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['config', 'auth', 'product', 'event'],
};

const composeEnhancers = compose;

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
if (__DEV__ && Platform.OS === 'ios') {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
