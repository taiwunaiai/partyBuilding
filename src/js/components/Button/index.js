
import React, { Component, PropTypes } from 'react';
import clazz from 'classname';
import blacklist from 'util/blacklist';
import './style.scss';

class Button extends Component {

    static propTypes = {

        disabled: PropTypes.bool,
        className: PropTypes.string,
        size: PropTypes.oneOf(['lg', 'sm']),
        color: PropTypes.oneOf(['default', 'primary', 'coral', 'google', 'twitter', 'dribbble', 'success', 'info', 'warnning', 'danger', 'grape', 'bittersweet', 'sunflower', 'grass', 'mint', 'aqua', 'blueJeans', 'lavender', 'pinkRose', 'lightGray', 'mediumGray', 'darkGray']),
        type: PropTypes.oneOf(['outline', 'raised', 'flat'])
    };

    static defaultProps = {
        color: 'default'
    };

    render() {

        var className = clazz('Button',
                this.props.className,
                `Button-color--${this.props.color}`,
                this.props.size ? `Button-size--${this.props.size}` : '',
                this.props.type ? `Button-type--${this.props.type}` : '',
                );
        var props = blacklist(this.props, 'className');

        return (
            <button className={className} {...props} ref="node">
                {this.props.children}
            </button>
        );
    }
}

class IconButton extends Component {

    render() {

        var className = clazz('IconButton', this.props.className);

        return (
            <Button className={className} {...blacklist(this.props, 'className')}>
                {this.props.children}
            </Button>
        );
    }
}

export {Button, IconButton};
