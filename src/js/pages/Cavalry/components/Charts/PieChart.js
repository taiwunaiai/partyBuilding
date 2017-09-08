import React, { Component, PropTypes } from 'react';
import { PieChart, Pie, Sector, Cell, Legend, Tooltip } from 'recharts';
import clazz from 'classname';

import classes from './PieChart.scss';

export default class Chart extends Component {

    componentDidMount() {

        var rect = this.refs.container.getClientRects()[0];

        this.setState({
            height: (window.innerHeight - rect.top) / 2 - 90,
        });
    }

    state = {
        height: 0,
    };

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
        var colors = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];

        return (
            <div ref="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-6">
                        <p className={classes.title}>1.重点车辆查处</p>

                        <PieChart width={200} height={this.state.height}>
                            <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={0}>
                                {
                                    data.map((entry, index) => <Cell fill={colors[index]} key={index} stroke={0}/>)
                                }
                            </Pie>

                            <Tooltip></Tooltip>

                            <Legend
                            layout="vertical"
                            verticalAlign="middle"
                            align="left"
                            wrapperStyle={{
                                position: 'absolute',
                                width: 'auto',
                                height: 'auto',
                                top: 0,
                                left: 0,
                                transform: "translateX(-180%)",
                            }}>
                            </Legend>
                      </PieChart>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <p className={classes.title}>2.平均出警时长</p>

                        <PieChart width={200} height={this.state.height}>
                            <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={0}>
                                {
                                    data.map((entry, index) => <Cell fill={colors[index]} key={index} stroke={0}/>)
                                }
                            </Pie>

                            <Tooltip></Tooltip>
                      </PieChart>
                    </div>
                    <div className="col-md-6">
                        <p className={classes.title}>3.主动发现率</p>

                        <PieChart width={200} height={this.state.height}>
                            <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={0}>
                                {
                                    data.map((entry, index) => <Cell fill={colors[index]} key={index} stroke={0}/>)
                                }
                            </Pie>

                            <Tooltip></Tooltip>
                      </PieChart>
                    </div>
                </div>
            </div>
        );
    }
}
