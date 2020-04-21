import { AppAction, AppResultAction } from '../../../config/store/types';

export enum ActionTypes {
	change_draft_name = 'CAMP_CHANGE_DRAFT_NAME',
	change_draft_moniker_name = 'CAMP_CHANGE_DRAFT_MONIKER_NAME',
	change_draft_event_date = 'CAMP_CHANGE_DRAFT_EVENT_DATE',
	change_draft_country = 'CAMP_CHANGE_DRAFT_COUNTRY',
	change_draft_city = 'CAMP_CHANGE_DRAFT_CITY',

	change_search_event_date = 'CAMP_CHANGE_SEARCH_EVENT_DATE',

	set_draft_camp = 'CAMP_SET_DRAFT_CAMP',
	clear_draft_camp = 'CAMP_CLEAR_DRAFT_CAMP',

	get_camp = 'CAMP_GET_CAMP',
	get_camp_result = 'CAMP_GET_CAMP_RESULT',

	add_camp = 'CAMP_ADD_CAMP',
	update_camp = 'CAMP_UPDATE_CAMP',

	fetch_camps = 'CAMP_FETCH_CAMPS',
	fetch_camps_result = 'CAMP_FETCH_CAMPS_RESULT',

	fetch_countries = 'CAMP_FETCH_CAMP_COUNTRIES',
	fetch_countries_result = 'CAMP_FETCH_CAMP_COUNTRIES_RESULT',

	fetch_cities = 'CAMP_FETCH_CITIES',
	fetch_cities_result = 'CAMP_FETCH_CITIES_RESULT',

	delete_camp = 'CAMP_DELETE_CAMP',
	delete_camp_result = 'CAMP_DELETE_CAMP_RESULT',

	clear_search_criteria = 'CAMP_SEARCH_CRITERIA',
}

export interface ChangeDraftNameAction extends AppAction {
	type: ActionTypes.change_draft_name,
	name: string;
}

export interface ChangeDraftMonikerNameAction extends AppAction {
	type: ActionTypes.change_draft_moniker_name,
	monikerName: string;
}

export interface ChangeDraftEventDateAction extends AppAction {
	type: ActionTypes.change_draft_event_date,
	eventDate?: Date;
}

export interface ChangeDraftEventCountryAction extends AppAction {
	type: ActionTypes.change_draft_country,
	country?: Country;
}

export interface ChangeDraftCityAction extends AppAction {
	type: ActionTypes.change_draft_city,
	city?: City;
}

export interface ChangeSearchEventDateAction extends AppAction {
	type: ActionTypes.change_search_event_date,
	eventDate?: Date;
}

export interface SetDraftCampAction extends AppAction {
	type: ActionTypes.set_draft_camp;
	camp: Camp;
}

export interface GetCampAction extends AppAction {
	type: ActionTypes.get_camp;
	campId: string;
}

export interface GetCampResultAction extends AppResultAction {
	type: ActionTypes.get_camp_result;
	camp?: Camp;
}

export interface FetchCampsAction extends AppAction {
	type: ActionTypes.fetch_camps;
	pageNumber: number;
	eventDate?: Date;
}

export interface FetchCampsResultAction extends AppResultAction {
	type: ActionTypes.fetch_camps_result;
	camps?: Camp[];
	totalCount?: number;
}

export interface FetchCitiesAction extends AppAction {
	type: ActionTypes.fetch_cities;
	countryId?: string;
}

export interface FetchCitiesResultAction extends AppResultAction {
	type: ActionTypes.fetch_cities_result;
	cities?: City[];
}

export interface FetchCountriesResultAction extends AppResultAction {
	type: ActionTypes.fetch_countries_result;
	countries?: Country[];
}

export interface DeleteCampAction extends AppAction {
	type: ActionTypes.delete_camp;
	campId: string;
}

export interface DeleteCampResultAction extends AppResultAction {
	type: ActionTypes.delete_camp_result;
	campId?: string;
}

export type Action =
	AppAction
	& ChangeDraftNameAction
	& ChangeDraftMonikerNameAction
	& ChangeDraftEventDateAction
	& ChangeDraftEventCountryAction
	& ChangeSearchEventDateAction
	& ChangeDraftCityAction
	& SetDraftCampAction
	& GetCampAction
	& GetCampResultAction
	& FetchCampsAction
	& FetchCampsResultAction
	& FetchCitiesAction
	& FetchCitiesResultAction
	& FetchCountriesResultAction
	& DeleteCampAction
	& DeleteCampResultAction;
	
export interface Camp {
	id: string;
	name: string;
	moniker: string;
	eventDate?: Date;
	country?: Country;
	city?: City;
}

export interface Country {
	id: string;
	name: string;
}

export interface City {
	id: string;
	name: string;
	country?: Country;
}

export interface SearchCriteria {
	eventDate?: Date;
}

export interface State {
	searchCriteria: SearchCriteria;
	draftCamp: Camp;
	camps: Camp[];

	countries: Country[];
	cities: City[];
	
	totalCount: number;
	pageNumber: number;
	pageSize: number;
}
