import { AppAction, AppResultAction } from '../../../config/store/types';
import { Country } from '../../camps/logic/types';

export enum ActionTypes {
    change_draft_name = 'country_change_draft_name',

    fetch_countries = 'country_fetch_countries',
    fetch_countries_result = 'country_fetch_countries_result',

    get_country = 'country_get_country',
    get_country_result = 'country_get_country_result',

    set_draft_country = 'country_set_draft_country',
    clear_draft_country = 'country_clear_draft_country',

    add_country = 'country_add_country',
    update_country = 'country_update_country',
}

export interface ChangeDraftNameAction extends AppAction {
    type: ActionTypes.change_draft_name,
    name: string;
}

export interface FetchCountriesResultAction extends AppResultAction {
    type: ActionTypes.fetch_countries_result;
    countries?: Country[];
}

export interface GetCountryAction extends AppAction {
    type: ActionTypes.get_country;
    countryId: string;
}

export interface GetCountryResultAction extends AppResultAction {
    type: ActionTypes.get_country_result;
    country?: Country;
}

export interface SetDraftCountryAction extends AppAction {
    type: ActionTypes.set_draft_country;
    country: Country;
}

export type Action =
    AppAction
    & ChangeDraftNameAction
    & GetCountryAction
    & GetCountryResultAction
    & SetDraftCountryAction
    & FetchCountriesResultAction;

export interface State {
    draftCountry: Country;
    countries: Country[];
}
