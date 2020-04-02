import { ActionTypes, ChangeAccessTokenAction, ChangeIsLoggedInAction } from './types';
import { AppAction } from '../../config/store/types';

export const changeIsLoggedIn = (isLoggedIn: boolean): ChangeIsLoggedInAction => ({
	type: ActionTypes.change_is_logged_in,
	isLoggedIn,
});
export const changeAccessToken = (accessToken: string): ChangeAccessTokenAction => ({
	type: ActionTypes.change_access_token,
	accessToken,
});

export const clearAllStorage = (): AppAction => ({
	type: ActionTypes.clear_all_storage,
});
