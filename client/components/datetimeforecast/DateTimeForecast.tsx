import * as React from 'react';
import {DateTimeForecast as IDateTimeForecast} from '../../application/models';

import './datetimeforecast.less';

interface DateTimeForecastProps extends IDateTimeForecast {
    onSelect?: (IDateTimeForecast) => void;
}

export default function DateTimeForecast(props: DateTimeForecastProps) {
    return (
        <div 
            className="DateTimeForecast" 
            onClick={() => props.onSelect && props.onSelect(props)}
        >
            <div className="DateTimeForecast-time">
                {props.date.getHours()}:00
            </div>
            <div className="DateTimeForecast-summary">
                {props.summary}
            </div>
        </div>
    );
}