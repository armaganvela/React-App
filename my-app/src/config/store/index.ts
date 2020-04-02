import { applyMiddleware, createStore, Dispatch, Middleware } from 'redux';
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { AppAction, AppState } from './types';
import reducers from './reducers';
import sagas from './sagas';
import cookie from 'js-cookie';

const sagaMiddleware = createSagaMiddleware();
const middlewares: Middleware[] = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
	middlewares.push(
		createLogger({
			predicate: (_, action: AppAction) => action.silent !== true,
		}),
	);
	require('axios-response-logger');
}

const initialState = {
	storage: {
		accessToken: cookie.get('accessToken'),
		isLoggedIn: cookie.get('isLoggedIn') === 'true',
	},
};

//@ts-ignore
export const store = createStore(reducers, initialState, applyMiddleware(...middlewares));
sagaMiddleware.run(sagas);

export const useDispatch = (): Dispatch<AppAction> => useReduxDispatch();
export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;

store.subscribe(() => {
	cookie.set('accessToken', store.getState().storage.accessToken);
	cookie.set('isLoggedIn', store.getState().storage.isLoggedIn ? 'true' : 'false');
});