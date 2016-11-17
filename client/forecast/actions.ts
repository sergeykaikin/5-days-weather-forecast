import {createAction} from 'redux-actions';
import {request} from '../common/Ajax';
import {WindDirection} from '../application/models';

export const REQUEST_FORECAST = 'REQUEST_FORECAST';
export const SET_FORECAST = 'SET_FORECAST';

function getDegreesDirection(deg: number) {
    if (deg < (45 - 22.5) || deg > (360 - 22.5)) {
        return WindDirection.NORTH;
    } else if (deg >= (45 - 25.5) && deg <= (45 + 25.5)) {
        return WindDirection.NORTH_EAST;
    } else if (deg >= (90 - 25.5) && deg <= (90 + 25.5)) {
        return WindDirection.EAST;
    } else if (deg >= (135 - 25.5) && deg <= (135 + 25.5)) {
        return WindDirection.SOUTH_EAST;
    } else if (deg >= (180 - 25.5) && deg <= (180 + 25.5)) {
        return WindDirection.SOUTH;
    } else if (deg >= (225 - 25.5) && deg <= (225 + 25.5)) {
        return WindDirection.SOUTH_WEST;
    } else if (deg >= (270 - 25.5) && deg <= (270 + 25.5)) {
        return WindDirection.WEST;
    } else if (deg >= (315 - 25.5) && deg <= (315 + 25.5)) {
        return WindDirection.NORTH_WEST;
    }
}

const requestForecast = createAction(REQUEST_FORECAST);
const setForecast = createAction(SET_FORECAST);
const loadForecast = (location: string) => dispatch => {
    dispatch(requestForecast());
    request({url: `forecast?q=${location}`}).
        then((response) => {
            const city = response.data.city;
            let daysAhead = [];
            let lastDay = -1;
            let daysAheadIndex = -1;

            _.forEach(response.data.list, (item) => {
                const date = new Date(item.dt_txt);
                const day = date.getDay();
                const main = item.main;
                const wind = item.wind;

                if (day !== lastDay) {
                    lastDay = day;
                    daysAheadIndex++;
                }

                if (!daysAhead[daysAheadIndex]) {
                    daysAhead[daysAheadIndex] = [];
                }

                daysAhead[daysAheadIndex].push({
                    date,
                    summary: item.weather[0].description,
                    temperature: main.temp,
                    humidity: main.humidity,
                    pressure: main.pressure,
                    wind: {
                        speed: wind.speed,
                        direction: getDegreesDirection(wind.deg)
                    }
                });
            });

            dispatch(setForecast({
                city: city.name,
                countryCode: city.country,
                daysAhead: daysAhead
            }));
        });
}

export {
    requestForecast,
    setForecast,
    loadForecast  
};