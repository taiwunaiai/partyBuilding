
import React, { Component, PropTypes } from 'react';
import clazz from 'classname';
import blacklist from 'util/blacklist';
import './style.scss';

class CheckboxGroup extends Component {

    static childContextTypes = {
        name: PropTypes.string
    };

    static propTypes = {
        name: PropTypes.string
    };

    val() {

        var res = [];

        Array.from(this.refs.node.querySelectorAll(':checked') || []).map((ele) => {
            res.push(ele.value);
        });

        return res;
    }

    getChildContext() {
        return {
            name: this.props.name
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

class Checkbox extends Component {

    static propTypes = {
        children: PropTypes.any,
        className: PropTypes.string
    };

    static contextTypes = {
        name: PropTypes.string
    };

    render() {

        let className = clazz('Checkbox', this.props.className);
        let props = {...blacklist(this.props, 'className', 'children'), ref: 'input', name: this.context.name || this.props.name};

        return (
            <label className={className}>
                <input type="checkbox" {...props} />
                <span className="Checkbox-square">
                    <span className="Checkbox-square-empty"></span>
                    <span className="Checkbox-square-full"></span>
                    <span className="Checkbox-ink"></span>
                </span>
                {this.props.children}
            </label>
        );
    }
}

export { Checkbox, CheckboxGroup };
