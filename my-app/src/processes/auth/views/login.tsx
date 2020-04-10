import React, { useCallback } from 'react';
import { useDispatch, useSelector } from '../../../config/store';
import { changeName, changePassword, login } from '../logic/actions';
import TextInput from '../../../components/FormComponents/TextInput';

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
             <h2>Login</h2>
            <TextInput
                label="Name"
                value={name}
                onChange={onNameChange}
                placeholder="Name"
            />
            <TextInput
                label="Password"
                value={password}
                onChange={onPasswordChange}
                placeholder="Password"
            />
            <button type="submit" className="btn btn-primary">
                Login
            </button>
        </form>
    );
};

Login.layoutConfig = {
    layout: 'AuthLayout'
}

export default Login;
