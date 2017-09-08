
import React, { Component, PropTypes } from 'react';
import { Calendar } from 'components';
import clazz from 'classname';

import classes from './style.scss';
import BarChart from './BarChart';
import PieChart from './PieChart';

export default class Charts extends Component {

    static propTypes = {
        showConditions: PropTypes.bool.isRequired,
        toggleConditions: PropTypes.func.isRequired,
    };

    componentWillReceiveProps(nextProps) {

        Object.assign(this.refs.container.style, {
            right: nextProps.showConditions ? 0 : '-450px',
        });
    }

    render() {

        return (
            <div className={clazz(this.props.className, classes.container)} ref="container">

                <div className={classes.expand} onClick={this.props.toggleConditions}>
                    <i className="icon-keyboard-arrow-left"></i>
                </div>

                <div className={classes.conditions}>
                    <div className="row">
                        <span className={classes.label}>日期：</span>
                        <Calendar ref="startTime"></Calendar>
                        &nbsp;&nbsp;
                        至
                        &nbsp;&nbsp;
                        <Calendar ref="endTime"></Calendar>
                    </div>

                    <div className="row">
                        <span className={classes.label}>大队：</span>
                        <div className="select">
                            <select name="bigTeam">
                                <option value="1">福田大队</option>
                            </select>
                        </div>
                        <span className={classes.label}>中队：</span>
                        <div className="select">
                            <select name="midTeam">
                                <option value="1">选择中队</option>
                            </select>
                        </div>
                    </div>
                </div>

                <BarChart></BarChart>

                <PieChart></PieChart>
            </div>
        );
    }
}
