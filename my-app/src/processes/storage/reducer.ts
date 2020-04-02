import { Action, ActionTypes, State } from './types';

const initialState: State = {
	isLoggedIn: false,
	accessToken: '',
};

export default (state: State = initialState, action: Action) => {
	switch (action.type) {
		case ActionTypes.change_is_logged_in:
			return { ...state, isLoggedIn: action.isLoggedIn };
		case ActionTypes.change_access_token:
			return { ...state, accessToken: action.accessToken };
		case ActionTypes.clear_all_storage:
			return { ...initialState };
		default:
			return state;
	}
};
