
import React, { Component, PropTypes } from 'react';
import { RadialBarChart, RadialBar, Legend, Cell, Tooltip } from 'recharts';
import clazz from 'classname';

import classes from './style.scss';

export default class Study extends Component {

    componentDidMount() {

        var rect = this.refs.container.getClientRects()[0];
    }

    render() {
        var  info=['今天我们以集体谈话方式',
        			'今天我们以集体谈话方式',
        			'今天我们以集体谈话方式',
        			'今天我们以集体谈话方式今天我们以集体谈话方式今天我们以集体谈话方式今天我们以集体谈话方式今天我们以集体谈话方式',
        			'天我们以集体谈话方式今天我们以集体谈话方式今天我们以集体谈话方式今天',
        			'们以集体谈话方式今天我们以集体谈话方式今',
        			'们以集体谈话方式今天我们以集体谈话方式今',
        			'今天我们以集体谈话方式',
        			'今天我们以集体谈话方式',
        			'今天我们以集体谈话方式',
        			'今天我们以集体谈话方式今天我们以集体谈话方式今天我们以集体谈话方式今天我们以集体谈话方式今天我们以集体谈话方式',
        			'天我们以集体谈话方式今天我们以集体谈话方式今天我们以集体谈话方式今天',
        			'们以集体谈话方式今天我们以集体谈话方式今',
        			'们以集体谈话方式今天我们以集体谈话方式今',
        			'今天我们以集体谈话方式',
        			'今天我们以集体谈话方式',
        			'今天我们以集体谈话方式',
        			'今天我们以集体谈话方式今天我们以集体谈话方式今天我们以集体谈话方式今天我们以集体谈话方式今天我们以集体谈话方式',
        			'天我们以集体谈话方式今天我们以集体谈话方式今天我们以集体谈话方式今天',
        			'们以集体谈话方式今天我们以集体谈话方式今',
        			'们以集体谈话方式今天我们以集体谈话方式今',
        			]

        return (
            <div className={clazz(this.props.className, classes.container)} ref="container">
                <div className={classes.title}>
                    学习园地
                </div>

                <div className={classes.detail}>
                  <ul>
					{
						info.map((e,index)=>(
							<li key={index}>{e}</li>
						))
					}
                  </ul>
                </div>
            </div>
        );
    }
}
