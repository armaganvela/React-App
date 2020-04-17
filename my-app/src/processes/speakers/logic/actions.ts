import { AppAction } from '../../../config/store/types';
import {
    ActionTypes,
    ChangeDraftFirstNameAction,
    ChangeDraftMiddleNameAction,
    ChangeDraftLastNameAction,
    ChangeDraftCompanyAction,
    FetchSpeakersAction,
    FetchSpeakersResultAction,
    GetSpeakerAction,
    GetSpeakerResultAction,
    SetDraftSpeakerAction,
    ChangeSearchFirstNameAction,
} from './types';
import { Speaker } from '../../talks/logic/types';

export const changeDraftFirstName = (firstName: string): ChangeDraftFirstNameAction => ({
    type: ActionTypes.change_draft_first_name,
    firstName,
});

export const changeDraftLastName = (lastName: string): ChangeDraftLastNameAction => ({
    type: ActionTypes.change_draft_last_name,
    lastName
});

export const changeDraftMiddleName = (middleName: string): ChangeDraftMiddleNameAction => ({
    type: ActionTypes.change_draft_middle_name,
    middleName
});

export const changeDraftCompanyName = (company: string): ChangeDraftCompanyAction => ({
    type: ActionTypes.change_draft_company,
    company
});

export const changeSearchFirstName = (firstName: string): ChangeSearchFirstNameAction => ({
    type: ActionTypes.change_search_first_name,
    firstName,
});

export const setDraftSpeaker = (speaker: Speaker): SetDraftSpeakerAction => ({
    type: ActionTypes.set_draft_speaker,
    speaker,
});

export const clearDraftSpeaker = (): AppAction => ({
    type: ActionTypes.clear_draft_speaker,
});

export const getSpeaker = (speakerId: string): GetSpeakerAction => ({
    type: ActionTypes.get_speaker,
    speakerId,
});

export const getSpeakerResult = (hasError: boolean, speaker?: Speaker): GetSpeakerResultAction => ({
    type: ActionTypes.get_speaker_result,
    hasError,
    speaker
});

export const fetchSpeakers = (pageNumber: number): FetchSpeakersAction => ({
    type: ActionTypes.fetch_speakers,
    pageNumber
});

export const fetchSpeakersResult = (hasError: boolean, speakers?: [], totalCount?: number): FetchSpeakersResultAction => ({
    type: ActionTypes.fetch_speakers_result,
    hasError,
    speakers,
    totalCount
});

export const addSpeaker = (): AppAction => ({
    type: ActionTypes.add_speaker,
});

export const updateSpeaker = (): AppAction => ({
    type: ActionTypes.update_speaker,
});

export const clearSearchCriteriaSpeaker = (): AppAction => ({
    type: ActionTypes.clear_search_criteria_speaker,
});