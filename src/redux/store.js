/* 
	该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

//引入createStore，专门用于创建redux中最为核心的store对象
import {createStore,applyMiddleware} from 'redux'
//引入汇总之后的reducer
import reducer from './reducers'
//引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
//引入redux-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension'


import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
	key: 'root',
	storage: storage,
  }


const myPersistReducer = persistReducer(persistConfig, reducer)
const store = createStore(myPersistReducer, composeWithDevTools(applyMiddleware(thunk)))
export const persistor = persistStore(store)
export default store

/*
const persistedReducer = persistReducer(persistConfig, reducer)
export default () => {
	let store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(thunk)))
	let persistor = persistStore(store)
	return { store, persistor }
  }
*/
//暴露store 
//export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))