import React, { FormEvent, useCallback } from 'react';
import { useDispatch, useSelector } from '../../../config/store';
import { changeName, changePassword, login } from '../logic/actions';
import { FormControl, InputLabel, Input, TextField, Container, Button } from '@material-ui/core';

const Login = () => {
    const dispatch = useDispatch();

    const name = useSelector(state => state.auth.name);
    const password = useSelector(state => state.auth.password);

    const onNameChange = useCallback((event: any) => {
        dispatch(changeName(event.currentTarget.value));
    }, [dispatch]);

    const onPasswordChange = useCallback((event: any) => {
        dispatch(changePassword(event.currentTarget.value));
    }, [dispatch]);

    const onLoginClick = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        dispatch(login());
    }, [dispatch]);

    return (
        <form
            onSubmit={onLoginClick}
        >
                <TextField id="standard-basic" label="Name" value={name} onChange={onNameChange} />
                <br />
                <TextField id="standard-basic" label="Password" value={password} onChange={onPasswordChange} />
                <br />
                <Button type="submit" color="primary" onClick={onLoginClick}>
                    Login
                </Button>
        </form>
    );
};

Login.layoutConfig = {
    layout : 'AuthLayout'
}

export default Login;
