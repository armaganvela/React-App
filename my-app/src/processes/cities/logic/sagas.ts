import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { AppState } from '../../../config/store/types';
import { history } from '../../../config/router';
import {
	fetchCitiesResult, getCityResult, fetchCountriesResult, deleteCityResult
} from './actions';
import { ActionTypes, GetCityAction, FetchCitiesAction, DeleteCityAction } from './types';
import {
	hideProgress,
	showProgress,
	showAlert,
	openDeleteModal,
	showHttpErrorAlert,
} from '../../services/logic/actions';
import { addCityApi, updateCityApi, fetchCitiesApi, getCityApi, deleteCityApi } from './apis';
import { getCountriesApi } from '../../camps/logic/api';

function* fetchCitiesSaga(action: FetchCitiesAction) {
	try {
		yield put(showProgress(""));
        const { pageNumber } = action;
		const { country } = yield select((state: AppState) => state.city.searchCriteria);

		const response = yield call(fetchCitiesApi, pageNumber, country ? country.id : undefined);
		yield put(fetchCitiesResult(false, response.items, response.totalCount));
	} catch (e) {
		yield (put(showHttpErrorAlert(e)));
		yield put(fetchCitiesResult(true));
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
		yield (put(showHttpErrorAlert(e)));
		yield put(fetchCountriesResult(true));
	} finally {
		yield put(hideProgress());
	}
}

function* getCitySaga(action: GetCityAction) {
	try {
		yield put(showProgress(""));
		const { cityId } = action;

		const response = yield call(getCityApi, cityId);
		yield put(getCityResult(false, response));
	} catch (e) {
		yield (put(showHttpErrorAlert(e)));
		yield put(getCityResult(true));
	} finally {
		yield put(hideProgress());
	}
}

function* addCitySaga() {
	try {
		yield put(showProgress(""));

		const { name, country } = yield select((state: AppState) => state.city.draftCity);

		yield call(addCityApi, name, country.id);
		yield put(showAlert('success', 'Operation is successfull', 'Operation is successfull'));
		history.push('/cities');
	} catch (e) {
		yield (put(showHttpErrorAlert(e)));		yield (put(showHttpErrorAlert(e)));

	} finally {
		yield put(hideProgress());
	}
}

function* updateCitySaga() {
	try {
		yield put(showProgress(""));

		const { id, name, country } = yield select((state: AppState) => state.city.draftCity);

		yield call(updateCityApi, id, name, country.id);
		yield put(showAlert('success', 'Operation is successfull', 'Operation is successfull'));
		history.push('/cities');
	} catch (e) {
		yield (put(showHttpErrorAlert(e)));
	} finally {
		yield put(hideProgress());
	}
}

function* deleteCitySaga(action: DeleteCityAction) {
	try {
		yield put(showProgress(""));
        const { cityId } = action;

		yield call(deleteCityApi, cityId);
		yield put(deleteCityResult(false, cityId));
		yield put(showAlert('success', 'Operation is successfull', 'Operation is successfull'));
		yield put(openDeleteModal(false));
	} catch (e) {
		yield (put(showHttpErrorAlert(e)));
		yield put(deleteCityResult(true));
	} finally {
		yield put(hideProgress());
	}
}

export default [
    takeLatest(ActionTypes.fetch_cities, fetchCitiesSaga),
    takeLatest(ActionTypes.fetch_countries, fetchCountriesSaga),
	takeLatest(ActionTypes.get_city, getCitySaga),
	takeLatest(ActionTypes.add_city, addCitySaga),
	takeLatest(ActionTypes.update_city, updateCitySaga),
	takeLatest(ActionTypes.delete_city, deleteCitySaga),
];

