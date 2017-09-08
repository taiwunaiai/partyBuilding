
import React, { Component, PropTypes } from 'react';
import clazz from 'classname';
import Brigade from './brigade';
import Lochus from './lochus';
import DetachMent from './detachMent';
import classes from './style.scss';

export default class Achievement extends Component {

    componentDidMount() {

        var rect = this.refs.container.getClientRects()[0];


    }


    render() {

        var data = [
            {name: '事故多发地段', value: 400},
            {name: '危险路段', value: 300},
            {name: '道路交通设施', value: 300},
            {name: '监控设备故障', value: 200},
            {name: '交通拥堵地段', value: 200},
            {name: '积水路段', value: 200},
            {name: '交通秩序混乱地段', value: 200},
        ];

        return (
            <div className={clazz(this.props.className, classes.container,'pull-right')} ref="container">
                <div className={clazz('pull-left',classes.title)}>
                    <ul>
                        <li >
                             党员先锋指数︵ 勤奋率 ︶
                           
                        </li>   
                    </ul>
                </div>,
                <div className={classes.detail}>
                   <div className={classes.select}>
                        <div className="select">
                            <select name="bigTeam">
                                <option value="1">铁骑岗</option>
                            </select>
                        </div>
                        <div className="select">
                            <select name="midTeam">
                                <option value="2017">2017年</option>
                            </select>
                        </div>
                        <div className="select">
                            <select name="midTeam">
                                <option value="1">7月份</option>
                                <option value="1">7月份</option>
                                <option value="1">7月份</option>
                                <option value="1">7月份</option>
                                <option value="1">7月份</option>
                            </select>
                        </div>
                   </div>
                   <div className={classes.info}>
                        <div className={classes.rank}>
                            <div className={classes.rankTitle}>各项指标在全支队:</div>
                            <div className={classes.rankItem}>
                                <p>
                                    工作时长
                                </p>
                                <span>
                                    第一名
                                </span>
                            </div>
                            <div className={classes.rankItem}>
                                <p>
                                    巡逻里程
                                </p>
                                <span>
                                    第一名
                                </span>
                            </div>
                            <div className={classes.rankItem}>
                                <p>
                                    查处违法
                                </p>
                                <span>
                                    第一名
                                </span>
                            </div>
                            <div className={classes.rankItem}>
                                <p>
                                    处理警情
                                </p>
                                <span>
                                    第一名
                                </span>
                            </div>
                        </div>
                         <Brigade></Brigade>
                         <DetachMent></DetachMent>
                        <Lochus></Lochus>
                   </div>

                </div>
            </div>
        );
    }
}
