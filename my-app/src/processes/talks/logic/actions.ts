import { AppAction } from '../../../config/store/types';
import {
    ActionTypes,
    ChangeDraftAbstractAction,
    ChangeDraftSpekerAction,
    ChangeDraftTitleAction,
    SetDraftTalkAction,
    GetTalkAction,
    GetTalksByCampAction,
    GetTalksByCampResultAction,
    GetAllSpeakersResultAction,
    ChangeDraftCampAction,
    ChangeSearchCampAction,
    DeleteTalkAction,
    DeleteTalkResultAction,

    Speaker,
    Talk,
    GetAllCampsResultAction,
    GetAllCampsAction,
} from './types';
import { Camp } from '../../camps/logic/types';

export const changeDraftTitle = (title: string): ChangeDraftTitleAction => ({
    type: ActionTypes.change_draft_title,
    title
});

export const changeDraftAbstract = (abstract: string): ChangeDraftAbstractAction => ({
    type: ActionTypes.change_draft_abstract,
    abstract
});

export const changeDraftSpeaker = (speaker?: Speaker): ChangeDraftSpekerAction => ({
    type: ActionTypes.change_draft_speaker,
    speaker
});

export const changeDraftCamp = (camp?: Camp): ChangeDraftCampAction => ({
    type: ActionTypes.change_draft_camp,
    camp
});

export const changeSearchCamp = (camp?: Camp): ChangeSearchCampAction => ({
    type: ActionTypes.change_search_camp,
    camp
});

export const setDraftTalk = (talk?: Talk): SetDraftTalkAction => ({
    type: ActionTypes.set_draft_talk,
    talk
});

export const clearDraftTalk = (): AppAction => ({
    type: ActionTypes.clear_draft_talk,
});

export const getTalk = (talkId: string): GetTalkAction => ({
    type: ActionTypes.get_talk,
    talkId,
});

export const getAllCamps = (monikerName?: string): GetAllCampsAction => ({
    type: ActionTypes.get_all_camps,
    monikerName,
});

export const getAllCampsResult = (hasError: boolean, camps?: Camp[]): GetAllCampsResultAction => ({
    type: ActionTypes.get_all_camps_result,
    hasError,
    camps,
});

export const getTalksByCamp = (pageNumber: number, monikerName?: string): GetTalksByCampAction => ({
    type: ActionTypes.get_talks_by_camp,
    pageNumber,
    monikerName
});

export const getTalksByCampResult = (hasError: boolean, talks?: Talk[], totalCount?: number): GetTalksByCampResultAction => ({
    type: ActionTypes.get_talks_by_camp_result,
    hasError,
    talks,
    totalCount,
});

export const deleteTalk = (talkId: string): DeleteTalkAction => ({
    type: ActionTypes.delete_talk,
    talkId,
});

export const deleteTalkResult = (hasError: boolean, talkId?: string): DeleteTalkResultAction => ({
    type: ActionTypes.delete_talk_result,
    hasError,
    talkId,
});

export const getAllSpeakers = (): AppAction => ({
    type: ActionTypes.get_all_speakers,
});

export const getAllSpeakersResult = (hasError: boolean, speakers?: Speaker[]): GetAllSpeakersResultAction => ({
    type: ActionTypes.get_all_speakers_result,
    hasError,
    speakers,
});

export const addTalk = (): AppAction => ({
    type: ActionTypes.add_talk,
});

export const updateTalk = (): AppAction => ({
    type: ActionTypes.update_talk,
});

export const clearSearchCriteriaTalk = (): AppAction => ({
    type: ActionTypes.clear_search_criteria_talk,
});