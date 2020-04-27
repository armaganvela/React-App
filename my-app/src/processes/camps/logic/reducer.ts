import { Reducer } from 'redux';
import { Action, ActionTypes, State } from './types';

const initialState: State = {
	searchCriteria: {
		eventDate: undefined,
	},
	draftCamp: {
		id: '',
		name: '',
		moniker: '',
		eventDate: undefined,
		country: undefined,
		city: undefined,
		location: { lng: 28.9784, lat: 41.0082 },
	},

	camps: [],
	countries: [],
	cities: [],

	totalCount: 0,
	pageNumber: 1,
	pageSize: 5,
};

const camp: Reducer<State, Action> = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.fetch_camps:
			return {
				...state,
				pageNumber: action.pageNumber,
			};

		case ActionTypes.fetch_camps_result:
			if (action.hasError) return state;
			return {
				...state,
				camps: action.camps!,
				totalCount: action.totalCount!,
			};

		case ActionTypes.fetch_countries_result:
			if (action.hasError) return state;
			return {
				...state,
				countries: action.countries!,
			};

		case ActionTypes.fetch_cities_result:
			if (action.hasError) return state;
			return {
				...state,
				cities: action.cities!,
			};

		case ActionTypes.get_camp_result:
			if (action.hasError) return state;
			return {
				...state,
				draftCamp: action.camp,
			};

		case ActionTypes.change_draft_name:
			return {
				...state,
				draftCamp: {
					...state.draftCamp,
					name: action.name
				}
			};

		case ActionTypes.change_draft_moniker_name:
			return {
				...state,
				draftCamp: {
					...state.draftCamp,
					moniker: action.monikerName
				}
			};

		case ActionTypes.change_draft_country:
			return {
				...state,
				draftCamp: {
					...state.draftCamp,
					country: action.country
				}
			};

			
		case ActionTypes.change_draft_city:
			return {
				...state,
				draftCamp: {
					...state.draftCamp,
					city: action.city
				}
			};


		case ActionTypes.change_draft_event_date:
			return {
				...state,
				draftCamp: {
					...state.draftCamp,
					eventDate: action.eventDate
				}
			};

			case ActionTypes.change_draft_location:
				return {
					...state,
					draftCamp: {
						...state.draftCamp,
						location: {
							...action.location!
						}
					}
				};
	

		case ActionTypes.change_search_event_date:
			return {
				...state,
				searchCriteria: {
					...state.searchCriteria,
					eventDate: action.eventDate
				}
			};

		case ActionTypes.set_draft_camp:
			return {
				...state,
				draftCamp: {
					...state.draftCamp,
					...action.camp
				}
			};

		case ActionTypes.clear_draft_camp:
			return {
				...state,
				draftCamp: {
					...state.draftCamp,
					...initialState.draftCamp
				}
			};

		case ActionTypes.delete_camp_result:
			if (action.hasError) return state;
			return {
				...state,
				camps: state.camps.filter(x => x.id !== action.campId),
				totalCount: state.totalCount - 1,
			};

		case ActionTypes.clear_draft_camp:
			return {
				...state,
				searchCriteria: {
					...state.searchCriteria,
					...initialState.searchCriteria
				}
			};

		case ActionTypes.clear_search_criteria:
			return {
				...state,
				searchCriteria: {
					...state.searchCriteria,
					...initialState.searchCriteria
				}
			};


		default:
			return state;
	}
};

export default camp;
