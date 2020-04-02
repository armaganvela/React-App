import { combineReducers } from 'redux';

import services from '../../processes/services/logic/reducers';
import camp from '../../processes/camps/logic/reducer';
import auth from '../../processes/auth/logic/reducer';
import storage from '../../processes/storage/reducer';

export default combineReducers({
	services,
	camp,
	auth,
	storage
});
