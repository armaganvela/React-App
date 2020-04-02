import { all } from 'redux-saga/effects';
import campsSaga from '../../processes/camps/logic/sagas';
import authSaga from '../../processes/auth/logic/sagas';

export default function* sagas() {
	yield all([...campsSaga, ...authSaga]);
}
