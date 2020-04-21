import axios, { AxiosRequestConfig } from 'axios';
import { morphism } from 'morphism';
import { get_country_url, add_country_url, update_country_url, get_city_url, add_city_url, fetch_cities_url, update_city_url, delete_city_url } from '../../../config/urls';
import { cityMap } from '../../camps/logic/mapper';

export const fetchCitiesApi = async (pageNumber: number, countryId: string) => {
	debugger;
	const options: AxiosRequestConfig = {
		url: fetch_cities_url,
		method: 'GET',
		params: { PageNumber: pageNumber, PageSize: 5,  CountryId: countryId}
	};

	const response = await axios(options);
	
	return {
		totalCount: response.data.TotalCount,
		items: morphism(cityMap, response.data.Items as any[]),
	};
};

export const getCityApi = async (cityId: string) => {
	const options: AxiosRequestConfig = {
		url: get_city_url,
		method: 'GET',
		params: { cityId }
	};

	const response = await axios(options);

	return morphism(cityMap, response.data);
};

export const addCityApi = async (name: string, countryId: string ) => {
	const options: AxiosRequestConfig = {
		url: add_city_url,
		method: 'POST',
		data: { name, countryId }
	};

	await axios(options);
};

export const updateCityApi = async (id: string, name: string, countryId: string) => {
	const options: AxiosRequestConfig = {
		url: update_city_url,
		method: 'POST',
		data: { id: id, name: name, countryId: countryId }
	};

	await axios(options);
};

export const deleteCityApi = async (id: string) => {
	const options: AxiosRequestConfig = {
		url: delete_city_url,
		method: 'POST',
		data: { id: id }
	};

	await axios(options);
};
