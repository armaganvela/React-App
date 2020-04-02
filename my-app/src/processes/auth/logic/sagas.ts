import { all, call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import { history } from '../../../config/router';

import { AppState, AppAction } from '../../../config/store/types';
import { ActionTypes } from './types';
import {
	login_api,
} from './api';
import {
	loginResult,
} from './actions';
import { changeAccessToken, changeIsLoggedIn } from '../../storage/actions';
import {
	clearAlert,
	hideProgress,
	navigate,
	showAlert,
	showProgress,
} from '../../../processes/services/logic/actions';

function* signInSaga() {
	try {
		const { name, password } = yield select((state: AppState) => state.auth);

		const response = yield call(login_api, name, password);
		const { access_token } = response.data;

		yield all([
			put(loginResult(false)),
			put(changeAccessToken(access_token)),
			put(changeIsLoggedIn(true)),
		]);

		history.push('/');
	} catch (e) {
		yield all([
			put(loginResult(true)),
		]);
		alert('Login is failed');
	} finally {
		yield put(hideProgress());
	}
}

function* logoutSaga() {
	yield put(navigate('Dashboard'));
}

export default [
	takeLatest(ActionTypes.login, signInSaga),
	takeLatest(ActionTypes.logout, logoutSaga),
];
