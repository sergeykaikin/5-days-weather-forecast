import {handleActions, Action} from 'redux-actions';
import {REQUEST_FORECAST, SET_FORECAST} from './actions';
import {State} from '../application/models';
import {Forecast} from '../application/models';
import * as _  from 'lodash';

const initialState: State = {
    forecast: {
        city: '',
        countryCode: '',
        daysAhead: []
    },
    loading: false
};

export default handleActions<any>(
    {
        [REQUEST_FORECAST]: requestForecast,
        [SET_FORECAST]: setForecast
    },
    initialState
);

export function requestForecast(state: State) {
    const loading = true;

    return _.assign({}, state, {loading});
}

export function setForecast(state: State, action: Action<Forecast>) {
    const forecast = action.payload;
    const loading = false;

    return _.assign({}, state, {forecast, loading});
}