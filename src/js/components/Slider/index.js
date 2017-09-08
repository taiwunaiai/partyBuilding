
import React, { Component, PropTypes } from 'react';
import clazz from 'classname';
import blacklist from 'util/blacklist';
import { on, off } from 'util/event';
import './style.scss';

export default class Slider extends Component {

    static propTypes = {
        defaultValue: PropTypes.number.isRequired,
        max: PropTypes.number,
        min: PropTypes.number,
        step: PropTypes.number,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        max: 1,
        min: 0
    };

    setPosition(ele, x) {

        var rect = ele.getBoundingClientRect();
        var precent = (x - rect.left) / rect.width * 100;

        if (precent < 0) {
            precent = 0;
        } else if (precent > 100) {
            precent = 100;
        }

        precent = Math.floor(precent);

        this.refs.dot.style.left = `${precent}%`;
        this.refs.line.style.width = `${precent}%`;
    }

    dragstart() {
        this.refs.node.classList.add('dragging');
        on(document, 'mouseup', this.drop);
    }

    drag(e) {

        if (!this.refs.node.classList.contains('dragging')) {
            return;
        }

        this.setPosition(this.refs.node, e.pageX);
    }

    drop() {
        this.refs.node.classList.remove('dragging');
        off(document, 'mouseup', this.drop);
    }

    handleClick(e) {
        this.setPosition(this.refs.node, e.pageX);
    }

    constructor(props) {
        super(props);

        this.dragstart = this.dragstart.bind(this);
        this.drag = this.drag.bind(this);
        this.drop = this.drop.bind(this);
        this.setPosition = this.setPosition.bind(this);
    }

    componentWillUnmount() {
        off(this.refs.dot, 'mousedown', this.dragstart);
        off(this.refs.node, 'mousemove', this.drag);
        off(document, 'mouseup', this.drop);
    }

    componentDidMount() {

        if (this.props.disabled) {
            return;
        }

        on(this.refs.dot, 'mousedown', this.dragstart);
        on(this.refs.node, 'mousemove', this.drag);
    }

    render() {

        let className = clazz('Slider', this.props.className, {
            'Slider--disabled': this.props.disabled
        });
        let props = this.props;

        return (
            <div {...props} className={className} ref="node" onClick={this.handleClick.bind(this)}>
                <div>
                    <span className="Slider-line" ref="line"></span>
                    <span className="Slider-dot" ref="dot"></span>
                </div>
            </div>
        );
    }
}
