import * as axios from 'axios';
import {apiBaseUrl, appId} from '../application/constants';

const apiEndpoint = axios.create({
    baseURL: apiBaseUrl,
    responseType: 'json'
});

export function request(config: Axios.AxiosXHRConfig<any>) {
    config.url = config.url + `&appid=${appId}`;
    const promise = apiEndpoint.request(config);

    promise.catch((error) => {
        console.error('XHR Error: ', error);
    });

    return promise;
}