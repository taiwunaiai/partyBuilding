
import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import clazz from 'classname';

import classes from './style.scss';
export default class Chat extends Component {

    componentWillMount() {
      
    }

    render() {
         var data={
            img:'/images/M-M11.png',
            info:'  今天我们以集体谈话方式，今天我们以集体谈话方式，今天我们以集体谈话方式，今天我们以集体谈话方式今天我们以集体谈话方式今天我们以集体谈话方式今天我们以集体谈话方式今天我们以集体谈话方式',
        }
        return (
            <div className={clazz(this.props.className, classes.container)}>
                <div className={classes.title}>
                    时政要闻
                </div>
                <div className={classes.detail}>
                    <img src={data.img} />
                    <p>{data.info}</p>
                </div>
            </div>
        );
    }
}
 

 