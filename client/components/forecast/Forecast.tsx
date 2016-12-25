import * as React from 'react';
import * as _ from 'lodash';
import {Forecast as IForecast, DateTimeForecast as IDateTimeForecast} from '../../application/models';
import DateTimeForecast from '../datetimeforecast/DateTimeForecast';
import Temperature from '../temperature/Temperature';
import {WindDirection, TemperatureUnit} from '../../application/models';
import * as Store from 'store';

import './forecast.less';

interface ForecastProps extends IForecast { }

interface ForecastState {
    showingDaysAhead?: number;
    selected3HoursForecast?: IDateTimeForecast;
    temperatureUnit?: TemperatureUnit
}

export default class Forecast extends React.Component<ForecastProps, ForecastState> {
    private render3HoursForecastBound = this.render3HoursForecast.bind(this);

    constructor(props: ForecastProps) {
        super(props);

        const temperatureUnit = Store.get('temperature-unit');

        this.state = {
            showingDaysAhead: 0,
            selected3HoursForecast: this.getFirstDaysAheadForecast(0),
            temperatureUnit: _.isUndefined(temperatureUnit) ? TemperatureUnit.FAHRENHEIT : temperatureUnit
        };
    }

    render() {
        const selected3HoursForecast = this.state.selected3HoursForecast;

        return (
            <div className="Forecast">
                <div className="Forecast__left">
                    <button 
                        className="Forecast__left-button"
                        disabled={this.state.showingDaysAhead < 1}
                        onClick={() => this.navigateToNDaysAhead(this.state.showingDaysAhead - 1)}
                    >
                        &lt;
                    </button>
                </div>
                <div className="Forecast__main">
                    <div className="Forecast__main-city">
                        {this.props.city}
                    </div>
                    <div className="Forecast__main-countryCode">
                        {this.props.countryCode}
                    </div>
                    <div className="Forecast__main-dateAndTime">
                        {selected3HoursForecast && selected3HoursForecast.date.toLocaleString()}
                    </div>
                    <div className="Forecast__main__values">
                        <div className="Forecast__main__values__item">
                            {selected3HoursForecast ? this.renderTemperature(selected3HoursForecast.temperature) : null}
                        </div>
                        <div className="Forecast__main__values__item">
                            <div className="Forecast__main__values__item-label">Humidity (%):</div>
                            {selected3HoursForecast && selected3HoursForecast.humidity}
                        </div>
                        <div className="Forecast__main__values__item">
                            <div className="Forecast__main__values__item-label">Pressure (mbar):</div>
                            {selected3HoursForecast && selected3HoursForecast.pressure}
                        </div>
                        <div className="Forecast__main__values__item">
                            <div className="Forecast__main__values__item-label">Wind:</div>
                            {selected3HoursForecast && selected3HoursForecast.wind.speed} mph
                            <br />
                            {selected3HoursForecast && this.getDirection(selected3HoursForecast.wind.direction)}
                        </div>
                    </div>
                    {this.render3HoursForecasts()}
                </div>
                <div className="Forecast__right">
                    <button 
                        className="Forecast__right-button"
                        disabled={this.state.showingDaysAhead > 3}
                        onClick={() => this.navigateToNDaysAhead(this.state.showingDaysAhead + 1)}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        );
    }
    
    private getFirstDaysAheadForecast(daysAhead: number) {
        return this.props.daysAhead.length ? _.first(this.props.daysAhead[daysAhead]) : undefined;
    }

    private navigateToNDaysAhead(daysAhead: number) {
        this.setState({
            showingDaysAhead: daysAhead,
            selected3HoursForecast: this.getFirstDaysAheadForecast(daysAhead)
        });
    }

    private render3HoursForecasts() {
        const forecasts = this.props.daysAhead[this.state.showingDaysAhead];
        
        return (
            <div className="Forecast__main__3HoursForecast">
                {_.map(forecasts, this.render3HoursForecastBound)}
            </div>
        );
    }

    private render3HoursForecast(forecast: IDateTimeForecast) {
        return <DateTimeForecast 
            key={forecast.date.toString()}
            {...forecast} 
            onSelect={(forecast) => this.select3HoursForecast(forecast)} 
        />;
    }

    private select3HoursForecast(forecast: IDateTimeForecast) {
        this.setState({
            selected3HoursForecast: forecast
        });
    }

    private getDirection(direction: WindDirection) {
        switch (direction) {
            case WindDirection.SOUTH:
                return 'South';
            case WindDirection.NORTH:
                return 'North';
            case WindDirection.EAST:
                return 'EAST';
            case WindDirection.WEST:
                return 'West';
            case WindDirection.SOUTH_EAST:
                return 'South East';
            case WindDirection.SOUTH_WEST:
                return 'South West';
            case WindDirection.NORTH_EAST:
                return 'North East';
            case WindDirection.NORTH_WEST:
                return 'North West';
        }
    }

    private renderTemperature(tempInFahrenheit: number) {
        return (
            <Temperature 
                tempInFahrenheit={tempInFahrenheit} 
                unit={this.state.temperatureUnit}
                onUnitChange={(u) => this.setTemperatureUnit(u)}
            />
        );
    }

    private setTemperatureUnit(unit: TemperatureUnit) {
        Store.set('temperature-unit', unit);
        this.setState({
            temperatureUnit: unit
        });
    }
}

(Forecast as any).propTypes = {
    city: React.PropTypes.string.isRequired,
    countryCode: React.PropTypes.string.isRequired,
    daysAhead: React.PropTypes.array.isRequired
};