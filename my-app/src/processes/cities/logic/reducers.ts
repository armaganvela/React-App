import { Reducer } from 'redux';
import { Action, ActionTypes, State } from './types';

const initialState: State = {
    searchCriteria: {
        country: undefined
    },
    draftCity: {
        id: '',
        name: '',
        country: undefined
    },
    cities: [],
    countries: [],
    totalCount: 0,
    pageNumber: 1,
};

const speaker: Reducer<State, Action> = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.fetch_cities:
            return {
                ...state,
                pageNumber: action.pageNumber
            };

        case ActionTypes.fetch_cities_result:
            if (action.hasError) return state;
            return {
                ...state,
                cities: action.cities!,
                totalCount: action.totalCount!
            };

        case ActionTypes.fetch_countries_result:
            if (action.hasError) return state;
            return {
                ...state,
                countries: action.countries!,
            };

        case ActionTypes.delete_city_result:
            if (action.hasError) return state;
            return {
                ...state,
                cities: state.cities.filter(x => x.id !== action.cityId),
                totalCount: state.totalCount - 1
            };

        case ActionTypes.change_draft_name:
            return {
                ...state,
                draftCity: {
                    ...state.draftCity,
                    name: action.name
                }
            };

        case ActionTypes.change_draft_country:
            return {
                ...state,
                draftCity: {
                    ...state.draftCity,
                    country: action.country
                }
            };

        case ActionTypes.change_search_criteria_country:
            return {
                ...state,
                searchCriteria: {
                    ...state.searchCriteria,
                    country: action.country
                }
            };

        case ActionTypes.get_city_result:
            if (action.hasError) return state;
            return {
                ...state,
                draftCity: {
                    ...state.draftCity,
                    ...action.city,
                },
            };

        case ActionTypes.set_draft_city:
            return {
                ...state,
                draftCity: {
                    ...state.draftCity,
                    ...action.city,
                },
            };

        case ActionTypes.clear_draft_city:
            return {
                ...state,
                draftCity: {
                    ...initialState.draftCity
                },
            };

        default:
            return state;
    }
};

export default speaker;
