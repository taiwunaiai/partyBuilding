
import React, { Component, PropTypes } from 'react';
import { TextField } from 'components';
import blacklist from 'util/blacklist';
import clazz from 'classname';
import delegate from 'delegate';
import dateutil from 'util/dateutil';
import { on, off } from 'util/event';
import './style.scss';

function getDate(value) {

    if (value) {
        return new Date('function' === typeof value ? value() : value);
    }
}

export default class Calendar extends Component {

    static propTypes = {
        onSelected: PropTypes.func,
        months: PropTypes.array,
        daysOfTheWeek: PropTypes.array,
        showTime: PropTypes.bool,
        double: PropTypes.bool,
        showAdjacent: PropTypes.bool,
        minDate: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.func,
        ]),
        maxDate: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.func,
        ]),
        selectable: PropTypes.func,
        selectableDOW: PropTypes.array,
        defaultValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])

    };

    static defaultProps = {
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        daysOfTheWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

        format: '%Y-%m-%d',

        showTime: false,
        double: false,
        showAdjacent: false,

        /** List of selectable days of the week, 0 is Sunday, 1 is Monday, and so on. */
        selectableDOW: [1, 2, 3, 4, 5, 6, 0]
    };

    calc(date, defaultValue) {

        var prev = new Date(date.getFullYear(), date.getMonth(), 0);
        var next = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        var now = new Date();
        var range = {
            prev: [prev.getDate() - prev.getDay(), prev.getDate()],
            current: [1, new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()],
            next: [1, 6 - next.getDay() + 1]
        };
        var html = '';

        function isValid(date, start) {

            var minDate = getDate(this.props.minDate);
            var maxDate = getDate(this.props.maxDate);

            date = new Date(date.getFullYear(), date.getMonth(), start);

            if ('function' === typeof this.props.selectable
                    && !this.props.selectable(date)) {
                return ' Calendar-day--invalid';
            }

            if (this.props.selectableDOW instanceof Array
                    && this.props.selectableDOW.indexOf(date.getDay() ) === -1) {
                return ' Calendar-day--invalid';
            }

            if (minDate || maxDate) {

                if ((date >= minDate && date <= maxDate)
                        || (!maxDate  && date >= minDate)
                        || (!minDate  && date <= maxDate)) {

                    return ' Calendar-day--valid ';
                }

                return ' Calendar-day--invalid ';
            }

            return ' ';
        }

        for (let start = range.prev[0], end = range.prev[1]; end - start !== 6 && start <= end; ++start) {

            html += `<div class="Calendar-day ${isValid.bind(this)(prev, start)} Calendar-day--adjacent Calendar-day-prev"
                        data-date=${[prev.getFullYear(), prev.getMonth() + 1, start].join('/')}>
                        ${start}
                    </div>`;
        }

        for (let start = range.current[0], end = range.current[1]; start <= end; ++start) {

            let clazz = isValid.bind(this)(date, start);

            start < now.getDate() && (clazz += ' Calendar-day-past ');

            date.getFullYear() === defaultValue.getFullYear()
                && date.getMonth() === defaultValue.getMonth()
                && start === defaultValue.getDate()
                && (clazz += ' Calendar-day--current ');

            date.getFullYear() === now.getFullYear()
                && date.getMonth() === now.getMonth()
                && start ===  now.getDate()
                && (clazz += ' Calendar-day--today ');

            html += `<div class="Calendar-day ${clazz}" data-date=${[date.getFullYear(), date.getMonth() + 1, start].join('/')}">${start}</div>`;
        }

        for (let start = range.next[0], end = range.next[1]; end - start !== 6 && start <= end; ++start) {

            html += `<div class="Calendar-day ${isValid.bind(this)(next, start)} Calendar-day--adjacent Calendar-day-next"
                        data-date=${[next.getFullYear(), next.getMonth() + 1, start].join('/')}>
                        ${start}
                    </div>`;
        }

        if (!this.props.showAdjacent) {
            let dom = document.createElement('div');

            dom.innerHTML = html;
            Array.from(dom.querySelectorAll('.Calendar-day.Calendar-day--adjacent')).map(ele => {

                ele.innerHTML = '&nbsp;';
                ele.removeAttribute('data-date');
                ele.classList.remove('Calendar-day--valid');
                ele.classList.add('Calendar-day--invalid');
            });

            html = dom.innerHTML;
        }

        return html;
    }

    componentDidMount() {

        var input = this.refs.input.refs.input;
        var defaultValue = +new Date(this.props.defaultValue) || +new Date(input.value) || +new Date();
        var header = [];
        var current;
        var self = this;
        var dom = document.createElement('div');

        dom.innerHTML = `
                        <div class="Calendar-action">
                            <div class="Calendar-year-prev">
                                <i class="icon-arrow-back"></i>
                            </div>
                            <div class="Calendar-month-prev">
                                <i class="icon-keyboard-arrow-left"></i>
                            </div>
                            <div class="Calendar-date">Today</div>
                            <div class="Calendar-month-next">
                                <i class="icon-keyboard-arrow-right"></i>
                            </div>
                            <div class="Calendar-year-next">
                                <i class="icon-arrow-forward"></i>
                            </div>
                        </div>

                        <div class="Calendar-content">
                            <div class="Calendar-days">
                                <div class="Calendar-header"></div>
                                <div class="Calendar-dates"></div>
                            </div>
                        </div>
                        `;
        dom.classList.add('Calendar-container');

        function show(step) {

            var container = dom.querySelector('.Calendar-dates');
            var label = [];
            var steps = [step];

            if (this.props.double) {

                if (step instanceof Date) {
                    steps.push(new Date(step.getFullYear(), step.getMonth() + 1));
                } else {
                    steps.push(step > 0 ? 1 : -1);
                }
            }

            for (var i = 0, length = steps.length; i < length; ++i) {

                var step = steps[i];

                (() => {

                    switch (step) {

                        /** Previous month */
                        case -1:
                            if (1 === current[1]) {
                                --current[0];
                                current[1] = 12;
                            } else
                                --current[1];
                            break;
                        /** Next month */
                        case 1:
                            if (12 === current[1]) {
                                ++current[0];
                                current[1] = 1;
                            } else ++current[1];
                            break;
                        /** Next year */
                        case 12:
                            ++current[0];
                            break;

                        /** Previous year */
                        case -12:
                            --current[0];
                            break;

                        default:
                            current = [step.getFullYear(), step.getMonth() + 1, 1];
                    }

                    label.push(this.props.months[current[1] - 1] + ' , ' + current[0] );
                    container.innerHTML = this.calc(new Date(current.join('/')), new Date(defaultValue));
                })();

                if (step < 0) {
                    label = label.reverse();
                }

                dom.querySelector('.Calendar-date').innerHTML = label.join(' - ');
            }
		}

		function hide() {
            setTimeout(() => {
                dom.classList.remove('show');
            });
		}

        this.props.daysOfTheWeek.map(item => {
            header.push(`<div>${item}</div>`);
        });

        delegate(this.refs.node, '.Calendar-trigger', 'click', (e) => {

            e.preventDefault();
            e.stopPropagation();

            if (this.props.double) {
                let days = dom.querySelector('.Calendar-days');
                dom.classList.add('.Calendar--double');
                dom.querySelector('.Calendar-content').appendChild(days.cloneNode(true));
            }

            dom.querySelector('.Calendar-header').innerHTML = header.join('');;

            show.bind(this)(new Date(defaultValue));

            this.refs.node.appendChild(dom);
            dom.classList.add('show');
        });

        delegate(this.refs.node, '.Calendar-year-prev', 'click', (e) => {
            e.preventDefault();
            show.bind(this)(-12);
        });

        delegate(this.refs.node, '.Calendar-year-next', 'click', (e) => {
            e.preventDefault();
            show.bind(this)(12);
        });

        delegate(this.refs.node, '.Calendar-month-prev', 'click', (e) => {
            e.preventDefault();
            show.bind(this)(-1);
        });

        delegate(this.refs.node, '.Calendar-month-next', 'click', (e) => {
            e.preventDefault();
            show.bind(this)(1);
        });

        delegate(this.refs.node, '.Calendar-date', 'click', (e) => {
            e.preventDefault();
            show.bind(this)(new Date());
        });

        delegate(this.refs.node, '.Calendar-day', 'click', (e) => {

            var ele = e.delegateTarget;

            if (!ele.classList.contains('Calendar-day--invalid')) {

                let date = new Date(ele.getAttribute('data-date'));
                let value = dateutil(date).format(self.props.format);

                input.value = value;
                defaultValue = date;

                hide();
            }
        });

        input.value = dateutil(defaultValue).format(this.props.format);

        on(this.refs.node, 'blur', (e) => hide());
    }

    render() {

        return (
            <div className={clazz('Calendar', this.props.className)} ref="node" tabIndex="-1">
                <TextField className="TextField--icon TextField--icon--right" ref="input" readOnly>
                    <i className="Calendar-trigger icon-event"></i>
                </TextField>
            </div>
        );
    }
}
