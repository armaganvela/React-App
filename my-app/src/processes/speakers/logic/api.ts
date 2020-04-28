import axios, { AxiosRequestConfig } from 'axios';
import { morphism } from 'morphism';
import { get_speaker_url, add_speaker_url, update_speaker_url, fetch_speakers_url } from '../../../config/urls';
import { speakerMap } from '../../talks/logic/mapper';

export const fetchSpeakersApi = async (pageNumber: number, firstName: string) => {
	const options: AxiosRequestConfig = {
		url: fetch_speakers_url,
		method: 'GET',
		params: { firstName, pageNumber, pageSize: 5 },
	};

	const response = await axios(options);

	return {
		totalCount: response.data.TotalCount,
		items: morphism(speakerMap, response.data.Items as any[]),
	};
};

export const getSpeakerApi = async (speakerId: string) => {
	const options: AxiosRequestConfig = {
		url: get_speaker_url,
		method: 'GET',
		params: { speakerId }
	};

	const response = await axios(options);

	return morphism(speakerMap, response.data);
};

export const addSpeakerApi = async (firstName: string, lastName: string, middleName: string, company: string, attachmentId: string) => {
	const options: AxiosRequestConfig = {
		url: add_speaker_url,
		method: 'POST',
		data: { firstName, middleName, lastName, company, attachmentId }
	};

	await axios(options);
};

export const updateSpeakerApi = async (speakerId: string, firstName: string, lastName: string, middleName: string, company: string, attachmentId: string) => {
	const options: AxiosRequestConfig = {
		url: update_speaker_url,
		method: 'POST',
		data: { speakerId, firstName, middleName, lastName, company, attachmentId }
	};

	await axios(options);
};
