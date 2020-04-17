import axios, { AxiosRequestConfig } from 'axios';
import { morphism } from 'morphism';
import { get_country_url, add_country_url, update_country_url } from '../../../config/urls';
import { countryMap } from '../../camps/logic/mapper';

export const getCountryApi = async (countryId: string) => {
	const options: AxiosRequestConfig = {
		url: get_country_url,
		method: 'GET',
		params: { countryId }
	};

	const response = await axios(options);

	return morphism(countryMap, response.data);
};

export const addCountryApi = async (name: string ) => {
	const options: AxiosRequestConfig = {
		url: add_country_url,
		method: 'POST',
		data: { name }
	};

	await axios(options);
};

export const updateCountryApi = async (countryId: string, name: string) => {
	const options: AxiosRequestConfig = {
		url: update_country_url,
		method: 'POST',
		data: { id: countryId, name: name }
	};

	await axios(options);
};
