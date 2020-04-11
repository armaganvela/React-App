import React, { useCallback, useEffect, useMemo, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../../config/store';
import { changeDraftName, changeDraftMonikerName, setDraftCamp, getCamp, addCamp, updateCamp, clearDraftCamp, fetchCountries, changeDraftCoutry, changeDraftEventDate } from '../logic/actions';
import TextInput from '../../../components/FormComponents/TextInput';
import FormContainer from '../../../components/Containers/FormContainer';
import SelectInput from '../../../components/FormComponents/SelectInput';
import DateTimePicker from '../../../components/FormComponents/DateTimePicker';
import Spinner from '../../../components/Spinner';

const AddEditCamp = () => {
    const monikerName = useSelector(state => state.camp.draftCamp.moniker);
    const name = useSelector(state => state.camp.draftCamp.name);
    const eventDate = useSelector(state => state.camp.draftCamp.eventDate);

    const camps = useSelector(state => state.camp.camps);
    const countries = useSelector(state => state.camp.countries);
    const country = useSelector(state => state.camp.draftCamp.country);
    const visible = useSelector(state => state.services.progress.visible);

    const dispatch = useDispatch();

    const { campId } = useParams();
    const isEditing = !!campId;

    useEffect(() => {
        dispatch(fetchCountries());

        if (isEditing) {
            const camp = camps.find(x => x.id.toString() === campId);
            if (camp)
                dispatch(setDraftCamp(camp));
            else
                dispatch(getCamp(campId!));
        }

        return () => {
            dispatch(clearDraftCamp());
        };
    }, [campId]);

    const onNameChange = useCallback((event: any) => {
        dispatch(changeDraftName(event.currentTarget.value));
    }, []);

    const onMonikerNameChange = useCallback((event: any) => {
        dispatch(changeDraftMonikerName(event.currentTarget.value));
    }, []);

    const onChangeEventDate = useCallback((eventDate?: Date) => {
        dispatch(changeDraftEventDate(eventDate));
    }, []);


    const onCountryChange = useCallback((event: any) => {
        const country = countries.find(x => x.id.toString() === event.currentTarget.value);
        dispatch(changeDraftCoutry(country));
    }, [countries]);

    const onAddCamp = useCallback((event: any) => {
        event.preventDefault();
        dispatch(addCamp());
    }, []);

    const onUpdateCamp = useCallback((event: any) => {
        event.preventDefault();
        dispatch(updateCamp());
    }, []);

    return (
        <>
            {visible &&
                <Spinner />
            }
            {!visible &&
                <FormContainer onSubmit={isEditing ? onUpdateCamp : onAddCamp} title={isEditing ? "Edit" : "Add"}>
                    <TextInput
                        label="Name"
                        value={name}
                        onChange={onNameChange}
                        placeholder="Name"
                    />
                    <TextInput
                        label="Moniker Name"
                        value={monikerName}
                        onChange={onMonikerNameChange}
                        placeholder="Moniker Name"
                    />
                    <SelectInput
                        options={countries.map(country => ({
                            value: country.id,
                            text: country.name
                        }))}
                        label="Countries"
                        value={country ? country.id : ''}
                        onChange={onCountryChange}
                        defaultOption="-Select Country--"
                    />
                    <DateTimePicker date={eventDate} onChangeDateTime={onChangeEventDate} />
                </FormContainer>
            }
        </>
    );
};

export default AddEditCamp;