import axios, { AxiosRequestConfig } from 'axios';
import { morphism } from 'morphism';
import { get_talks_by_camp_url, get_all_speakers, get_talk_url, add_talk_url, get_all_camps, update_talk_url, delete_talk_url } from '../../../config/urls';
import { talkMap, speakerMap } from './mapper';
import { campMap } from '../../camps/logic/mapper';
import { Camp } from '../../camps/logic/types';

export const getTalksByCampApi = async (pageNumber: number, camp: Camp) => {
	const campId = camp ? camp.id : undefined;

	const options: AxiosRequestConfig = {
		url: get_talks_by_camp_url,
		method: 'GET',
		params: { campId, pageNumber, pageSize: 5 },
	};

	const response = await axios(options);

	return {
		totalCount: response.data.TotalCount,
		items: morphism(talkMap, response.data.Items as any[]),
	};
};

export const getAllSpeakersApi = async () => {
	const options: AxiosRequestConfig = {
		url: get_all_speakers,
		method: 'GET',
	};

	const response = await axios(options);
	return morphism(speakerMap, response.data);
};

export const getAllCampsApi = async () => {
	const options: AxiosRequestConfig = {
		url: get_all_camps,
		method: 'GET',
	};

	const response = await axios(options);
	return morphism(campMap, response.data);
};

export const getTalkApi = async (talkId: string) => {
	const options: AxiosRequestConfig = {
		url: get_talk_url,
		method: 'GET',
		params: { talkId },
	};

	const response = await axios(options);
	return morphism(talkMap, response.data);
};

export const addTalkApi = async (speakerId: string, campId: string, title: string, abstract: string) => {
	const options: AxiosRequestConfig = {
		url: add_talk_url,
		method: 'POST',
		data: { speakerId, campId, title, abstract },
	};

	const response = await axios(options);
	return morphism(talkMap, response.data);
};

export const updateTalkApi = async (talkId: string, speakerId: string, campId: string, title: string, abstract: string) => {
	const options: AxiosRequestConfig = {
		url: update_talk_url,
		method: 'POST',
		data: { talkId, speakerId, campId, title, abstract },
	};

	const response = await axios(options);
	return morphism(talkMap, response.data);
};

export const deleteTalkApi = async (talkId: string) => {
	const options: AxiosRequestConfig = {
		url: delete_talk_url,
		method: 'POST',
		data: { talkId },
	};

	await axios(options);
};

