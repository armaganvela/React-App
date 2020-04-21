import { combineReducers } from 'redux';

import services from '../../processes/services/logic/reducers';
import camp from '../../processes/camps/logic/reducer';
import auth from '../../processes/auth/logic/reducer';
import storage from '../../processes/storage/reducer';
import talk from '../../processes/talks/logic/reducer';
import speaker from '../../processes/speakers/logic/reducers';
import country from '../../processes/country/logic/reducer';
import city from '../../processes/cities/logic/reducers';

export default combineReducers({
	services,
	camp,
	auth,
	storage,
	talk,
	speaker,
	country,
	city
});
