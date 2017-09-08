
import React, { Component, PropTypes } from 'react';
import clazz from 'classname';
import blacklist from 'util/blacklist';
import './style.scss';

class RadioGroup extends Component {

    static childContextTypes = {
        name: PropTypes.string,
        defaultValue: PropTypes.string
    };

    static propTypes = {
        name: PropTypes.string.isRequired,
        defaultValue: PropTypes.string
    };

    val() {
        return (this.refs.node.querySelector(':checked') || '').value;
    }

    getChildContext() {
        return {
            name: this.props.name,
            defaultValue: this.props.defaultValue
        };
    }

    render() {
        return (
            <div ref="node">
                {this.props.children}
            </div>
        );
    }
}

class Radio extends Component {

    static propTypes = {
        children: PropTypes.any,
        className: PropTypes.string,
        name: PropTypes.string,
        disabled: PropTypes.bool
    };

    static contextTypes = {
        name: PropTypes.string,
        defaultValue: PropTypes.string
    };

    componentDidMount() {
        this.refs.input.checked = this.props.value === this.context.defaultValue;
    }

    componentWillReceiveProps(nextProps) {

        if (this.context.name) {
            this.refs.input.checked = nextProps.value === this.context.defaultValue;
        }
    }

    render() {

        let className = clazz('Radio text-ellipsis', {
            'Radio--disabled': this.props.disabled
        }, this.props.className);
        let props = {...blacklist(this.props, 'className', 'children'), ref: 'input', name: this.props.name || this.context.name};

        return (
            <label className={className}>
                <input type="radio" {...props} />
                <span className="Radio-circle">
                    <span className="Radio-circle-empty"></span>
                    <span className="Radio-circle-full"></span>
                </span>
                {this.props.children}
            </label>
        );
    }
}

export { Radio, RadioGroup };
