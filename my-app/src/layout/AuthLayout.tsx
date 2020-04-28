import React from 'react';
import { LayoutProps } from './Layout';

const AuthLayout = (props: LayoutProps) => {
	const { children } = props;
	return <div className="container-fluid" style={{ maxWidth: '600px' }}>
		{children}
	</div>;
};

export default AuthLayout;
