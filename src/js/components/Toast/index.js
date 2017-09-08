
import React, { Component, PropTypes } from 'react';
import Transition from 'react-addons-css-transition-group';
import clazz from 'classname';
import blacklist from 'util/blacklist';
import './style.scss';

export default class Toast extends Component {

    static propTypes = {
        delay: PropTypes.number,
        position: PropTypes.oneOf([
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right'
        ]),
        children: PropTypes.string,
        show: PropTypes.bool,
    };

    static defaultProps = {
        delay: 3000,
        position: 'top-left'
    };

    state = {
        show: false
    };

    hide() {

        var onClose = this.props.onClose;

        this.setState({
            show: false
        });

        typeof onClose === 'function' && onClose();

        clearTimeout(this.timer);
    }

    renderContent() {

        let className = clazz('Toast', `Toast--${this.props.position}`, {
            [`Toast--type-${this.props.type}`]: this.props.type
        });

        if (!this.state.show) {
            return;
        }

        clearTimeout(this.timer);
        this.timer = setTimeout(this.hide.bind(this), this.props.delay);

        return (
            <div className={className}>
                <div className="Toast-message">
                    {this.props.children}
                </div>
                <div className="Toast-undo" onClick={this.hide.bind(this)}>
                    undo
                </div>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {

        if (this.state.show !== nextProps.show
                || this.props.delay !== nextProps.delay
                || this.props.position !== nextProps.position
                || this.props.children !== nextProps.children) {

            this.setState({
                show: nextProps.show
            });
        }
    }

    render() {

        return (
            <Transition transitionName={`Toast--${this.props.position}`} transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                {this.renderContent.bind(this)()}
            </Transition>
        );
    }
}
