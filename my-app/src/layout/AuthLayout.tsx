import React from 'react';
import { LayoutProps } from './Layout';
import { Container } from '@material-ui/core';

const AuthLayout = (props: LayoutProps) => {
	const { children } = props;
	return <div className='auth-layout'>
		<Container>
			{children}
		</Container>
	</div>;
};

export default AuthLayout;
