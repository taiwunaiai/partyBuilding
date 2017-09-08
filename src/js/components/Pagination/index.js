
import React, { Component, PropTypes } from 'react';
import clazz from 'classname';
import './style.scss';

export default class Pagination extends Component {

    static propTypes = {
        index: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        onPageChange: PropTypes.func
    };

    pageChange(e) {

        var index = e.target.getAttribute('data-index');
        var fn = this.props.onPageChange;

        if (e.target.tagName === 'A' && +index) {
            fn(index);
        }
    }

    componentDidMount() {
        this.renderContent(this.props.index, this.props.total);
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.index !== nextProps.index
            || this.props.total !== nextProps.total) {
            this.renderContent(nextProps.index, nextProps.total);
        }
    }

    renderContent(index = this.props.index, total = this.props.total) {

        var page = [];
        var head = '';
        var tail = '';

        if (total <= 7) {
            for (var i = 1; i <= total; page += ' ' + i++ );
        } else {

            /** Need a head? */
            index - 3 > 2 && (head = '1 2 ...');

            /** Has tail? */
            index + 3 < total && (tail = '...');

            if (head) {
                total - index > 3 && page.push(index - 2, index - 1, index);
            } else
                for (var i = index < 3 ? 6 : index + 3; --i >= 1; page.unshift(i));

            if (tail) {
                index > 5 && page.push(index + 1, index + 2);
            } else
                for (var i = total - (3 === total - index ? 6 : 5); ++i <= total; page.push(i));

            page.unshift(head);
            page.push(tail);
        }

        /** Trim the blank item */
        page = Array.from(page).join(' ').replace(/^\s+|\s$/g, '').split(' ').filter((item) => !!item);

        for (var i = 0, length = page.length; i < length; ++i) {

            if (+page[i]) {

                page[i] = +page[i] === index
                        ? `<span class='Pagination--current'>${index}</span>`
                        : `<a data-index='${page[i]}'>${page[i]}</a>`
                        ;
            } else
                page[i] = '<span class="Pagination--normal">...</span>';
        }

        /** Show PREV */
        index > 1 && page.unshift(`<a class="Pagination-prev icon-keyboard-arrow-left" data-index="${index - 1}"></a>`);

        /** Show NEXT */
        index < total && page.push(`<a class="Pagination-next icon-keyboard-arrow-right" data-index="${index + 1}"></a>`);

        this.refs.container.innerHTML = page.join('');
    }

    render() {

        return (
            <div className={clazz('Pagination', this.props.className)} ref="container" onClick={this.pageChange.bind(this)}></div>
        );
    }
};

