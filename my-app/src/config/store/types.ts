import { Action as ReduxAction } from 'redux';

import { ActionTypes as ServicesActionTypes, State as ServicesState } from '../../processes/services/logic/types';
import { ActionTypes as CampActionTypes, State as CampState } from '../../processes/camps/logic/types';
import { ActionTypes as AuthActionTypes, State as AuthState } from '../../processes/auth/logic/types';
import { ActionTypes as StorageActionTypes, State as StorageState } from '../../processes/storage/types';
import { ActionTypes as TalkActionTypes, State as TalkState } from '../../processes/talks/logic/types';
import { ActionTypes as SpeakerActionTypes, State as SpeakerState } from '../../processes/speakers/logic/types';
import { ActionTypes as CountryActionTypes, State as CountryState } from '../../processes/country/logic/types';
import { ActionTypes as CityActionTypes, State as CityState } from '../../processes/cities/logic/types';

export type AppActionTypes = ServicesActionTypes | CampActionTypes | AuthActionTypes | StorageActionTypes | TalkActionTypes | SpeakerActionTypes | CountryActionTypes | CityActionTypes;

export interface AppState {
	services: ServicesState;
	camp: CampState;
	auth: AuthState;
	storage: StorageState;
	talk: TalkState;
	speaker: SpeakerState;
	country: CountryState;
	city: CityState;
}

export interface AppAction extends ReduxAction<AppActionTypes> {
	silent?: boolean;
}

export interface AppResultAction extends AppAction {
	hasError: boolean;
}
