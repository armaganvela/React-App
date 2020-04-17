import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../../config/store';
import TextInput from '../../../components/FormComponents/TextInput';
import FormContainer from '../../../components/Containers/FormContainer';
import Spinner from '../../../components/Spinner';
import { fetchCountries } from '../../camps/logic/actions';
import { clearDraftCountry, getCountry, setDraftCountry, changeDraftName, addCountry, updateCountry } from '../logic/action';

const AddEditCountry = () => {
    const [errors, setErrors] = useState({} as any);

    const name = useSelector(state => state.country.draftCountry.name);

    const countries = useSelector(state => state.country.countries);
    const visible = useSelector(state => state.services.progress.visible);

    const dispatch = useDispatch();

    const { countryId } = useParams();

    const isEditing = !!countryId;

    useEffect(() => {
        dispatch(fetchCountries());

        if (isEditing) {
            const country = countries.find(x => x.id.toString() === countryId);
            if (country)
                dispatch(setDraftCountry(country));
            else
                dispatch(getCountry(countryId!));
        }

        return () => {
            dispatch(clearDraftCountry());
        };
    }, [countryId]);

    const onChangeDraftName = useCallback((event: any) => {
        dispatch(changeDraftName(event.currentTarget.value));
    }, []);

    const onAddCountry = useCallback((event: any) => {
        event.preventDefault();

        if (!formIsValid())
            return;

        dispatch(addCountry());
    }, [name]);

    const onUpdateCountry = useCallback((event: any) => {
        event.preventDefault();

        if (!formIsValid())
            return;

        dispatch(updateCountry());
    }, [name]);

    const formIsValid = useCallback(() => {
        const errors = {} as any;

        if (!name) errors.name = "Name is required.";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }, [name])

    return (
        <>
            {visible &&
                <Spinner />
            }
            {!visible &&
                <FormContainer onSubmit={isEditing ? onUpdateCountry : onAddCountry} title={isEditing ? "Edit" : "Add"}>
                    <TextInput
                        label="Name"
                        value={name}
                        onChange={onChangeDraftName}
                        placeholder="Name"
                        error={errors.name}
                    />
                </FormContainer>
            }
        </>
    );
};

export default AddEditCountry;