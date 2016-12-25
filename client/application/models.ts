export interface State {
    forecast: Forecast;
    loading: boolean;
}

export interface Forecast {
    city: string;
    countryCode: string;
    daysAhead: Array<Array<DateTimeForecast>>;
}

export interface DateTimeForecast {
    date: Date;
    summary: string;
    temperature: number;
    humidity: number;
    pressure: number;
    wind: Wind;
}

export interface Wind {
    speed: number;
    direction: WindDirection;
}

export enum WindDirection {
    SOUTH,
    NORTH,
    WEST, 
    EAST,
    SOUTH_WEST,
    SOUTH_EAST,
    NORTH_WEST,
    NORTH_EAST
}

export enum TemperatureUnit {
    FAHRENHEIT,
    CELSIUS
}