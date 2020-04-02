import { AppAction, AppResultAction } from '../../../config/store/types';

export enum ActionTypes {
	change_name = 'AUTH__CHANGE_NAME',
	change_password = 'AUTH__CHANGE_PASSWORD',

	login = 'AUTH__LOGIN',
	login_result = 'AUTH__LOGIN_RESULT',
	logout = 'AUTH__LOGOUT',
}

export interface ChangePasswordAction extends AppAction {
	type: ActionTypes.change_password;
	password: string;
}

export interface ChangeNameAction extends AppAction {
	type: ActionTypes.change_name;
	name: string;
}

export type Action =
	AppAction
    & AppResultAction
    & ChangeNameAction
    & ChangePasswordAction;
    
export interface State {
	name: string;
	password: string;
}
