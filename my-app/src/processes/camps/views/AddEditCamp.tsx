import React, { useCallback, useEffect, useMemo, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { useSelector, useDispatch } from '../../../config/store';
import { changeDraftName, changeDraftMonikerName, changeDraftEventDate, setDraftCamp, getCamp, addCamp, updateCamp, clearDraftCamp } from '../logic/actions';
import { TextField, Button } from '@material-ui/core';
import DateTimePicker from '../../../components/DateTimePicker';

const AddEditCamp = () => {
    const monikerName = useSelector(state => state.camp.draftCamp.moniker);
    const name = useSelector(state => state.camp.draftCamp.name);
    const eventDate = useSelector(state => state.camp.draftCamp.eventDate);
    const camps = useSelector(state => state.camp.camps);

    const dispatch = useDispatch();

    const { campId } = useParams();
    const isEditing = !!campId;

    useEffect(() => {
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

    const onEventDateChange = useCallback((event: any) => {
        dispatch(changeDraftEventDate(event.currentTarget.value));
    }, []);

    const onAddCamp = useCallback((event: any) => {
        event.preventDefault();
        dispatch(addCamp());
    }, []);

    const onUpdateCamp = useCallback((event: any) => {
        event.preventDefault();
        dispatch(updateCamp());
    }, []);

    return (
        <form
            onSubmit={() => { }}
        >
            <TextField id="standard-basic" label="Name" value={name} onChange={onNameChange} />
            <br />
            <TextField id="standard-basic" label="MonikerName" value={monikerName} onChange={onMonikerNameChange} />
            <br />
            <DateTimePicker eventDate={eventDate} onChangeEventDate={onEventDateChange} />
            <br />
            <Button type="submit" color="primary" onClick={isEditing ? onUpdateCamp : onAddCamp}>
                {isEditing ? 'Update' : 'Add'}
            </Button>
        </form>
    );
};

export default AddEditCamp;