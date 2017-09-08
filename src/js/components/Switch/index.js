
import React, { Component, PropTypes } from 'react';
import clazz from 'classname';
import blacklist from 'util/blacklist';
import './style.scss';

export default class Switch extends Component {

    static propTypes = {
        className: PropTypes.string
    };

    render() {

        let className = clazz('Switch', this.props.className);
        let props = {...blacklist(this.props, 'className', 'children')};

        return (
            <label className={className}>
                <input type="checkbox" {...props} />
                <span className="Switch--fake"></span>
                {this.props.children}
            </label>
        );
    }
}
