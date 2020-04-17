import React, { useCallback, useEffect, useMemo, ChangeEvent, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../../config/store';
import { changeDraftAbstract, changeDraftSpeaker, changeDraftTitle, getAllSpeakers, clearDraftTalk, setDraftTalk, getTalk, getAllCamps, changeDraftCamp, addTalk, updateTalk } from '../logic/actions';
import TextInput from '../../../components/FormComponents/TextInput';
import FormContainer from '../../../components/Containers/FormContainer';
import SelectInput from '../../../components/FormComponents/SelectInput';
import Spinner from '../../../components/Spinner';

const AddEditTalk = () => {
    const [errors, setErrors] = useState({} as any);

    const abstract = useSelector(state => state.talk.draftTalk.abstract);
    const title = useSelector(state => state.talk.draftTalk.title);
    const speaker = useSelector(state => state.talk.draftTalk.speaker);
    const speakers = useSelector(state => state.talk.speakers);
    const camp = useSelector(state => state.talk.draftTalk.camp);
    const camps = useSelector(state => state.talk.camps);
    const talks = useSelector(state => state.talk.talks);
    const visible = useSelector(state => state.services.progress.visible);

    const dispatch = useDispatch();

    const { talkId } = useParams();

    const isEditing = !!talkId;

    useEffect(() => {
        dispatch(getAllSpeakers());
        dispatch(getAllCamps())

        if (isEditing) {
            const talk = talks.find(x => x.talkId.toString() === talkId);

            if (talk)
                dispatch(setDraftTalk(talk));
            else
                dispatch(getTalk(talkId!));
        }

        return () => {
            dispatch(clearDraftTalk());
        };
    }, [talkId]);

    const onTitleChange = useCallback((event: any) => {
        dispatch(changeDraftTitle(event.currentTarget.value));
    }, []);

    const onAbstractChange = useCallback((event: any) => {
        dispatch(changeDraftAbstract(event.currentTarget.value));
    }, []);

    const onSpeakerChange = useCallback((event: any) => {
        const speaker = speakers.find(x => x.speakerId.toString() === event.currentTarget.value);
        dispatch(changeDraftSpeaker(speaker));
    }, [speakers]);

    const onCampChange = useCallback((event: any) => {
        const camp = camps.find(x => x.id.toString() === event.currentTarget.value);
        dispatch(changeDraftCamp(camp));
    }, [camps]);

    const onAddTalk = useCallback((event: any) => {
        event.preventDefault();
        if (!formIsValid())
            return;

        dispatch(addTalk());
    }, [title, abstract, speaker, camp]);

    const onUpdateTalk = useCallback((event: any) => {
        event.preventDefault();
        if (!formIsValid())
            return;

        dispatch(updateTalk());
    }, [title, abstract, speaker, camp]);

     const formIsValid = useCallback(() => {
        const errors = {} as any;

        if (!title) errors.title = "Title is required.";
        if (!abstract) errors.abstract = "Abstract is required";
        if (!speaker) errors.speaker = "Speaker is required";
        if (!camp) errors.camp = "Camp is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }, [title, abstract, speaker, camp]);

    return (
        <>
            {visible &&
                <Spinner />
            }
            {!visible &&
                <FormContainer onSubmit={isEditing ? onUpdateTalk : onAddTalk} title={isEditing ? "Edit" : "Add"}>
                    <TextInput
                        label="Title"
                        value={title}
                        onChange={onTitleChange}
                        placeholder="Title"
                        error={errors.title}
                    />
                    <TextInput
                        label="Abstract"
                        value={abstract}
                        onChange={onAbstractChange}
                        placeholder="Abstract"
                        error={errors.abstract}
                    />
                    <SelectInput
                        options={speakers.map(speaker => ({
                            value: speaker.speakerId,
                            text: speaker.firstName
                        }))}
                        label="Speakers"
                        value={speaker ? speaker.speakerId : ''}
                        onChange={onSpeakerChange}
                        defaultOption="-Select Speker-"
                        error={errors.speaker}
                    />
                    <SelectInput
                        options={camps.map(camp => ({
                            value: camp.id,
                            text: camp.name
                        }))}
                        label="Camps"
                        value={camp ? camp.id : ''}
                        onChange={onCampChange}
                        defaultOption="-Select Camp-"
                        error={errors.camp}
                    />
                </FormContainer>
            }
        </>
    );
};

export default AddEditTalk;