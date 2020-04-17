import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { AppState } from '../../../config/store/types';
import { history } from '../../../config/router';
import {
	fetchCountriesResult, getCountryResult
} from './action';
import { ActionTypes, GetCountryAction } from './types';
import {
	hideProgress,
	showProgress,
	showAlert,
} from '../../services/logic/actions';
import { getCountryApi, addCountryApi, updateCountryApi } from './api';
import { getCountriesApi } from '../../camps/logic/api';

function* fetchCountriesSaga() {
	try {
		yield put(showProgress(""));
		debugger;
		const response = yield call(getCountriesApi);
		yield put(fetchCountriesResult(false, response));
	} catch (e) {
		yield put(fetchCountriesResult(true));
	} finally {
		yield put(hideProgress());
	}
}

function* getCountrySaga(action: GetCountryAction) {
	try {
		yield put(showProgress(""));
		const { countryId } = action;

		const response = yield call(getCountryApi, countryId);
		yield put(getCountryResult(false, response));
	} catch (e) {
		yield put(getCountryResult(true));
	} finally {
		yield put(hideProgress());
	}
}

function* addCountrySaga() {
	try {
		yield put(showProgress(""));

		const { name } = yield select((state: AppState) => state.country.draftCountry);

		yield call(addCountryApi, name);
		yield put(showAlert('success', 'Operation is successfull', 'Operation is successfull'));
		history.push('/countries');
	} catch (e) {
	} finally {
		yield put(hideProgress());
	}
}

function* updateCountrySaga() {
	try {
		yield put(showProgress(""));

		const { id, name } = yield select((state: AppState) => state.country.draftCountry);

		yield call(updateCountryApi, id, name);
		yield put(showAlert('success', 'Operation is successfull', 'Operation is successfull'));
		history.push('/countries');
	} catch (e) {
	} finally {
		yield put(hideProgress());
	}
}

export default [
	takeLatest(ActionTypes.fetch_countries, fetchCountriesSaga),
	takeLatest(ActionTypes.get_country, getCountrySaga),
	takeLatest(ActionTypes.add_country, addCountrySaga),
	takeLatest(ActionTypes.update_country, updateCountrySaga),
];

