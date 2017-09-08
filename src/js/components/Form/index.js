
import React, { Component, PropTypes } from 'react';
import clazz from 'classname';
import blacklist from 'util/blacklist';
import './style.scss';

const FormMixin = {

    contextTypes: {
        form: PropTypes.object,
        value: PropTypes.object
    },

    componentDidMount() {

        var name = this.props.name;
        var value = this.context.value;

        if (value && name) {
            value[name] = () => {
                return this.refs.input.value;
            };
        }

        !this.props.disabled && this.props.validators && this.context.form.addValidation(this.doValidation.bind(this));
    },
};

class Form extends Component {

    static propTypes = {
        className: PropTypes.string
    };

    static childContextTypes = {
        form: PropTypes.object,
        value: PropTypes.object
    };

    state = {
        isValid: false
    };

    validations = [];
    value = {};

    addValidation() {
        return function(validation) {
            this.validations.push(validation);
        }.bind(this);
    }

    getChildContext() {
        return {
            form: {
                addValidation: this.addValidation()
            },
            value: this.value
        };
    }

    componentDidMount(e) {

        this.isValid = () => {

            var promises = [];
            var res;

            this.validations.map(validation => {
                promises.push(validation());
            });

            res = Promise.all(promises);

            res
            .catch(() => {
                /** Anti warnning */
            });

            return res;
        };

        this.series = () => {

            var res = {};

            for (let key in this.value) {
                res[key] = this.value[key]();
            }

            return res;
        };

        this.reset = () => {
            Array.from(this.refs.node.querySelectorAll('.TextField-input')).map(item => {
                item.value = '';
                item.classList.remove('TextField--error');
            });
        };
    }

    render() {

        let className = clazz('Form', this.props.className,);
        let props = blacklist(this.props, 'children', 'className');

        return (
            <div {...props} ref="node" className={className}>
                {this.props.children}
            </div>
        );
    }
}

export { Form, FormMixin };
