
import React, { Component, PropTypes } from 'react';
import delegate from 'delegate';
import clazz from 'classname';

import classes from './style.scss';

export default class Top extends Component {

    showInfo(e) {

        var target = e.currentTarget;
        var rect = target.querySelector('img').getClientRects()[0];
        var info = target.querySelector('.' + classes.info);

        Object.assign(info.style, {
            position: 'fixed',
            top: rect.top + 'px',
            left: rect.width + rect.left + 10 + 'px',
            opacity: 1,
        });
    }

    hideInfo(e) {

        var info = e.currentTarget.querySelector('.' + classes.info);

        Object.assign(info.style, {
            opacity: 0,
        });
    }

    render() {

        var { teams } = this.props;

        return (
            <div className={clazz(this.props.className, classes.container)} ref="container">
                <div className={classes.header}>
                </div>

                <div className={classes.rank}>
                    <div className={classes.scroller}>
                    {
                        teams.map((team, index) => {

                            return (
                                <div className={classes.team} key={index} onMouseEnter={this.showInfo} onMouseLeave={this.hideInfo}>

                                    <div className={classes.badge}>{index + 1}</div>

                                    <img src={team.img} alt={team.name}></img>

                                    <div className={classes.text}>
                                        <div className="clearfix">
                                            <span className="pull-left">{team.name}</span>
                                            <span className="pull-right">{team.score}</span>
                                        </div>
                                    </div>

                                    <div className={classes.info}>
                                        <table>
                                            <thead>
                                                <tr>
                                                	<td>参数</td>
                                                	<td>数值</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>巡逻里程数</td>
                                                    <td>80</td>
                                                </tr>
                                                <tr>
                                                    <td>处警量</td>
                                                    <td>30</td>
                                                </tr>
                                                <tr>
                                                    <td>重点违法车辆</td>
                                                    <td>30</td>
                                                </tr>
                                                <tr>
                                                    <td>动态纠违数</td>
                                                    <td>20</td>
                                                </tr>
                                                <tr>
                                                    <td>主动发现率</td>
                                                    <td>100%</td>
                                                </tr>
                                                <tr>
                                                    <td>平均出警时长</td>
                                                    <td>5:30</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
            </div>
        );
    }
}
