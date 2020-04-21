import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../../config/store';
import TextInput from '../../../components/FormComponents/TextInput';
import FormContainer from '../../../components/Containers/FormContainer';
import Spinner from '../../../components/Spinner';
import { setDraftCity, getCity, clearDraftCity, fetchCountries, changeDraftName, addCity, updateCity, changeDraftCountry } from '../logic/actions';
import SelectInput from '../../../components/FormComponents/SelectInput';

const AddEditCity = () => {
    const [errors, setErrors] = useState({} as any);

    const name = useSelector(state => state.city.draftCity.name);
    const country = useSelector(state => state.city.draftCity.country);

    const cities = useSelector(state => state.city.cities);
    const countries = useSelector(state => state.city.countries);
    const visible = useSelector(state => state.services.progress.visible);

    const dispatch = useDispatch();

    const { cityId } = useParams();

    const isEditing = !!cityId;

    useEffect(() => {
        dispatch(fetchCountries());

        if (isEditing) {
            const city = cities.find(x => x.id.toString() === cityId);
            if (city)
                dispatch(setDraftCity(city));
            else
                dispatch(getCity(cityId!));
        }

        return () => {
            dispatch(clearDraftCity());
        };
    }, [cityId]);

    const onChangeDraftName = useCallback((event: any) => {
        dispatch(changeDraftName(event.currentTarget.value));
    }, []);

    const onCountryChange = useCallback((event: any) => {
        const country = countries.find(x => x.id.toString() === event.currentTarget.value);
        dispatch(changeDraftCountry(country));
    }, [countries]);

    const onAddCity = useCallback((event: any) => {
        event.preventDefault();

        if (!formIsValid())
            return;

        dispatch(addCity());
    }, [name]);

    const onUpdateCity = useCallback((event: any) => {
        event.preventDefault();

        if (!formIsValid())
            return;

        dispatch(updateCity());
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
                <FormContainer onSubmit={isEditing ? onUpdateCity : onAddCity} title={isEditing ? "Edit" : "Add"}>
                    <TextInput
                        label="Name"
                        value={name}
                        onChange={onChangeDraftName}
                        placeholder="Name"
                        error={errors.name}
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
                </FormContainer>
            }
        </>
    );
};

export default AddEditCity;