import { all } from 'redux-saga/effects';
import campsSaga from '../../processes/camps/logic/sagas';
import authSaga from '../../processes/auth/logic/sagas';
import talkSaga from '../../processes/talks/logic/sagas';
import speakerSaga from '../../processes/speakers/logic/sagas';
import countrySaga from '../../processes/country/logic/sagas';

export default function* sagas() {
	yield all([...campsSaga, ...authSaga, ...talkSaga, ...speakerSaga, ...countrySaga]);
}
