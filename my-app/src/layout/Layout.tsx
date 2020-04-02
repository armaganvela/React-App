import React, { useEffect } from 'react';
import { RouteName, history } from '../config/router';
import { LayoutConfig } from './index';
import AuthLayout from './AuthLayout';
import MainLayout from './MainLayout';
import { useSelector } from '../config/store';

export interface LayoutProps {
	routeName: RouteName;
	layoutConfig?: LayoutConfig;
	children: any;
}

const Layout = (props: LayoutProps) => {
	const isLoggedIn = useSelector((state) => state.storage.isLoggedIn);

	const { routeName, layoutConfig } = props;
	useEffect(() => {
		document.title = layoutConfig?.title || routeName;
	}, [routeName, layoutConfig]);

	useEffect(() => {
		if (!isLoggedIn) {
		  history.replace('Login');	
		}
	}, [isLoggedIn]);

	const RequestedLayout = layoutConfig?.layout === 'AuthLayout' ? AuthLayout : MainLayout;
	return <RequestedLayout {...props} />;
};

export default Layout;
