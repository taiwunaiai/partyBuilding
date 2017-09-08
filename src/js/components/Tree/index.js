
import React, { Component, PropTypes } from 'react';
import clazz from 'classname';
import delegate from 'delegate';
import './style.scss';

export default class Tree extends Component {

    static propTypes = {
        rootIds: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
        ]),
        parentKey: PropTypes.string,
        valueKey: PropTypes.string,
        textKey: PropTypes.string,
        checkbox: PropTypes.bool,
        collapsed: PropTypes.bool,
        closeChild: PropTypes.bool,
        onSelected: PropTypes.func,
    };

    static defaultProps = {
        rootIds: '',
        parentKey: 'parentId',
        textKey: 'text',
        valueKey: 'value',
        checkbox: true,
        collapsed: true,
        closeChild: true,
    };

    hash = {};

    componentDidMount() {

        var container = this.refs.node;

        this.renderTree(container, this.props.items, this.props.rootIds);

        delegate(container, '.Tree-icon--open, .Tree-icon--close', 'click', (e) => {

            var node = e.delegateTarget.parentElement.parentElement;
            this[node.classList.contains('Tree-node--close') ? 'open' : 'close'](node);

            e.preventDefault();
            e.stopPropagation();
        });

        delegate(container, '.Tree-node', 'click', (e) => {

            var target = e.delegateTarget;
            var original = window.event.target;
            var item = this.hash[target.dataset.value];

            e.stopPropagation();

            if (this.props.checkbox) {
                if (original.tagName !== 'INPUT') {
                    return;
                }
                this.handleCheckbox(original, item, target);
            }

            if (typeof this.props.onSelected === 'function') {
                this.props.onSelected(item, target, this.refs.node);
            }
        });

        delegate(container, 'input[type=checkbox]', 'click', (e) => {
            var target = e.delegateTarget;
        });
    }

    handleCheckbox(checkbox, item, target) {

        var eles = target.querySelectorAll('input[type=checkbox]');
        var { parentKey, valueKey } = this.props;
        var parentNode = this.refs.node.querySelector(`li[data-value="${(this.hash[item[parentKey]] || {})[valueKey]}"]`);

        function hasValue() {

            let checkboxNode = parentNode.querySelector('.Checkbox');
            let parentCheckbox = checkboxNode.querySelector('input[type=checkbox]');
            let childCheckbox = parentNode.querySelector('ul').querySelectorAll('input[type=checkbox]');
            let checked = Array.from(childCheckbox).filter(ele => ele.checked);

            if (parentCheckbox.checked = (checked.length === childCheckbox.length)) {
            } else if (checked.length) {
                checkboxNode.classList.add('Checkbox--hasvalue');
            } else {
                checkboxNode.classList.remove('Checkbox--hasvalue');
            }
        }

        Array.from(eles).filter((ele) => ele !== checkbox).map((ele) => ele.checked = checkbox.checked);

        parentNode && hasValue();
    }

    open(node) {

        node.classList.remove('Tree-node--close');
        node.classList.add('Tree-node--open');
    }

    close(node) {

        node.classList.remove('Tree-node--open');
        node.classList.add('Tree-node--close');

        if (this.props.closeChild) {
            Array.from(node.querySelectorAll('.Tree-node--open')).map((ele) => {
                ele.classList.add('Tree-node--close');
                ele.classList.remove('Tree-node--open');
            });
        }
    }

    renderNode(item) {

        var { valueKey, textKey } = this.props;

        if (!this.props.checkbox) {

            return `
                ${item[textKey]}
            `;
        }

        return `
            <label class="Tree-checkbox Checkbox">
                <input type="checkbox">
                <span class="Checkbox-square">
                    <span class="Checkbox-square-empty"></span>
                    <span class="Checkbox-square-full"></span>
                    <span class="Checkbox-ink"></span>
                </span>
                ${item[textKey]}
            </label>
        `;
    }

    renderTree(ele, items, root, level = 1) {

        var { parentKey, textKey, valueKey, collapsed, checkbox } = this.props;
        var html = '';

        for (var i = 0; i < items.length; ++i) {

            var item = items[i];

            this.hash[item[valueKey]] = item;

            if (item[parentKey] == root) {

                let text = item[textKey];

                items.splice(i--, 1);

                html += `
                    <li class="Tree-node ${collapsed ? 'Tree-node--close' : 'Tree-node--open'}"
                    data-level="${level}"
                    data-value="${item[valueKey]}"
                    data-filter="${text.toLowerCase()}">
                        <p class="clearfix" style="padding-left: ${(level - 1) * 2}em;">
                            <i class="Tree-icon--close icon-remove"></i>
                            <i class="Tree-icon--open icon-add"></i>
                            ${this.renderNode(item)}
                        </p>
                    </li>
                `;
            }
        }

        /** Render the children node */
        if (html) {
            let wrapper = document.createElement('div');

            wrapper.innerHTML = html;

            Array.from(wrapper.querySelectorAll('.Tree-node')).map((ele) => {
                return this.renderTree(ele, items, ele.dataset.value, level + 1);
            });

            ele.innerHTML = ele.innerHTML + '<ul>' + wrapper.innerHTML + '</ul>';
        } else {
            ele.classList.remove('Tree-node--open', 'Tree-node--close');
            ele.classList.add('Tree-node--orphan');
        }
    }

    render() {

        var className = clazz('Tree', this.props.className);

        return (
            <div className={className} ref="node"></div>
        );
    }
}
