import { AppAction } from '../../../config/store/types';
import {
    ActionTypes,
    ChangeDraftNameAction,
    ChangeDraftEventDateAction,
    ChangeDraftMonikerNameAction,
    SetDraftCampAction,
    GetCampAction,
    GetCampResultAction,
    FetchCampsAction,
    FetchCampsResultAction,
    DeleteCampResultAction,
    DeleteCampAction,
    OpenDeleteModal,
    Camp,
} from './types';

export const changeDraftName = (name: string): ChangeDraftNameAction => ({
    type: ActionTypes.change_draft_name,
    name
});

export const changeDraftMonikerName = (monikerName: string): ChangeDraftMonikerNameAction => ({
    type: ActionTypes.change_draft_moniker_name,
    monikerName
});


export const changeDraftEventDate = (eventDate: string): ChangeDraftEventDateAction => ({
    type: ActionTypes.change_draft_event_date,
    eventDate
});

export const setDraftCamp = (camp: Camp): SetDraftCampAction => ({
    type: ActionTypes.set_draft_camp,
    camp
});

export const clearDraftCamp = (): AppAction => ({
    type: ActionTypes.clear_draft_camp,
});

export const getCamp = (campId: string): GetCampAction => ({
    type: ActionTypes.get_camp,
    campId,
});

export const fetchCamps = (pageNumber: number, pageSize: number): FetchCampsAction => ({
    type: ActionTypes.fetch_camps,
    pageNumber,
    pageSize,
});

export const fetchCampsResult = (hasError: boolean, camps?: [], totalCount?: number): FetchCampsResultAction => ({
	type: ActionTypes.fetch_camps_result,
	hasError,
	camps,
	totalCount,
});

export const deleteCamp = (campId: string): DeleteCampAction => ({
    type: ActionTypes.delete_camp,
    campId,
});

export const deleteCampResult = (hasError: boolean, campId?: string): DeleteCampResultAction => ({
    type: ActionTypes.delete_camp_result,
    hasError,
    campId,
});

export const addCamp = (): AppAction => ({
    type: ActionTypes.add_camp,
});

export const updateCamp = (): AppAction => ({
    type: ActionTypes.update_camp,
});

export const openDeleteModal = (openModal: boolean): OpenDeleteModal => ({
    type: ActionTypes.open_delete_modal,
    openModal,
});