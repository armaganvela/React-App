import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { AppState } from '../../../config/store/types';
import { history } from '../../../config/router';
import {
	fetchSpeakersResult, getSpeakerResult, uploadFileResult
} from './actions';
import { ActionTypes, GetSpeakerAction, FetchSpeakersAction, UploadFileAction } from './types';
import {
	hideProgress,
	showProgress,
	showAlert,
} from '../../services/logic/actions';
import { getSpeakerApi, addSpeakerApi, updateSpeakerApi, fetchSpeakersApi } from './api';
import { uploadAttachmentApi } from '../../camps/logic/api';

function* fetchSpeakersSaga(action: FetchSpeakersAction) {
	try {
		yield put(showProgress(""));

		const { pageNumber } = action;
		const { firstName } = yield select((state: AppState) => state.speaker.searchCriteria);

		const response = yield call(fetchSpeakersApi, pageNumber, firstName);
		yield put(fetchSpeakersResult(false, response.items, response.totalCount));
	} catch (e) {
		yield put(fetchSpeakersResult(true));
	} finally {
		yield put(hideProgress());
	}
}

function* getSpeakerSaga(action: GetSpeakerAction) {
	try {
		yield put(showProgress(""));
		const { speakerId } = action;

		const response = yield call(getSpeakerApi, speakerId);
		yield put(getSpeakerResult(false, response));
	} catch (e) {
		yield put(getSpeakerResult(true));
	} finally {
		yield put(hideProgress());
	}
}

function* addSpeakerSaga() {
	try {
		yield put(showProgress(""));

		const {
			firstName,
			lastName,
			middleName,
			company,
			serverFileId
		} = yield select((state: AppState) => state.speaker.draftSpeaker);

		yield call(addSpeakerApi, firstName, lastName, middleName, company, serverFileId);
		yield put(showAlert('success', 'Operation is successfull', 'Operation is successfull'));
		history.push('/speakers');
	} catch (e) {
	} finally {
		yield put(hideProgress());
	}
}

function* updateSpeakerSaga() {
	try {
		yield put(showProgress(""));

		const {
			speakerId,
			firstName,
			lastName,
			middleName,
			company,
			serverFileId
		} = yield select((state: AppState) => state.speaker.draftSpeaker);

		yield call(updateSpeakerApi, speakerId, firstName, lastName, middleName, company, serverFileId);
		yield put(showAlert('success', 'Operation is successfull', 'Operation is successfull'));
		history.push('/speakers');
	} catch (e) {
	} finally {
		yield put(hideProgress());
	}
}

function* uploadFileSaga(action: UploadFileAction) {
	try {
		const { file } = action;

		if (!file)
			return;

		const response = yield call(uploadAttachmentApi, file!);

		yield put(uploadFileResult(false, response.data.attachmentId, response.data.attachmentTitle, response.data.attachmentContent));
	} catch (e) {
		yield put(uploadFileResult(true));
	} finally {
	}
}

export default [
	takeLatest(ActionTypes.fetch_speakers, fetchSpeakersSaga),
	takeLatest(ActionTypes.get_speaker, getSpeakerSaga),
	takeLatest(ActionTypes.add_speaker, addSpeakerSaga),
	takeLatest(ActionTypes.update_speaker, updateSpeakerSaga),
	takeLatest(ActionTypes.upload_draft_file, uploadFileSaga),
];


