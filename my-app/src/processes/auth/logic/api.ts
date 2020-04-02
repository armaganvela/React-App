import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

import * as urls from '../../../config/urls';

export const updateDefaultHeaders = (accessToken?: string) => {
    // const language = require('../assets/language').default.getLanguage();
    const language = 'en';

    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common.Accept = 'application/json';
    axios.defaults.headers.common['Accept-Language'] = language || 'en';

    let auth = '';
    if (accessToken) {
        auth = `Bearer ${accessToken}`;
    }
    axios.defaults.headers.common.Authorization = auth;
};

export const login_api = (name: string, password: string): Promise<any> => {

	const headers: any = {
		'Content-Type': 'application/x-www-form-urlencoded',
	};
	const body: any = {
		grant_type: 'password',
		userName: name,
		password,
	};
	return axios.post(urls.login_url, qs.stringify(body), headers);
};

