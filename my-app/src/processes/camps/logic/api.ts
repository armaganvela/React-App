import axios, { AxiosRequestConfig } from 'axios';
import { morphism } from 'morphism';
import {
	get_camps_url, get_camp_url, add_camp_url, update_camp_url, delete_camp_url
} from '../../../config/urls';
import { campMap } from './mapper';

export const getCampsApi = async (pageSize: number, pageNumber: number) => {
	const options: AxiosRequestConfig = {
		url: get_camps_url,
		method: 'GET',
		params: { pageSize: pageSize, pageNumber: pageNumber + 1 },
	};

	const response = await axios(options);

	return {
		totalCount: response.data.TotalCount,
		items: morphism(campMap, response.data.Items as any[]),
	};
};

export const getCampApi = async (campId: string) => {
	const options: AxiosRequestConfig = {
		url: get_camp_url,
		method: 'GET',
		params: { campId },
	};

	const response = await axios(options);
	return morphism(campMap, response.data);
};

export const addCampApi = async (name: string, moniker: string, eventDate: string) => {
	const options: AxiosRequestConfig = {
		url: add_camp_url,
		method: 'POST',
		data: { name: name, moniker: moniker, eventDate: eventDate },
	};

	const response = await axios(options);
};

export const updateCampApi = async (id: string, name: string, moniker: string, eventDate: string) => {
	const options: AxiosRequestConfig = {
		url: update_camp_url,
		method: 'POST',
		data: { campId: id, name: name, moniker: moniker, eventDate: eventDate },
	};

	const response = await axios(options);

	return {
		totalCount: response.data.TotalCount,
		items: morphism(campMap, response.data.Items as any[]),
	};
};


export const deleteCampApi = async (campId: string) => {
	const options: AxiosRequestConfig = {
		url: delete_camp_url,
		method: 'POST',
		data: {campId},
	};

	await axios(options);
};
