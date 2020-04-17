import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { AppState } from '../../../config/store/types';
import { history } from '../../../config/router';
import {
	fetchCampsResult,
	setDraftCamp,
	deleteCampResult,
	fetchCountriesResult,
} from './actions';
import { ActionTypes, GetCampAction, DeleteCampAction } from './types';
import { getCampsApi, getCampApi, addCampApi, updateCampApi, deleteCampApi, getCountriesApi } from './api';
import {
	hideProgress,
	showProgress,
	showAlert,
	showHttpErrorAlert,
	openDeleteModal,
} from '../../services/logic/actions';

function* fetchCampsSaga() {
	try {
		yield put(showProgress(""));

		const { pageNumber } = yield select((state: AppState) => state.camp);
		const { eventDate } = yield select((state: AppState) => state.camp.searchCriteria);

		const response = yield call(getCampsApi, pageNumber, eventDate);
		yield put(fetchCampsResult(false, response.items, response.totalCount));
	} catch (e) {
		yield put(fetchCampsResult(true));
	} finally {
		yield put(hideProgress());
	}
}

function* addCampSaga() {
	try {
		const { name, moniker, eventDate, country } = yield select((state: AppState) => state.camp.draftCamp);

		yield call(addCampApi, name, moniker, eventDate, country);
		yield put(showAlert('success', 'Operation is successfull', 'Operation is successfull'));
		history.push('/');
	} catch (e) {
		yield (put(showHttpErrorAlert(e)));
	} 
}


function* updateCampSaga() {
	try {
		const { id, name, moniker, eventDate, country } = yield select((state: AppState) => state.camp.draftCamp);

		yield call(updateCampApi, id, name, moniker, eventDate, country);
		yield put(showAlert('success', 'Operation is successfull', 'Operation is successfull'));
		history.push('/');
	} catch (e) {
		yield (put(showHttpErrorAlert(e)));
	}
}


function* getCampSaga(action: GetCampAction) {
	try {
		yield put(showProgress(""));

		const { campId } = action;

		const response = yield call(getCampApi, campId);
		yield put(setDraftCamp(response));
	} catch (e) {
		yield (put(showHttpErrorAlert(e)));
	} finally {
		yield put(hideProgress());
	}
}

function* deleteCampSaga(action: DeleteCampAction) {
	try {
		yield put(showProgress(""));

		const { campId } = action;

		yield call(deleteCampApi, campId);
		yield put(deleteCampResult(false, campId));
		yield put(showAlert('success', 'Operation is successfull', 'Operation is successfull'));
		yield put(openDeleteModal(false));
	} catch (e) {
		yield (put(showHttpErrorAlert(e)));
		yield put(deleteCampResult(true));
	} finally {
		yield put(hideProgress());
	}
}

function* fetchCountriesSaga() {
	try {
		yield put(showProgress(""));
		const response = yield call(getCountriesApi);
		yield put(fetchCountriesResult(false, response));
	} catch (e) {
		yield put(fetchCountriesResult(true));
	} finally {
		yield put(hideProgress());
	}
}

export default [
	takeLatest(ActionTypes.fetch_camps, fetchCampsSaga),
	takeLatest(ActionTypes.fetch_countries, fetchCountriesSaga),
	takeLatest(ActionTypes.get_camp, getCampSaga),
	takeLatest(ActionTypes.add_camp, addCampSaga),
	takeLatest(ActionTypes.update_camp, updateCampSaga),
	takeLatest(ActionTypes.delete_camp, deleteCampSaga),
];

