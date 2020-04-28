import { Reducer } from 'redux';
import { Action, ActionTypes, State } from './types';

const initialState: State = {
    draftSpeaker: {
        speakerId: '',
        firstName: '',
        lastName: '',
        middleName: '',
        company: '',

        file: undefined,
        serverFileId: undefined,
        fileTitle: undefined,
        attachmentContent: undefined,
    },
    searchCriteria: {
        firstName: ''
    },

    speakers: [],
    pageNumber: 1,
    totalCount: 0
};

const speaker: Reducer<State, Action> = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.fetch_speakers:
            return {
                ...state,
                pageNumber: action.pageNumber
            }

        case ActionTypes.fetch_speakers_result:
            if (action.hasError) return state;
            return {
                ...state,
                speakers: action.speakers!,
                totalCount: action.totalCount!
            };

        case ActionTypes.change_draft_first_name:
            return {
                ...state,
                draftSpeaker: {
                    ...state.draftSpeaker,
                    firstName: action.firstName
                }
            };

        case ActionTypes.change_draft_last_name:
            return {
                ...state,
                draftSpeaker: {
                    ...state.draftSpeaker,
                    lastName: action.lastName
                }
            };


        case ActionTypes.change_draft_middle_name:
            return {
                ...state,
                draftSpeaker: {
                    ...state.draftSpeaker,
                    middleName: action.middleName
                }
            };

        case ActionTypes.change_draft_company:
            return {
                ...state,
                draftSpeaker: {
                    ...state.draftSpeaker,
                    company: action.company
                }
            };

        case ActionTypes.change_search_first_name:
            return {
                ...state,
                searchCriteria: {
                    ...state.searchCriteria,
                    firstName: action.firstName
                }
            };


        case ActionTypes.get_speaker_result:
            if (action.hasError) return state;
            return {
                ...state,
                draftSpeaker: {
                    ...state.draftSpeaker,
                    ...action.speaker,
                },
            };

        case ActionTypes.upload_draft_file_result:
            if (action.hasError) return state;
            return {
                ...state,
                draftSpeaker: {
                    ...state.draftSpeaker,
                    serverFileId: action.fileServerId,
                    fileTitle: action.fileTitle,
                    attachmentContent: action.attachmentContent
                }
            };

        case ActionTypes.set_draft_speaker:
            return {
                ...state,
                draftSpeaker: {
                    ...state.draftSpeaker,
                    ...action.speaker,
                },
            };

        case ActionTypes.clear_draft_speaker:
            return {
                ...state,
                draftSpeaker: {
                    ...initialState.draftSpeaker
                },
            };

        case ActionTypes.clear_search_criteria_speaker:
            return {
                ...state,
                searchCriteria: {
                    ...initialState.searchCriteria
                },
            };

        default:
            return state;
    }
};

export default speaker;
