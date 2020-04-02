import React from 'react';
import { createBrowserHistory } from 'history';
import { Route, RouteProps, Router, Switch } from 'react-router-dom';

import { Layout, NotFound } from '../layout';
import Camps from '../processes/camps/views/Camps';
import AddEditCamp from '../processes/camps/views/AddEditCamp';
import Login from '../processes/auth/views/login';

export type RouteName = string;

export interface RouteConfig extends RouteProps {
}

export const routes: { [name in RouteName]: RouteConfig } = {
	Camps: { path: '/', component: Camps, exact: true },
	AddCamp: { path: '/camps/add', component: AddEditCamp },
	UpdateCamp: { path: '/camps/edit/:campId', component: AddEditCamp },
	Login: { path: '/login', component: Login },
};

export const history = createBrowserHistory({});
export default () => {
	const renderRoutes = Object.entries(routes).map(([key, config]) => {
		const ThePageComponent = config.component as any;
		const component = () => (
			<Layout routeName={key} layoutConfig={ThePageComponent.layoutConfig}>
				<ThePageComponent />
			</Layout>
		);
		return (<Route key={key} {...config} component={component} />);
	});

	return (
		<Router history={history}>
			<Switch>
				{renderRoutes}
				<Route path='/*' component={NotFound} />
			</Switch>
		</Router>
	);
};
