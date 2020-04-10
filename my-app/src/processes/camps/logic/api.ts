import axios, { AxiosRequestConfig } from 'axios';
import { morphism } from 'morphism';
import {
	get_camps_url, get_camp_url, add_camp_url, update_camp_url, delete_camp_url, get_countries_url
} from '../../../config/urls';
import { campMap, countryMap } from './mapper';
import { Country } from './types';

export const getCampsApi = async (pageNumber: number) => {
	const options: AxiosRequestConfig = {
		url: get_camps_url,
		method: 'GET',
		params: { pageSize: 5, pageNumber: pageNumber },
	};

	const response = await axios(options);

	return {
		totalCount: response.data.TotalCount,
		items: morphism(campMap, response.data.Items as any[]),
	};
};

export const getCountriesApi = async () => {
	const options: AxiosRequestConfig = {
		url: get_countries_url,
		method: 'GET',
	};

	const response = await axios(options);

	return morphism(countryMap, response.data as any[]);
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

export const addCampApi = async (name: string, moniker: string, eventDate: string, country: Country) => {
	const options: AxiosRequestConfig = {
		url: add_camp_url,
		method: 'POST',
		data: { name: name, moniker: moniker, eventDate: eventDate, CountryId: country ? country.id : undefined },
	};

	const response = await axios(options);
};

export const updateCampApi = async (id: string, name: string, moniker: string, eventDate: string, country: Country) => {
	const options: AxiosRequestConfig = {
		url: update_camp_url,
		method: 'POST',
		data: { campId: id, name: name, moniker: moniker, eventDate: eventDate, CountryId: country ? country.id : undefined },
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
		data: { campId },
	};

	await axios(options);
};
