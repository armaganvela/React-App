import React, { useCallback } from 'react';
import { LayoutProps } from './Layout';
import AppBar from '../components/AppBar';
import SnackBar from '../components/Snackbar'
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from '../config/store';
import { clearAlert } from '../processes/services/logic/actions';

const MainLayout = (props: LayoutProps) => {
	const { children } = props;

	const dispatch = useDispatch();

	const visible = useSelector(state => state.services.alert.visible);
	const message = useSelector(state => state.services.alert.message);
	const type = useSelector(state => state.services.alert.type);

	const onCloseSnackbar = useCallback(() => {
		dispatch(clearAlert());
	}, []);

	return <div className='main-layout'>
		<AppBar />
		<SnackBar visible={visible} message={message} onCloseSnackbar={onCloseSnackbar} alertType={type} />
		<Container>
			{children}
		</Container>
	</div>;
};

export default MainLayout;
