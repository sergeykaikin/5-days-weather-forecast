import * as React from 'react';
import {connect} from 'react-redux';
import Forecast from '../components/forecast/Forecast';
import {State, Forecast as IForecast} from '../application/models';
import {Props} from '../common/Props';
import Loading from '../components/loading/Loading';
import {loadForecast} from './actions';

interface ForecastContainerProps extends State, Props { }

class ForecastContainer extends React.Component<ForecastContainerProps, any> {
    componentDidMount() {
        this.props.dispatch(loadForecast('Riga,Latvia'));
    }

    render() {
        return (
            <div>
                {this.renderForecast()}
            </div>
        );
    }

    private renderForecast() {
        if (this.props.loading) {
            return <Loading />;
        } else {
            return <Forecast {...this.props.forecast}/>;
        }
    }
}

const mapStateToProps = function(state) {
    const localState = (state.main as State);

    return {
        forecast: localState.forecast,
        loading: localState.loading
    };
}

export default connect(mapStateToProps)(ForecastContainer);