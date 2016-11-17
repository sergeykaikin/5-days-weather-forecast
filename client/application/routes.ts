import {PlainRoute, RouterState} from 'react-router';
import {push} from 'react-router-redux';
import * as _ from  'lodash';
import Application from './Application';
import Forecast from '../forecast/Forecast';

export const routes: PlainRoute = {
    path: '/',
    component: Application,
    indexRoute: {
        component: Forecast
    },
    childRoutes: [
        {
            path: '*',
            onEnter: (state: RouterState, replace) => {
                replace('/');
            }
        }
    ]
};