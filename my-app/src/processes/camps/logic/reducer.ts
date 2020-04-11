import { Reducer } from 'redux';
import { Action, ActionTypes, State } from './types';
import { stat } from 'fs';

const initialState: State = {
	draftCamp: {
		id: '',
		name: '',
		moniker: '',
		eventDate: undefined,
		country: undefined,
	},

	camps: [],
	countries: [],
	totalCount: 0,
	pageNumber: 1,
	pageSize: 5,

	openModal: false,
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

		case ActionTypes.change_draft_event_date:
			return {
				...state,
				draftCamp: {
					...state.draftCamp,
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

		case ActionTypes.open_delete_modal:
			return {
				...state,
				openModal: action.openModal,
			};

		case ActionTypes.delete_camp_result:
			if (action.hasError) return state;
			return {
				...state,
				camps: state.camps.filter(x => x.id !== action.campId),
				totalCount: state.totalCount - 1,
			};

		default:
			return state;
	}
};

export default camp;
