import { Camp, Country } from './types';
import { morphism, Schema } from 'morphism';

export const campMap = {
    id: 'CampId',
    name: 'Name',
    moniker: 'Moniker',
    eventDate: (obj: any) => obj.EventDate,
    country: {
        path: 'Country',
        fn: (value: Country) => morphism(countryMap, value),
    },
};

export const countryMap = {
    id: 'Id',
    name: 'Name',
};
