import React, { useCallback } from 'react';
import { LayoutProps } from './Layout';
import { useDispatch, useSelector } from '../config/store';
import { clearAlert } from '../processes/services/logic/actions';
import CustomizedSnackbars from '../components/Toast';
import NavBar from '../components/NavBar';
import { logout } from '../processes/auth/logic/actions';

const MainLayout = (props: LayoutProps) => {
	const { children } = props;

	const dispatch = useDispatch();

	const visible = useSelector(state => state.services.alert.visible);
	const message = useSelector(state => state.services.alert.message);
	const type = useSelector(state => state.services.alert.type);

	const onCloseSnackbar = useCallback(() => {
		dispatch(clearAlert());
	}, []);

	const onClickLogout = () => {
		dispatch(logout());
	}

	return <>
		<NavBar onClickLogout={onClickLogout} />
		<div className="container-fluid" style={{maxWidth: '1000px'}}> 
			{children}
		</div>
		<CustomizedSnackbars alertType={type} message={message} onCloseSnackbar={onCloseSnackbar} visible={visible} />
	</>;
};

export default MainLayout;
