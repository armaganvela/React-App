import React from 'react';
import { createBrowserHistory } from 'history';
import { Route, RouteProps, Router, Switch } from 'react-router-dom';

import { Layout, NotFound } from '../layout';
import Camps from '../processes/camps/views/Camps';
import AddEditCamp from '../processes/camps/views/AddEditCamp';
import Talks from '../processes/talks/views/Talks';
import Login from '../processes/auth/views/login';
import AddEditTalk from '../processes/talks/views/AddEditTalk';
import Speakers from '../processes/speakers/views/Speakers';
import AddEditSpeaker from '../processes/speakers/views/AddEditSpeaker';
import Countries from '../processes/country/views/Countries';
import AddEditCountry from '../processes/country/views/AddEditCountry';
import Cities from '../processes/cities/views/Cities';
import AddEditCity from '../processes/cities/views/AddEditCity';
import UnderConstruction from '../layout/UnderConstruction';

export type RouteName = string;

export interface RouteConfig extends RouteProps {
}

export const routes: { [name in RouteName]: RouteConfig } = {
	Camps: { path: '/', component: Camps, exact: true },
	AddCamp: { path: '/camps/add', component: AddEditCamp },
	UpdateCamp: { path: '/camps/edit/:campId', component: AddEditCamp },
	Talks: { path: '/talks', component: Talks, exact: true },
	NewTalks: { path: '/camps/:monikerName/talks', component: Talks, exact: true},
	AddTalk: { path: '/talks/add', component: AddEditTalk },
	UpdateTalk: { path: '/talks/edit/:talkId', component: AddEditTalk },
	Speakers: { path: '/speakers', component: Speakers, exact: true },
	AddSpeaker: { path: '/speakers/add', component: AddEditSpeaker },
	UpdateSpeaker: { path: '/speakers/edit/:speakerId', component: AddEditSpeaker },
	Countries: { path: '/countries', component: Countries, exact: true },
	AddCountry: { path: '/countries/add', component: AddEditCountry },
	UpdateCountry: { path: '/countries/edit/:countryId', component: AddEditCountry },
	Cities: { path: '/cities', component: Cities, exact: true },
	AddCity: { path: '/city/add', component: AddEditCity },
	UpdateCity: { path: '/city/edit/:cityId', component: AddEditCity },
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
