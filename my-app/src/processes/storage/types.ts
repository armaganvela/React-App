import { AppAction, AppResultAction } from '../../config/store/types';

export enum ActionTypes {
	change_is_logged_in = 'STORAGE__CHANGE_IS_LOGGED_IN',
	change_access_token = 'STORAGE__CHANGE_ACCESS_TOKEN',
	clear_all_storage = 'STORAGE__CLEAR_ALL_STORAGE'
}

export interface ChangeIsLoggedInAction extends AppAction {
	type: ActionTypes.change_is_logged_in,
	isLoggedIn: boolean
}

export interface ChangeAccessTokenAction extends AppAction {
	type: ActionTypes.change_access_token,
	accessToken: string,
}

export type Action =
	& ChangeIsLoggedInAction
    & ChangeAccessTokenAction;
    
export interface State {
	isLoggedIn: boolean;
	accessToken: string;
}
