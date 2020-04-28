import React, { useCallback, useEffect, useMemo, ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../../config/store';
import { changeDraftName, changeDraftMonikerName, getCamp, addCamp, updateCamp, clearDraftCamp, fetchCountries, changeDraftCoutry, changeDraftEventDate, changeDraftCity, fetchCities, changeDraftLocation, changeDraftFile } from '../logic/actions';
import TextInput from '../../../components/FormComponents/TextInput';
import FormContainer from '../../../components/Containers/FormContainer';
import SelectInput from '../../../components/FormComponents/SelectInput';
import DateTimePicker from '../../../components/FormComponents/DateTimePicker';
import Spinner from '../../../components/Spinner';
import GoogleMapComponent from '../../../components/GoogleMap';
import DropZone from '../../../components/DropZoneComponent';

const AddEditCamp = () => {
    const [errors, setErrors] = useState({} as any);

    const monikerName = useSelector(state => state.camp.draftCamp.moniker);
    const name = useSelector(state => state.camp.draftCamp.name);
    const eventDate = useSelector(state => state.camp.draftCamp.eventDate);
    const location = useSelector(state => state.camp.draftCamp.location);
    const fileTitle = useSelector(state => state.camp.draftCamp.fileTitle);
    const attachmentContent = useSelector(state => state.camp.draftCamp.attachmentContent);

    const countries = useSelector(state => state.camp.countries);
    const country = useSelector(state => state.camp.draftCamp.country);

    const cities = useSelector(state => state.camp.cities);
    const city = useSelector(state => state.camp.draftCamp.city);
    const visible = useSelector(state => state.services.progress.visible);

    const dispatch = useDispatch();

    const { campId } = useParams();

    const isEditing = !!campId;

    useEffect(() => {
        dispatch(fetchCountries());

        if (isEditing) {
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
        dispatch(fetchCities(country?.id));
    }, [countries]);

    const onCityChange = useCallback((event: any) => {
        const city = cities.find(x => x.id.toString() === event.currentTarget.value);
        dispatch(changeDraftCity(city));
    }, [cities]);

    const onFileChange = useCallback((file?: File) => {
        dispatch(changeDraftFile(file));
    }, [cities]);

    const onAddCamp = useCallback((event: any) => {
        event.preventDefault();
        if (!formIsValid())
            return;

        dispatch(addCamp());
    }, [name, monikerName]);

    const onUpdateCamp = useCallback((event: any) => {
        event.preventDefault();
        if (!formIsValid())
            return

        dispatch(updateCamp());
    }, [name, monikerName]);

    const formIsValid = useCallback(() => {
        const errors = {} as any;

        if (!name) errors.name = "Name is required.";
        if (!monikerName) errors.monikerName = "Moniker Name is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }, [name, monikerName]);


    const handleClickMaps = useCallback((e: any) => {
        let latitude = e.latLng.lat();
        let longtitude = e.latLng.lng();
        dispatch(changeDraftLocation({ lng: longtitude, lat: latitude }));
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
                        error={errors.name}
                    />
                    <TextInput
                        label="Moniker Name"
                        value={monikerName}
                        onChange={onMonikerNameChange}
                        placeholder="Moniker Name"
                        error={errors.monikerName}
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
                    <SelectInput
                        options={cities.map(city => ({
                            value: city.id,
                            text: city.name
                        }))}
                        label="Cities"
                        value={city ? city.id : ''}
                        onChange={onCityChange}
                        defaultOption="-Select City--"
                    />
                    <DateTimePicker date={eventDate} onChangeDateTime={onChangeEventDate} label="Event Date" placeHolder="Select Event Date" />
                    <DropZone title={fileTitle} attachmentContent={attachmentContent} onDrop={onFileChange} />
                    
                    <label>Select Location</label>
                    <GoogleMapComponent
                        label="Location"
                        location={location}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCsVEt7az6zvhO-yXgvLiVJdRUTfp12eNI"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px`, marginTop: '10px', marginBottom: '30px' }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        onClick={handleClickMaps}
                    />
                </FormContainer>
            }
        </>
    );
};

export default AddEditCamp;