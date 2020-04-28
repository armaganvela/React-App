import { AppAction, AppResultAction } from '../../../config/store/types';
import { Speaker } from '../../talks/logic/types';

export enum ActionTypes {
    change_draft_first_name = 'speaker_change_draft_first_name',
    change_draft_last_name = 'speaker_change_draft_last_name',
    change_draft_middle_name = 'speaker_change_draft_middle_name',
    change_draft_company = 'speaker_change_draft_company',

    change_search_first_name = 'speaker_change_search_first_name',

    fetch_speakers = 'speaker_fetch_speakers',
    fetch_speakers_result = 'speaker_fetch_speakers_result',

    get_speaker = 'speaker_get_speaker',
    get_speaker_result = 'speaker_get_speaker_result',

    upload_draft_file = 'speaker_upload_draft_file',
    upload_draft_file_result = 'speaker_upload_draft_file_result',

    set_draft_speaker = 'speaker_set_draft_speaker',
    clear_draft_speaker = 'speaker_clear_draft_speaker',

    clear_search_criteria_speaker = 'clear_search_criteria_speaker',
    add_speaker = 'speaker_add_speaker',
    update_speaker = 'speaker_update_speaker',
}

export interface ChangeDraftFirstNameAction extends AppAction {
    type: ActionTypes.change_draft_first_name,
    firstName: string;
}

export interface ChangeDraftLastNameAction extends AppAction {
    type: ActionTypes.change_draft_last_name;
    lastName: string;
}

export interface ChangeDraftMiddleNameAction extends AppAction {
    type: ActionTypes.change_draft_middle_name;
    middleName: string;
}

export interface ChangeDraftCompanyAction extends AppAction {
    type: ActionTypes.change_draft_company;
    company: string;
}

export interface ChangeSearchFirstNameAction extends AppAction {
    type: ActionTypes.change_search_first_name,
    firstName: string;
}

export interface FetchSpeakersAction extends AppAction {
    type: ActionTypes.fetch_speakers;
    pageNumber: number;
}


export interface FetchSpeakersResultAction extends AppResultAction {
    type: ActionTypes.fetch_speakers_result;
    speakers?: Speaker[];
    totalCount?: number;
}

export interface GetSpeakerAction extends AppAction {
    type: ActionTypes.get_speaker;
    speakerId: string;
}

export interface GetSpeakerResultAction extends AppResultAction {
    type: ActionTypes.get_speaker_result;
    speaker?: Speaker;
}

export interface SetDraftSpeakerAction extends AppAction {
    type: ActionTypes.set_draft_speaker;
    speaker: Speaker;
}


export interface UploadFileAction extends AppAction {
    type: ActionTypes.upload_draft_file;
    file?: File;
}

export interface UploadFileResultAction extends AppResultAction {
	type: ActionTypes.upload_draft_file_result;
	fileServerId?: string;
	fileTitle?: string;
	attachmentContent?: string;
}

export type Action =
    AppAction
    & ChangeDraftFirstNameAction
    & ChangeDraftLastNameAction
    & ChangeDraftMiddleNameAction
    & ChangeDraftCompanyAction
    & ChangeSearchFirstNameAction
    & GetSpeakerAction
    & GetSpeakerResultAction
    & UploadFileAction
    & UploadFileResultAction
    & SetDraftSpeakerAction
    & FetchSpeakersAction
    & FetchSpeakersResultAction;
    
interface SearchCriteria{
    firstName: string;
}

export interface State {
    draftSpeaker: Speaker;
    speakers: Speaker[];
    pageNumber: number;
    totalCount: number;
    searchCriteria: SearchCriteria;
}
