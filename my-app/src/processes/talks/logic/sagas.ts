import { call, put, takeLatest, select } from 'redux-saga/effects';
import { history } from '../../../config/router';
import {
	getTalksByCampResult,
	getAllSpeakersResult,
	setDraftTalk,
	getAllCampsResult,
	deleteTalkResult,
	changeSearchCamp,
} from './actions';
import { ActionTypes, GetTalksByCampAction, GetTalkAction, DeleteTalkAction } from './types';
import { getTalksByCampApi, getAllSpeakersApi, getTalkApi, getAllCampsApi, addTalkApi, updateTalkApi, deleteTalkApi } from './api';
import {
	hideProgress,
	showProgress,
	showAlert,
	showHttpErrorAlert,
	openDeleteModal,
} from '../../services/logic/actions';
import { AppState } from '../../../config/store/types';
import { Camp } from '../../camps/logic/types';

function* getTalksByCamp(action: GetTalksByCampAction) {
	try {
		yield put(showProgress(""));

        const { pageNumber } = action;
		const { camp } = yield select((state: AppState) => state.talk.searchCriteria);

		const response = yield call(getTalksByCampApi, pageNumber, camp);

		yield put(getTalksByCampResult(false, response.items, response.totalCount));
	} catch (e) {
		yield (put(showHttpErrorAlert(e)));
		yield put(getTalksByCampResult(true));
	} finally {
		yield put(hideProgress());
	}
}

function* getAllSpeakersSaga() {
	try {
		yield put(showProgress(""));

		const response = yield call(getAllSpeakersApi);

		yield put(getAllSpeakersResult(false, response));
	} catch (e) {
		yield (put(showHttpErrorAlert(e)));
		yield put(getAllSpeakersResult(true));
	} finally {
		yield put(hideProgress());
	}
}

function* getAllCampsSaga() {
	try {
		yield put(showProgress(""));

		const response = yield call(getAllCampsApi);

		yield put(getAllCampsResult(false, response));
	} catch (e) {
		yield (put(showHttpErrorAlert(e)));
		yield put(getAllCampsResult(true));
	} finally {
		yield put(hideProgress());
	}
}

function* getTalkSaga(action: GetTalkAction) {
	try {
		yield put(showProgress(""));
		const { talkId } = action;

		const response = yield call(getTalkApi, talkId);
		yield put(setDraftTalk(response));
	} catch (e) {
		yield (put(showHttpErrorAlert(e)));
	} finally {
		yield put(hideProgress());
	}
}


function* addTalkSaga() {
	try {
		yield put(showProgress(""));

		const { speaker, title, abstract, camp } = yield select((state: AppState) => state.talk.draftTalk);

		yield call(addTalkApi, speaker.speakerId, camp.id, title, abstract);
		yield put(showAlert('success', 'Operation is successfull', 'Operation is successfull'));
		history.push('/talks');
	} catch (e) {
		yield (put(showHttpErrorAlert(e)));
	} finally {
		yield put(hideProgress());
	}
}

function* updateTalkSaga() {
	try {
		yield put(showProgress(""));

		const { talkId, speaker, title, abstract, camp } = yield select((state: AppState) => state.talk.draftTalk);

		yield call(updateTalkApi, talkId, speaker.speakerId, camp.id, title, abstract);
		yield put(showAlert('success', 'Operation is successfull', 'Operation is successfull'));
		history.push('/talks');
	} catch (e) {
		yield (put(showHttpErrorAlert(e)));
	} finally {
		yield put(hideProgress());
	}
}

function* deleteTalkSaga(action: DeleteTalkAction) {
	try {
		yield put(showProgress(""));

		const { talkId } = action;
		yield call(deleteTalkApi, talkId);
		yield put(showAlert('success', 'Operation is successfull', 'Operation is successfull'));
		yield put(deleteTalkResult(false, talkId));
		yield put(openDeleteModal(false));
	} catch (e) {
		yield (put(showHttpErrorAlert(e)));
		yield put(deleteTalkResult(true));
	} finally {
		yield put(hideProgress());
	}
}

export default [
	takeLatest(ActionTypes.get_talks_by_camp, getTalksByCamp),
	takeLatest(ActionTypes.get_talk, getTalkSaga),
	takeLatest(ActionTypes.add_talk, addTalkSaga),
	takeLatest(ActionTypes.update_talk, updateTalkSaga),
	takeLatest(ActionTypes.delete_talk, deleteTalkSaga),
	takeLatest(ActionTypes.get_all_speakers, getAllSpeakersSaga),
	takeLatest(ActionTypes.get_all_camps, getAllCampsSaga),
];

