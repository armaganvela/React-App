import { AppAction, AppResultAction } from '../../../config/store/types';
import { Camp } from '../../camps/logic/types';

export enum ActionTypes {
	get_talks_by_camp = 'talk_get_talks_by_camp',
	get_talks_by_camp_result = 'talk_get_talks_by_camp_result',

	get_all_camps = 'talk_get_all_camps',
	get_all_camps_result = 'talk_get_all_camps_result',

	get_all_speakers = 'talk_get_all_speakers',
	get_all_speakers_result = 'talk_get_all_speakers_result',

	change_draft_title = 'talk_change_draft_title',
	change_draft_abstract = 'talk_change_draft_abstract',
	change_draft_speaker = 'talk_change_draft_speaker',
	change_draft_camp = 'talk_change_draft_camp',
	change_search_camp = 'talk_change_search_camp',

	set_draft_talk = 'talk_set_draft_talk',
	clear_draft_talk = 'talk_clear_draft_talk',

	add_talk = 'talk_add_talk',
	update_talk = 'talk_update_talk',
	
	delete_talk = 'talk_talk',
	delete_talk_result = 'talk_talk_result',

	get_talk = 'talk_get_talk',
	get_talk_result = 'talk_get_talk_result',

	clear_search_criteria_talk = 'talk_clear_search_criteria',
}

export interface ChangeDraftTitleAction extends AppAction {
	type: ActionTypes.change_draft_title,
	title: string;
}

export interface ChangeDraftAbstractAction extends AppAction {
	type: ActionTypes.change_draft_abstract,
	abstract: string;
}

export interface ChangeDraftSpekerAction extends AppAction {
	type: ActionTypes.change_draft_speaker,
	speaker?: Speaker;
}

export interface ChangeDraftCampAction extends AppAction {
	type: ActionTypes.change_draft_camp,
	camp?: Camp;
}

export interface ChangeSearchCampAction extends AppAction {
	type: ActionTypes.change_search_camp,
	camp?: Camp;
}

export interface SetDraftTalkAction extends AppAction {
	type: ActionTypes.set_draft_talk;
	talk?: Talk;
}

export interface GetTalkAction extends AppAction {
	type: ActionTypes.get_talk;
	talkId: string;
}

export interface GetAllCampsAction extends AppAction {
	type: ActionTypes.get_all_camps;
	monikerName?: string;
}

export interface GetAllCampsResultAction extends AppResultAction {
	type: ActionTypes.get_all_camps_result;
	camps?: Camp[];
}

export interface GetTalksByCampAction extends AppAction {
	type: ActionTypes.get_talks_by_camp;
	pageNumber: number;
	monikerName?: string;
}

export interface GetTalksByCampResultAction extends AppResultAction {
	type: ActionTypes.get_talks_by_camp_result
	talks?: Talk[];
	totalCount?: number;
}

export interface GetAllSpeakersResultAction extends AppResultAction {
	type: ActionTypes.get_all_speakers_result
	speakers?: Speaker[];
}

export interface DeleteTalkAction extends AppAction {
	type: ActionTypes.delete_talk;
	talkId: string;
}

export interface DeleteTalkResultAction extends AppResultAction {
	type: ActionTypes.delete_talk_result
	talkId?: string;
}

export type Action =
	AppAction
    & ChangeDraftTitleAction
    & ChangeDraftAbstractAction
    & SetDraftTalkAction
	& ChangeDraftSpekerAction
	& ChangeDraftCampAction
	& ChangeSearchCampAction
	& DeleteTalkAction
	& DeleteTalkResultAction
    & GetTalkAction
	& GetTalksByCampAction
	& GetTalksByCampResultAction
	& GetAllCampsAction
	& GetAllCampsResultAction
	& GetAllSpeakersResultAction;

    export interface Talk {
        talkId: string;
        speaker?: Speaker;
        title: string;
        abstract: string;
        camp?: Camp;
    }
    
    export interface Speaker {
        speakerId: string;
        firstName: string;
        lastName: string;
		company: string;
		middleName: string;
		file?: File;
		serverFileId?: string;
		fileTitle?: string;
		attachmentContent?: string
	}
	
	export interface SearchCriteria{
		camp?: Camp;
	}

    export interface State {
        draftTalk: Talk;
		talks: Talk[];

		speakers: Speaker[];
		camps: Camp[];
		searchCriteria: SearchCriteria;
    
        totalCount: number;
        pageNumber: number;
        pageSize: number;
    }
    