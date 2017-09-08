
import React, { Component, PropTypes } from 'react';
import Transition from 'react-addons-css-transition-group';
import clazz from 'classname';
import blacklist from 'util/blacklist';
import './style.scss';

export default class Button extends Component {

    static PropTypes = {
        fullscreen: PropTypes.bool,
        show: PropTypes.bool
    };

    static defaultProps = {
        fullscreen: false
    };

    renderContent() {

        if (!this.props.show) {
            return;
        }

        var className = clazz('Loader', this.props.className, {
            'Loader--fullscreen': this.props.fullscreen
        });

        return (
            <div className={className} {...blacklist(this.props, 'className', 'show', 'fullscreen')}>
                <svg className="Loader-circular">
                    <circle className="Loader-path" cx="50" cy="50" r="20" fill="none" strokeWidth="5" strokeMiterlimit="10"></circle>
                </svg>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Transition transitionName="Loader" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {this.renderContent.call(this)}
                </Transition>
            </div>
        );
    }
}
