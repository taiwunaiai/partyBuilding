
import React, { Component, PropTypes } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { inject, observer } from 'mobx-react';
import clazz from 'classname';

import classes from './BarChart.scss';

@inject(stores => ({
    query: stores.normal.query,
    data: stores.normal.data,
}))
@observer
export default class Chart extends Component {

    static propTypes = {
        data: PropTypes.object,
    };

    componentWillMount() {
        this.props.query();
    }

    componentDidMount() {

        var rect = this.refs.container.getClientRects()[0];

        this.setState({
            width: rect.width - 10,
            height: rect.height - 30,
        });
    }

    state = {
        height: 0,
        width: 0,
    };

    renderXLabel(props) {

        var { x, y, width, height } = props;

        return (
            <text x={x + width + 5} y={y - 20} className={classes.xLable}>大队</text>
        );
    }

    render() {
        var data = this.props.data.slice();

        return (
            <div className={classes.container} ref="container">
                <p className={classes.title}>各队铁骑工作绩效对比</p>
                <div className={this.props.className}>
                    {
                        data.length && (
                            <div className={classes.chart}>
                                <BarChart
                                width={this.state.width}
                                height={this.state.height}
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 10,
                                    left: -30,
                                    bottom: 10,
                                }}>
                                    <XAxis tickLine={false} dataKey="name" label={this.renderXLabel} strokeWidth="1" stroke="#3fa9d0"/>
                                    <YAxis tickLine={false} label="人数" strokeWidth="1" stroke="#3fa9d0"/>
                                    <CartesianGrid strokeWidth=".5" stroke="#205e7b"/>
                                    <Tooltip/>
                                    <Legend verticalAlign="top" align="right" wrapperStyle={{
                                        top: 10,
                                        right: 0,
                                    }}/>
                                    <Bar dataKey="实际数" fill="#ffb300" minPointSize={5}/>
                                    <Bar dataKey="排班数" fill="#009ff2" minPointSize={10}/>
                                </BarChart>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}
