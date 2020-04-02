import React from 'react';
import { Provider } from 'react-redux';
import { store, useSelector } from './config/store';
import AppRouter from './config/router';
import { ErrorBoundary } from './layout';
import { updateDefaultHeaders } from './processes/auth/logic/api';

const App = () => {
    const accessToken = useSelector(state => state.storage.accessToken);
	updateDefaultHeaders(accessToken);

    return <AppRouter />;
};

export default () => (
    <Provider store={store}>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </Provider>
);
