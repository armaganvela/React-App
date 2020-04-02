import { Action as ReduxAction } from 'redux';

import { ActionTypes as ServicesActionTypes, State as ServicesState } from '../../processes/services/logic/types';
import { ActionTypes as CampActionTypes, State as CampState } from '../../processes/camps/logic/types';
import { ActionTypes as AuthActionTypes, State as AuthState } from '../../processes/auth/logic/types';
import { ActionTypes as StorageActionTypes, State as StorageState } from '../../processes/storage/types';

export type AppActionTypes = ServicesActionTypes | CampActionTypes | AuthActionTypes | StorageActionTypes;

export interface AppState {
	services: ServicesState;
	camp: CampState;
	auth: AuthState;
	storage: StorageState;
}

export interface AppAction extends ReduxAction<AppActionTypes> {
	silent?: boolean;
}

export interface AppResultAction extends AppAction {
	hasError: boolean;
}
