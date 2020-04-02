import { AppAction, AppResultAction } from '../../../config/store/types';

export enum ActionTypes {
	change_draft_name = 'CHANGE_DRAFT_NAME',
	change_draft_moniker_name = 'CHANGE_DRAFT_MONIKER_NAME',
	change_draft_event_date = 'CHANGE_DRAFT_EVENT_DATE',
	set_draft_camp = 'SET_DRAFT_CAMP',
	clear_draft_camp = 'CLEAR_DRAFT_CAMP',

	get_camp = 'GET_CAMP',
	get_camp_result = 'GET_CAMP_RESULT',

	add_camp = 'ADD_CAMP',
	update_camp = 'UPDATE_CAMP',

	fetch_camps = 'FETCH_CAMPS',
	fetch_camps_result = 'FETCH_CAMPS_RESULT',

	delete_camp = 'DELETE_CAMP',
	delete_camp_result = 'DELETE_CAMP_RESULT',

	open_delete_modal = 'OPEN_DELETE_MODAL',
}

export interface ChangeDraftNameAction extends AppAction {
	type: ActionTypes.change_draft_name,
	name: string;
}

export interface ChangeDraftMonikerNameAction extends AppAction {
	type: ActionTypes.change_draft_moniker_name,
	monikerName: string;
}

export interface ChangeDraftEventDateAction extends AppAction {
	type: ActionTypes.change_draft_event_date,
	eventDate: string;
}

export interface SetDraftCampAction extends AppAction {
	type: ActionTypes.set_draft_camp;
	camp: Camp;
}

export interface GetCampAction extends AppAction {
	type: ActionTypes.get_camp;
	campId: string;
}

export interface GetCampResultAction extends AppResultAction {
	type: ActionTypes.get_camp_result;
	camp?: Camp;
}

export interface FetchCampsAction extends AppAction {
	type: ActionTypes.fetch_camps;
	pageNumber: number;
	pageSize: number;
}

export interface FetchCampsResultAction extends AppResultAction {
	type: ActionTypes.fetch_camps_result;
	camps?: Camp[];
	totalCount?: number;
}

export interface OpenDeleteModal extends AppAction {
	type: ActionTypes.open_delete_modal;
	openModal: boolean;
}

export interface DeleteCampAction extends AppAction {
	type: ActionTypes.delete_camp;
	campId: string;
}

export interface DeleteCampResultAction extends AppResultAction {
	type: ActionTypes.delete_camp_result;
	campId?: string;
}

export interface Camp {
	id: string;
	name: string;
	moniker: string;
	eventDate: string;
}

export type Action =
	AppAction
	& ChangeDraftNameAction
	& ChangeDraftMonikerNameAction
	& ChangeDraftEventDateAction
	& SetDraftCampAction
	& GetCampAction
	& GetCampResultAction
	& FetchCampsAction
	& FetchCampsResultAction
	& DeleteCampAction
	& DeleteCampResultAction
	& OpenDeleteModal;

export interface State {
    draftCamp: Camp;

	camps: Camp[];
	totalCount: number;
	pageNumber: number;
	pageSize: number;
	openModal: boolean;
}
