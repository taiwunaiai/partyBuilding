
import React, { Component, PropTypes } from 'react';
import clazz from 'classname';
import ReactMixin from 'react-mixin';
import { FormMixin } from 'components/Form';
import blacklist from 'util/blacklist';
import validators from 'util/validators';
import noop from 'util/noop';
import './style.scss';

const DEFAULT_ERROR_MESSAGE = '请填写正确的内容';

@ReactMixin.decorate(FormMixin)
export default class TextField extends Component {

    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        multiline: PropTypes.bool,
        silent: PropTypes.bool,
        size: PropTypes.oneOf(['lg', 'sm']),
        validators: PropTypes.array,
        defaultValue: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        errorMessages: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ])
    };

    static defaultProps = {
        type: 'text',
        multiple: false,
        silent: false,
        defaultValue: '',
        errorMessages: {}
    };

    state = {
        isValid: true,
        errorMessage: ''
    };

    componentDidMount() {
        this.refs.input.value = this.props.defaultValue;
    }

    getErrorMessage(key) {

        var errorMessages = this.props.errorMessages;

        if ('string' === typeof errorMessages) {
            return errorMessages;
        }

        return errorMessages[key] || DEFAULT_ERROR_MESSAGE;
    }

    validation(rule, value) {

        var res;

        switch (typeof rule) {

            case 'string':
                res = (validators[rule] || noop)(value, this.refs.input);
                this.errorMessage = this.getErrorMessage.bind(this)(rule);
                break;

            case 'function':
                var message = this.props.errorMessages;
                res = rule(value, this.refs.input);
                this.errorMessage = typeof message === 'string' ? message : DEFAULT_ERROR_MESSAGE;
                break;

            case 'object':
                let key = Object.keys(rule)[0];
                let fn = validators[key] || noop;
                let args = rule[key];
                res = !!fn.bind(validators)(value, this.refs.input, args);
                this.errorMessage = this.getErrorMessage.bind(this)(key);
                break;

            default:
                return true;
        }

        return res;
    }

    doValidation() {

        var _validators = this.props.validators;
        var promises = [];
        var res;

        if (!_validators) {
            return;
        }

        for (var i = 0, length = _validators.length; i < length; ++i) {

            res = this.validation.bind(this)(_validators[i], this.refs.input.value);
            promises.push(res);

            if (typeof res === 'boolean') {
                ((res) => {
                    promises.push(new Promise((resolve, reject) => {
                        (res ? resolve : reject)(this.errorMessage);
                    }));
                })(res);
            } else {
                promises.push(res);
            }
        }

        res = Promise.all(promises);

        res
        .then(() => {
            this.setState({
                isValid: true
            });
        })
        .catch((errorMessage) => {
            this.setState({
                isValid: false,
                errorMessage
            });
        });

        return res;
    }

    render() {

        let className = clazz('TextField', this.props.className, this.props.size ? `TextField--${this.props.size}` : '', {
            'TextField--error': !this.props.silent && !this.state.isValid,
            'TextField-validation': this.props.validators
        });
        let Element = this.props.multiline ? 'textarea' : 'input';
        let props = blacklist({...this.props, ref: 'input'}, 'children', 'multiline', 'validators', 'errorMessages', 'className', 'silent');

        return (
            <div className={className} ref="node">
                <Element {...props} className="TextField-input" onBlur={this.doValidation.bind(this)} ref="input" />
                {this.props.children}
                <small className="TextField-message">{this.state.errorMessage}</small>
            </div>
        );
    }
}
