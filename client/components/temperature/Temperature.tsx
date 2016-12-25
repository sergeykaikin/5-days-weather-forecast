import * as React from 'react';
import {TemperatureUnit} from '../../application/models';
import {fahrenheitToCelsius} from '../../common/Utils';

interface TemperatureProps {
    tempInFahrenheit: number;
    unit: TemperatureUnit;
    onUnitChange?: (TemperatureUnit) => void;
}

interface TemperatureState {
    unit: TemperatureUnit;
}

export default class Temperature extends React.Component<TemperatureProps, TemperatureState> {
    private setTemperatureUnitBound = this.setTemperatureUnit.bind(this);

    constructor(props: TemperatureProps) {
        super(props);

        this.state = {
            unit: props.unit
        };
    }

    render() {
        return (
            <div 
                className="Temperature" 
            >
                <div>
                    {this.renderDegrees()}
                    <select 
                        onChange={this.setTemperatureUnitBound}
                        value={TemperatureUnit[this.state.unit]}
                    >
                        <option value={TemperatureUnit[TemperatureUnit.FAHRENHEIT]}>℉</option>
                        <option value={TemperatureUnit[TemperatureUnit.CELSIUS]}>℃</option>
                    </select>
                </div>
            </div>
        );
    }

    private renderDegrees() {
        let degrees;

        if (this.state.unit === TemperatureUnit.FAHRENHEIT) {
            degrees = this.props.tempInFahrenheit;
        } else {
            degrees = fahrenheitToCelsius(this.props.tempInFahrenheit);
        }

        return degrees.toFixed(1);
    }

    private setTemperatureUnit(e: React.SyntheticEvent) {
        let selectedUnit;

        switch ((e.nativeEvent.target as any).value) {
            case TemperatureUnit[TemperatureUnit.FAHRENHEIT]:
                selectedUnit = TemperatureUnit.FAHRENHEIT;
                break;
            case TemperatureUnit[TemperatureUnit.CELSIUS]:
                selectedUnit = TemperatureUnit.CELSIUS;
                break;
        }

        this.setState({
            unit: selectedUnit
        });
        if (this.props.onUnitChange) {
            this.props.onUnitChange(selectedUnit);
        }
    }
}

(Temperature as any).propTypes = {
    tempInFahrenheit: React.PropTypes.number.isRequired,
    unit: React.PropTypes.oneOf([TemperatureUnit.FAHRENHEIT, TemperatureUnit.CELSIUS]).isRequired,
    onUnitChange: React.PropTypes.func
};