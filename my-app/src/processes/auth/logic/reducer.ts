import { Reducer } from 'redux';
import { Action, ActionTypes, State } from './types';

const initialState: State = {
	name: '',
	password: '',
};

const auth: Reducer<State, Action> = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.change_name:
			return {
				...state,
				name: action.name,
			};
		case ActionTypes.change_password:
			return {
				...state,
				password: action.password,
			};

		case ActionTypes.login_result:
			return {
				...state,
				loggingIn: false,
				credentialsValid: action.hasError,
			};

		default:
			return state;
	}
};

export default auth;
