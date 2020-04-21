import axios, { AxiosRequestConfig } from 'axios';
import { morphism } from 'morphism';
import {
	get_camps_url, get_camp_url, add_camp_url, update_camp_url, delete_camp_url, get_countries_url, get_talks_by_camp_url, get_all_speakers, get_cities_by_country
} from '../../../config/urls';
import { campMap, countryMap, cityMap } from './mapper';
import { Country, City } from './types';

export const getCampsApi = async (pageNumber: number, eventDate?: Date) => {
	const options: AxiosRequestConfig = {
		url: get_camps_url,
		method: 'GET',
		params: { pageSize: 5, pageNumber, eventDate },
	};

	const response = await axios(options);

	return {
		totalCount: response.data.TotalCount,
		items: morphism(campMap, response.data.Items as any[]),
	};
};

export const getCitiesByCountryApi = async (countryId: string) => {
	const options: AxiosRequestConfig = {
		url: get_cities_by_country,
		method: 'GET',
		params: { countryId },
	};

	const response = await axios(options);
	return morphism(cityMap, response.data);
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

export const addCampApi = async (name: string, moniker: string, eventDate: string, country: Country, city: City) => {
	const options: AxiosRequestConfig = {
		url: add_camp_url,
		method: 'POST',
		data: { name: name, moniker: moniker, eventDate: eventDate, CountryId: country ? country.id : undefined, CityId: city ? city.id : undefined },
	};

	const response = await axios(options);
};

export const updateCampApi = async (id: string, name: string, moniker: string, eventDate: string, country: Country, city: City) => {
	const options: AxiosRequestConfig = {
		url: update_camp_url,
		method: 'POST',
		data: { campId: id, name: name, moniker: moniker, eventDate: eventDate, CountryId: country ? country.id : undefined, CityId: city ? city.id : undefined },
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
