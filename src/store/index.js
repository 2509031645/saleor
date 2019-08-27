/*
*   fileName:
*   author: 宋均辉
*   time: 2019/8/19
*/

import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';

// 引入中间件
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware)
);



const store  =  createStore( reducer, enhancer );

sagaMiddleware.run(rootSaga);

export default store;