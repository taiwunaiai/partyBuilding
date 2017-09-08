
import React, { Component, PropTypes } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { inject, observer } from 'mobx-react';
import clazz from 'classname';

import classes from './style.scss';

@inject(stores => ({
    query: stores.personal.query,
    data: stores.personal.data,
}))
@observer
export default class Personal extends Component {

    static propTypes = {
        data: PropTypes.object,
    };

    componentWillMount() {
        this.props.query();
    }

    componentDidMount() {

        var rect = this.refs.container.getClientRects()[0];
    }
    render() {
        var data = this.props.data;

        return (
            <div className={clazz('pull-left',this.props.className, classes.container, )} ref="container">
                <div className={clazz('pull-left',classes.name)}>
                    <div className={clazz('pull-top', classes.title)}>{data.name}</div>
                    <div className={clazz('pull-bottom', classes.subtitle)}></div>
                </div>
                <div className={clazz('pull-left',classes.info)}>
                    <div className={classes.infoTop}>
                        <div className={classes.item}>
                            <p>党龄：</p>
                            <span>{data.old}</span>
                        </div>
                        <div className={classes.item}>
                            <p>出生日期：</p>
                            <span>{data.birthDay}</span>
                        </div>
                        <div className={classes.item}>
                            <p>党内职务：</p>
                            <span>{data.partyDuty}</span>
                        </div>
                    </div>
                    <div className={classes.infoBottom}>
                        <div className={classes.item}>
                            <p>所属党支部：</p>
                            <span>{data.ss}</span>
                        </div>
                        <div className={classes.item}>
                            <p>职务：</p>
                            <span>{data.zw}</span>
                        </div>
                        <div className={classes.item}>
                            <p>岗位：</p>
                            <span>{data.gw}</span>
                        </div>
                    </div>
                </div>
               
            </div>
        );
    }
}
