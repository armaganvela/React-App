import { Reducer } from 'redux';
import { Action, ActionTypes, State } from './types';

const initialState: State = {
	draftCamp: {
		id: '',
		name: '',
		moniker: '',
		eventDate: '',
	},

	camps: [],
	totalCount: 0,
	pageNumber: 0,
	pageSize: 5,

	openModal: false,
};

const camp: Reducer<State, Action> = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.fetch_camps:
			return {
				...state,
				pageNumber: action.pageNumber,
				pageSize: action.pageSize,
			};

		case ActionTypes.fetch_camps_result:
			if (action.hasError) return state;
			return {
				...state,
				camps: action.camps!,
				totalCount: action.totalCount!,
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
				camps: state.camps.filter(x => x.id != action.campId)
			};

		default:
			return state;
	}
};

export default camp;
