import { Country, City } from './types';
import { morphism } from 'morphism';

export const campMap = {
    id: 'CampId',
    name: 'Name',
    moniker: 'Moniker',
    eventDate: (obj: any) => obj.EventDate,
    country: {
        path: 'Country',
        fn: (value: Country) => morphism(countryMap, value),
    },
    city: {
        path: 'City',
        fn: (value: City) => morphism(cityMap, value),
    },
};

export const countryMap = {
    id: 'Id',
    name: 'Name',
};

export const cityMap = {
    id: 'Id',
    name: 'Name',
    country: {
        path: 'Country',
        fn: (value: Country) => morphism(countryMap, value),
    },
};
