import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { APP, REDUX_PERSIST } from '@config';
import $private from '@services/private';
import $public from '@services/public';
import reducers from './reducers';
import { Actions } from './modules/app';
import rootSagas from './sagas';

/**
 * Callback function to
 * initialize the app
 */
const initApp = dispatch => () => dispatch(Actions.init());

export default () => {
	const middleware = [];
	const enhancers = [];

	/**
	 * Setup sagas integrations with
	 * the redux implementation
	 */
	const sagaMiddleware = createSagaMiddleware();

	// Apply sagaMiddleware
	middleware.push(sagaMiddleware);

	// Apply all middlewares
	enhancers.push(applyMiddleware(...middleware));

	// Build the compose to be used
	const compose = composeWithDevTools({ name : APP.displayName, realtime : true });

	// Create app reducer
	const appReducer = persistCombineReducers(REDUX_PERSIST, reducers);

	// Create Store
	const store = createStore(appReducer, compose(...enhancers));

	// Create Persistor
	const persistor = persistStore(store, null, initApp(store.dispatch));

	/**
	 * Run rootSagas and inject
	 * the privateServices as a
	 * dependency along side the
	 * publicServices
	 */
	sagaMiddleware.run(rootSagas, { $private, $public });

	return { store, persistor };
};
