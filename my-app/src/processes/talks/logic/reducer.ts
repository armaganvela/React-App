import { Reducer } from 'redux';
import { Action, ActionTypes, State } from './types';

const initialState: State = {
	searchCriteria: {
		camp: undefined
	},

	draftTalk: {
		abstract: '',
		talkId: '',
		title: '',
		speaker: undefined,
		camp: undefined,
	},
	talks: [],

	speakers: [],
	camps: [],

	totalCount: 0,
	pageNumber: 1,
	pageSize: 5,
};

const talk: Reducer<State, Action> = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.get_talks_by_camp:
			return {
				...state,
				pageNumber: action.pageNumber
			};

		case ActionTypes.get_talks_by_camp_result:
			if (action.hasError) return state;
			return {
				...state,
				talks: action.talks!,
				totalCount: action.totalCount!
			};

		case ActionTypes.get_all_speakers_result:
			if (action.hasError) return state;
			return {
				...state,
				speakers: action.speakers!,
			};

		case ActionTypes.get_all_camps_result:
			if (action.hasError) return state;
			return {
				...state,
				camps: action.camps!,
			};

		case ActionTypes.change_draft_title:
			return {
				...state,
				draftTalk: {
					...state.draftTalk,
					title: action.title
				}
			};

		case ActionTypes.change_draft_abstract:
			return {
				...state,
				draftTalk: {
					...state.draftTalk,
					abstract: action.abstract
				}
			};

		case ActionTypes.change_draft_speaker:
			return {
				...state,
				draftTalk: {
					...state.draftTalk,
					speaker: action.speaker
				}
			};

		case ActionTypes.change_draft_camp:
			return {
				...state,
				draftTalk: {
					...state.draftTalk,
					camp: action.camp
				}
			};

		case ActionTypes.change_search_camp:
			return {
				...state,
				searchCriteria: {
					...state.searchCriteria,
					camp: action.camp
				}
			};

		case ActionTypes.set_draft_talk:
			return {
				...state,
				draftTalk: {
					...state.draftTalk,
					...action.talk
				}
			};

		case ActionTypes.clear_draft_talk:
			return {
				...state,
				draftTalk: {
					...initialState.draftTalk
				}
			};

		case ActionTypes.clear_search_criteria_talk:
			return {
				...state,
				searchCriteria: {
					...initialState.searchCriteria
				}
			};

		case ActionTypes.delete_talk_result:
			return {
				...state,
				talks: state.talks.filter(x => x.talkId !== action.talkId),
				totalCount: state.totalCount - 1,
			};

		default:
			return state;
	}
};

export default talk;
