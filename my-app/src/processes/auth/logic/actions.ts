import {
	ActionTypes,
	ChangeNameAction,
    ChangePasswordAction,
} from './types';

import { AppAction, AppResultAction } from '../../../config/store/types';

export const changeName = (name: string): ChangeNameAction => ({
	type: ActionTypes.change_name,
	name,
});
export const changePassword = (password: string): ChangePasswordAction => ({
	type: ActionTypes.change_password,
	password,
});


export const login = (): AppAction => ({
	type: ActionTypes.login,
});

export const logout = (): AppAction => ({
	type: ActionTypes.logout,
});

export const loginResult = (hasError: boolean): AppResultAction => ({
	type: ActionTypes.login_result,
	hasError,
});
