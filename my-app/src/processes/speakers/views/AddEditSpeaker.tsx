import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../../config/store';
import TextInput from '../../../components/FormComponents/TextInput';
import FormContainer from '../../../components/Containers/FormContainer';
import Spinner from '../../../components/Spinner';
import { changeDraftCompanyName, changeDraftFirstName, changeDraftLastName, changeDraftMiddleName, fetchSpeakers, setDraftSpeaker, getSpeaker, clearDraftSpeaker, addSpeaker, updateSpeaker } from '../logic/actions';

const AddEditSpeaker = () => {
    const [errors, setErrors] = useState({} as any);

    const firstName = useSelector(state => state.speaker.draftSpeaker.firstName);
    const middleName = useSelector(state => state.speaker.draftSpeaker.middleName);
    const lastName = useSelector(state => state.speaker.draftSpeaker.lastName);
    const company = useSelector(state => state.speaker.draftSpeaker.company);

    const speakers = useSelector(state => state.speaker.speakers);
    const visible = useSelector(state => state.services.progress.visible);

    const dispatch = useDispatch();

    const { speakerId } = useParams();

    const isEditing = !!speakerId;

    useEffect(() => {
        if (isEditing) {
            const speaker = speakers.find(x => x.speakerId.toString() === speakerId);
            if (speaker)
                dispatch(setDraftSpeaker(speaker));
            else
                dispatch(getSpeaker(speakerId!));
        }

        return () => {
            dispatch(clearDraftSpeaker());
        };
    }, [speakerId]);

    const onFirstNameChange = useCallback((event: any) => {
        dispatch(changeDraftFirstName(event.currentTarget.value));
    }, []);

    const onChangeMiddleName = useCallback((event: any) => {
        dispatch(changeDraftMiddleName(event.currentTarget.value));
    }, []);

    const onChangeLastName = useCallback((event: any) => {
        dispatch(changeDraftLastName(event.currentTarget.value));
    }, []);

    const onChangeCompanyName = useCallback((event: any) => {
        dispatch(changeDraftCompanyName(event.currentTarget.value));
    }, []);

    const onAddSpeaker = useCallback((event: any) => {
        event.preventDefault();

        if (!formIsValid())
            return;

        dispatch(addSpeaker());
    }, [lastName, middleName, firstName, company]);

    const onUpdateSpeaker = useCallback((event: any) => {
        event.preventDefault();

        if (!formIsValid())
            return;

        dispatch(updateSpeaker());
    }, [lastName, middleName, firstName, company]);

    const formIsValid = useCallback(() => {
        const errors = {} as any;

        if (!lastName) errors.lastName = "Last Name is required.";
        if (!firstName) errors.firstName = "First Name is required";
        if (!company) errors.company = "Company is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }, [lastName, firstName, company])

    return (
        <>
            {visible &&
                <Spinner />
            }
            {!visible &&
                <FormContainer onSubmit={isEditing ? onUpdateSpeaker : onAddSpeaker} title={isEditing ? "Edit" : "Add"}>
                    <TextInput
                        label="First Name"
                        value={firstName}
                        onChange={onFirstNameChange}
                        placeholder="First Name"
                        error={errors.firstName}
                    />
                    <TextInput
                        label="Middle Name"
                        value={middleName}
                        onChange={onChangeMiddleName}
                        placeholder="Middle Name"
                    />
                    <TextInput
                        label="Last Name"
                        value={lastName}
                        onChange={onChangeLastName}
                        placeholder="Last Name"
                        error={errors.lastName}
                    />
                    <TextInput
                        label="Company"
                        value={company}
                        onChange={onChangeCompanyName}
                        placeholder="Company"
                        error={errors.company}
                    />
                </FormContainer>
            }
        </>
    );
};

export default AddEditSpeaker;