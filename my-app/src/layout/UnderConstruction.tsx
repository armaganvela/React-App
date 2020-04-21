import React, { useCallback } from 'react';
import { history } from '../config/router';

const UnderConstruction = () => {

    const goToLoginPage = useCallback(() => {
        history.push('/login');
      }, []);

    return (
        <div className="jumbotron">
            <h1 style={{ textAlign: 'center' }}>This page is constructing</h1>
            <p onClick={goToLoginPage}><a>Login Page</a></p>
        </div>
    );
}

UnderConstruction.layoutConfig = {
    layout: 'AuthLayout'
}

export default UnderConstruction;