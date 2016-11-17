import * as React from 'react';
import {Link} from 'react-router';

export default class Application extends React.Component<any, any> {
    render() {
        return (
            <div className="Application">
                <header></header>
                <section>
                    {this.props.children}
                </section>
                <footer>
                    &copy; Sergey Kaikin
                </footer>
            </div>
        );
    }
}