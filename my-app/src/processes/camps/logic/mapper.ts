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
    location: { 
        lng: {
            path: 'Longitude',
            fn: (value: any) => Number(value),
        },
        lat: {
            path: 'Latitude',
            fn: (value: any) => Number(value),
        },
     },
     serverFileId: 'AttachmentId',
     fileTitle: 'AttachmentTitle',
     attachmentContent: 'AttachmentContent'
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
