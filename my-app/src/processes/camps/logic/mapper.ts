import { Schema } from 'morphism';
import { Camp } from './types';
import moment from 'moment';

export const campMap: Schema<Camp> = {
    id: 'CampId',
    name: 'Name',
    moniker: 'Moniker',
    eventDate: (obj: any) => moment(obj.EventDate).format('YYYY-MM-DD')
};
