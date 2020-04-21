import { AppAction } from '../../../config/store/types';
import {
    ActionTypes,
    ChangeDraftNameAction,
    ChangeDraftCountryAction,
    ChangeSearchCriteriaCountryAction,
    FetchCountriesResultAction,
    FetchCitiesAction,
    FetchCitiesResultAction,
    DeleteCityAction,
    DeleteCityResultAction,
    GetCityAction,
    GetCityResultAction,
    SetDraftCityAction
} from './types';
import { City, Country } from '../../camps/logic/types';

export const changeDraftName = (name: string): ChangeDraftNameAction => ({
    type: ActionTypes.change_draft_name,
    name,
});

export const changeDraftCountry = (country?: Country): ChangeDraftCountryAction => ({
    type: ActionTypes.change_draft_country,
    country,
});

export const changeSearchCriteriaCountry = (country?: Country): ChangeSearchCriteriaCountryAction => ({
    type: ActionTypes.change_search_criteria_country,
    country,
});

export const setDraftCity = (city: City): SetDraftCityAction => ({
    type: ActionTypes.set_draft_city,
    city,
});

export const clearDraftCity = (): AppAction => ({
    type: ActionTypes.clear_draft_city,
});

export const deleteCity = (cityId: string): DeleteCityAction => ({
    type: ActionTypes.delete_city,
    cityId,
});

export const deleteCityResult = (hasError: boolean, cityId?: string): DeleteCityResultAction => ({
    type: ActionTypes.delete_city_result,
    hasError,
    cityId
});

export const getCity = (cityId: string): GetCityAction => ({
    type: ActionTypes.get_city,
    cityId,
});

export const getCityResult = (hasError: boolean, city?: City): GetCityResultAction => ({
    type: ActionTypes.get_city_result,
    hasError,
    city
});

export const fetchCities = (pageNumber: number): FetchCitiesAction => ({
    type: ActionTypes.fetch_cities,
    pageNumber
});

export const fetchCitiesResult = (hasError: boolean, cities?: [], totalCount?: number): FetchCitiesResultAction => ({
    type: ActionTypes.fetch_cities_result,
    hasError,
    cities,
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

export const addCity = (): AppAction => ({
    type: ActionTypes.add_city,
});

export const updateCity = (): AppAction => ({
    type: ActionTypes.update_city,
});