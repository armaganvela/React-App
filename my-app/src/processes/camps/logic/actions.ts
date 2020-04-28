import { AppAction } from '../../../config/store/types';
import {
    ActionTypes,
    ChangeDraftNameAction,
    ChangeDraftEventDateAction,
    ChangeDraftMonikerNameAction,
    ChangeDraftEventCountryAction,
    ChangeDraftLocationAction,
    ChangeDraftFileAction,
    ChangeSearchEventDateAction,
    SetDraftCampAction,
    GetCampAction,
    FetchCampsAction,
    FetchCampsResultAction,
    FetchCitiesAction,
    FetchCitiesResultAction,
    FetchCountriesResultAction,
    DeleteCampResultAction,
    DeleteCampAction,
    UploadFileResultAction,

    Camp,
    Country,
    ChangeDraftCityAction,
    City,
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

export const changeDraftLocation = (location?: { lng: any, lat: any }): ChangeDraftLocationAction => ({
    type: ActionTypes.change_draft_location,
    location
});

export const changeDraftFile = (file?: File): ChangeDraftFileAction => ({
    type: ActionTypes.change_draft_file,
    file
});

export const changeDraftCoutry = (country?: Country): ChangeDraftEventCountryAction => ({
    type: ActionTypes.change_draft_country,
    country
});

export const changeDraftCity = (city?: City): ChangeDraftCityAction => ({
    type: ActionTypes.change_draft_city,
    city
});


export const changeSearchEventDate = (eventDate?: Date): ChangeSearchEventDateAction => ({
    type: ActionTypes.change_search_event_date,
    eventDate
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

export const fetchCamps = (pageNumber: number, eventDate?: Date): FetchCampsAction => ({
    type: ActionTypes.fetch_camps,
    pageNumber,
    eventDate,
});

export const fetchCampsResult = (hasError: boolean, camps?: [], totalCount?: number): FetchCampsResultAction => ({
    type: ActionTypes.fetch_camps_result,
    hasError,
    camps,
    totalCount,
});

export const fetchCities = (countryId?: string): FetchCitiesAction => ({
    type: ActionTypes.fetch_cities,
    countryId
});


export const fetchCitiesResult = (hasError: boolean, cities?: []): FetchCitiesResultAction => ({
    type: ActionTypes.fetch_cities_result,
    hasError,
    cities,
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

export const uploadFileResult = (hasError: boolean, fileServerId?: string, fileTitle?: string, attachmentContent?: string): UploadFileResultAction => ({
    type: ActionTypes.upload_file_result,
    hasError,
    fileServerId,
    fileTitle,
    attachmentContent,
});

export const addCamp = (): AppAction => ({
    type: ActionTypes.add_camp,
});

export const updateCamp = (): AppAction => ({
    type: ActionTypes.update_camp,
});

export const clearSearchCriteria = (): AppAction => ({
    type: ActionTypes.clear_search_criteria,
});

