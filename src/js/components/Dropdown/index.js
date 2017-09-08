
import React, { Component, PropTypes } from 'react';
import clazz from 'classname';
import './style.scss';

export default class Dropdown extends Component {

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object).isRequired,
        defaultValue: (props, propName, componentName) => {

            var value = props[propName];

            if (value && props.items.indexOf(value) === -1) {

                return new Error(
                    'Invalid prop `' + propName + '` supplied to' +
                        ' `' + componentName + '`. The defaultValue should be a member of items.'
                );
            }
        },
        disabled: PropTypes.bool,
        onSelected: PropTypes.func,
        key4value: PropTypes.string,
        key4text: PropTypes.string
    };

    static defaultProps = {
        key4value: 'value',
        key4text: 'text'
    };

    state = {
        isOpen: false
    };

    onSelected(item) {

        this.setState({
            defaultValue: item,
            isOpen: false
        });
    }

    val() {

        var selected = this.refs.node.querySelector('.Dropdown-item--selected');

        if (selected) {
            return selected.dataset.value;
        }
    }

    toggle(e) {

        var isOpen = !this.state.isOpen;

        if (!!isOpen && e.type === 'blur') {
            return;
        }

        this.setState({
            isOpen
        });

        if (isOpen) {
            /** Use a async ensure the dom has already */
            setTimeout(() => {
                this.refs.list.focus();
            });
        }
    }

    render() {

        var className = clazz('Dropdown', this.props.className, {
            'Dropdown--disabled': this.props.disabled,
            'Dropdown--open': this.state.isOpen
        });
        var {items, key4value, key4text} = this.props;
        var defaultValue = this.state.defaultValue || this.props.defaultValue || items[0];

        return (
            <div className={className} ref="node">
                <div className="Dropdown-title" onClick={this.toggle.bind(this)}>
                    {defaultValue[key4text]}

                    {
                        this.state.isOpen
                        ? <i className="icon-keyboard-arrow-up"></i>
                        : <i className="icon-keyboard-arrow-down"></i>
                    }
                </div>
                <ul className="Dropdown-list" tabIndex="-1" ref="list" onBlur={this.toggle.bind(this)}>
                    {
                        items.map((item, index) => {

                            var text = item[key4text];
                            var value = item[key4value];

                            return (
                                <li
                                className="Dropdown-item"
                                key={index}
                                data-value={value}
                                className={clazz({
                                    'Dropdown-item--selected': item === defaultValue
                                })}
                                onClick={this.onSelected.bind(this, item)}>
                                    <p>{text}</p>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}
