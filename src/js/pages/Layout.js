
import React, { Component, PropTypes } from 'react';

export default class Layout extends Component {

    static props = {
        children: PropTypes.element.isRequired
    };

    render() {

        const { toast, closeToast } = this.props;

        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
