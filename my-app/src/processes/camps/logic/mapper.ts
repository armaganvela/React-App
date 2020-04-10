import { Camp, Country } from './types';
import { morphism, Schema } from 'morphism';

export const campMap: Schema<Camp> = {
    id: 'CampId',
    name: 'Name',
    moniker: 'Moniker',
    eventDate: (obj: any) => obj.EventDate,
    country: {
		path: 'Country',
		fn: (value: any) => morphism(countryMap, value),
	},
};

export const countryMap: Schema<Country> = {
    id: 'Id',
    name: 'Name',
};
