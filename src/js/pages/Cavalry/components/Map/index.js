
import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';
import clazz from 'classname';

import classes from './style.scss';

const unique = uuid.v1();

export default class Map extends Component {

    static propTypes = {
        showConditions: PropTypes.bool.isRequired,
    };

    componentDidMount() {

        var map = new BMap.Map(unique);
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
        map.addControl(new BMap.MapTypeControl());
        map.setCurrentCity('北京');
        map.enableScrollWheelZoom(true);
    }

    render() {

        return (
            <div className={clazz(classes.container, this.props.showConditions && classes.min)}>
                <div id={unique} className={classes.map}></div>
            </div>
        );
    }
}
