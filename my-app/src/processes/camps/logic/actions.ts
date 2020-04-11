import { AppAction } from '../../../config/store/types';
import {
    ActionTypes,
    ChangeDraftNameAction,
    ChangeDraftEventDateAction,
    ChangeDraftMonikerNameAction,
    ChangeDraftEventCountryAction,
    SetDraftCampAction,
    GetCampAction,
    FetchCampsAction,
    FetchCampsResultAction,
    FetchCountriesResultAction,
    DeleteCampResultAction,
    DeleteCampAction,
    OpenDeleteModal,
    Camp,
    Country,
} from './types';

export const changeDraftName = (name: string): ChangeDraftNameAction => ({
    type: ActionTypes.change_draft_name,
    name
});

export const changeDraftMonikerName = (monikerName: string): ChangeDraftMonikerNameAction => ({
    type: ActionTypes.change_draft_moniker_name,
    monikerName
});


export const changeDraftEventDate = (eventDate?: Date): ChangeDraftEventDateAction => ({
    type: ActionTypes.change_draft_event_date,
    eventDate
});

export const changeDraftCoutry = (country?: Country): ChangeDraftEventCountryAction => ({
    type: ActionTypes.change_draft_country,
    country
});

export const setDraftCamp = (camp: Camp): SetDraftCampAction => ({
    type: ActionTypes.set_draft_camp,
    camp
});

export const clearDraftCamp = (): AppAction => ({
    type: ActionTypes.clear_draft_camp,
});

export const getCamp = (campId: string): GetCampAction => ({
    type: ActionTypes.get_camp,
    campId,
});

export const fetchCamps = (pageNumber: number): FetchCampsAction => ({
    type: ActionTypes.fetch_camps,
    pageNumber,
});

export const fetchCampsResult = (hasError: boolean, camps?: [], totalCount?: number): FetchCampsResultAction => ({
	type: ActionTypes.fetch_camps_result,
	hasError,
	camps,
	totalCount,
});

export const fetchCountries = (): AppAction => ({
	type: ActionTypes.fetch_countries,
});

export const fetchCountriesResult = (hasError: boolean, countries?: []): FetchCountriesResultAction => ({
	type: ActionTypes.fetch_countries_result,
	hasError,
	countries,
});

export const deleteCamp = (campId: string): DeleteCampAction => ({
    type: ActionTypes.delete_camp,
    campId,
});

export const deleteCampResult = (hasError: boolean, campId?: string): DeleteCampResultAction => ({
    type: ActionTypes.delete_camp_result,
    hasError,
    campId,
});

export const addCamp = (): AppAction => ({
    type: ActionTypes.add_camp,
});

export const updateCamp = (): AppAction => ({
    type: ActionTypes.update_camp,
});

export const openDeleteModal = (openModal: boolean): OpenDeleteModal => ({
    type: ActionTypes.open_delete_modal,
    openModal,
});