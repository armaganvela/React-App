import { morphism } from "morphism";
import { campMap } from "../../camps/logic/mapper";

export const talkMap = {
    talkId: 'TalkId',
    title: 'Title',
    abstract: 'Abstract',
    speaker: {
        path: 'Speaker',
        fn: (value: any) => morphism(speakerMap, value),
    },
    camp: {
        path: 'Camp',
        fn: (value: any) => morphism(campMap, value),
    },
};

export const speakerMap = {
    speakerId: 'SpeakerId',
    company: 'Company',
    firstName: 'FirstName',
    lastName: 'LastName',
    middleName: 'MiddleName'
};
