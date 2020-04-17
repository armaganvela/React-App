import { AppAction } from '../../../config/store/types';
import {
    ActionTypes,
    ChangeDraftNameAction,
    GetCountryAction,
    FetchCountriesResultAction,
    GetCountryResultAction,
    SetDraftCountryAction,
} from './types';
import { Country } from '../../camps/logic/types';

export const changeDraftName = (name: string): ChangeDraftNameAction => ({
    type: ActionTypes.change_draft_name,
    name,
});

export const setDraftCountry = (country: Country): SetDraftCountryAction => ({
    type: ActionTypes.set_draft_country,
    country,
});

export const clearDraftCountry = (): AppAction => ({
    type: ActionTypes.clear_draft_country,
});

export const getCountry = (countryId: string): GetCountryAction => ({
    type: ActionTypes.get_country,
    countryId,
});

export const getCountryResult = (hasError: boolean, country?: Country): GetCountryResultAction => ({
    type: ActionTypes.get_country_result,
    hasError,
    country
});

export const fetchCountries = (): AppAction => ({
    type: ActionTypes.fetch_countries,
});

export const fetchCountriesResult = (hasError: boolean, countries?: []): FetchCountriesResultAction => ({
    type: ActionTypes.fetch_countries_result,
    hasError,
    countries,
});

export const addCountry = (): AppAction => ({
    type: ActionTypes.add_country,
});

export const updateCountry = (): AppAction => ({
    type: ActionTypes.update_country,
});