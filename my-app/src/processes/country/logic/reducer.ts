import { Reducer } from 'redux';
import { Action, ActionTypes, State } from './types';

const initialState: State = {
    draftCountry: {
        id: '',
        name: ''
    },
    countries: [],
};

const speaker: Reducer<State, Action> = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.fetch_countries_result:
            if (action.hasError) return state;
            return {
                ...state,
                countries: action.countries!,
            };

        case ActionTypes.change_draft_name:
            return {
                ...state,
                draftCountry: {
                    ...state.draftCountry,
                    name: action.name
                }
            };

        case ActionTypes.get_country_result:
            if (action.hasError) return state;
            return {
                ...state,
                draftCountry: {
                    ...state.draftCountry,
                    ...action.country,
                },
            };

        case ActionTypes.set_draft_country:
            return {
                ...state,
                draftCountry: {
                    ...state.draftCountry,
                    ...action.country,
                },
            };

        case ActionTypes.clear_draft_country:
            return {
                ...state,
                draftCountry: {
                    ...initialState.draftCountry
                },
            };

        default:
            return state;
    }
};

export default speaker;
