import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {routerReducer as routing, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import main from '../forecast/reducers';
import hashHistory from './hashHistory';

const initialState = {};

const reducers = combineReducers({
    routing,
    main
});

export const configureStore = (state) => {
    return createStore(
        reducers,
        state,
        compose.apply(null, [applyMiddleware(thunk /* for async actions */, routerMiddleware(hashHistory))])
    );
}

export const store = configureStore(initialState);