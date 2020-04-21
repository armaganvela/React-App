import { AppAction, AppResultAction } from '../../../config/store/types';
import { Country, City } from '../../camps/logic/types';

export enum ActionTypes {
    change_draft_name = 'city_change_draft_name',
    change_draft_country = 'city_change_draft_country',
    change_search_criteria_country = 'city_change_search_criteria_country',

    fetch_cities = 'city_fetch_cities',
    fetch_cities_result = 'city_fetch_cities_result',

    fetch_countries = 'city_fetch_countries',
    fetch_countries_result = 'city_fetch_countries_result',

    get_city = 'city_get_city',
    get_city_result = 'city_get_city_result',

    delete_city = 'city_delete_city',
    delete_city_result = 'city_delete_city_result',

    set_draft_city = 'city_set_draft_city',
    clear_draft_city = 'city_clear_draft_city',

    add_city = 'city_add_city',
    update_city = 'city_update_city',
}

export interface ChangeDraftNameAction extends AppAction {
    type: ActionTypes.change_draft_name,
    name: string;
}

export interface ChangeDraftCountryAction extends AppAction {
    type: ActionTypes.change_draft_country,
    country?: Country;
}

export interface ChangeSearchCriteriaCountryAction extends AppAction {
    type: ActionTypes.change_search_criteria_country,
    country?: Country;
}

export interface FetchCountriesResultAction extends AppResultAction {
    type: ActionTypes.fetch_countries_result;
    countries?: Country[];
}

export interface FetchCitiesAction extends AppAction {
    type: ActionTypes.fetch_cities;
    pageNumber: number;
}

export interface FetchCitiesResultAction extends AppResultAction {
    type: ActionTypes.fetch_cities_result;
    cities?: City[];
    totalCount?: number;
}

export interface DeleteCityAction extends AppAction {
    type: ActionTypes.delete_city;
    cityId: string;
}

export interface DeleteCityResultAction extends AppResultAction {
    type: ActionTypes.delete_city_result;
    cityId?: string;
}

export interface GetCityAction extends AppAction {
    type: ActionTypes.get_city;
    cityId: string;
}

export interface GetCityResultAction extends AppResultAction {
    type: ActionTypes.get_city_result;
    city?: City;
}

export interface SetDraftCityAction extends AppAction {
    type: ActionTypes.set_draft_city;
    city: City;
}

export type Action =
    AppAction
    & ChangeDraftNameAction
    & ChangeDraftCountryAction
    & ChangeSearchCriteriaCountryAction 
    & DeleteCityAction
    & DeleteCityResultAction
    & GetCityAction
    & GetCityResultAction
    & SetDraftCityAction
    & FetchCountriesResultAction
    & FetchCitiesAction
    & FetchCitiesResultAction;

interface SearchCriteria {
    country?: Country;
}

export interface State {
    draftCity: City;
    cities: City[];
    countries: Country[];
    searchCriteria: SearchCriteria;
    pageNumber: number;
    totalCount: number;
}
