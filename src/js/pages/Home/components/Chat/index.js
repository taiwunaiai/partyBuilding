
import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import clazz from 'classname';

import classes from './style.scss';
@inject(stores => ({
 //  teams: stores.cavalry.teams,
    showConditions: stores.chat.showConditions,
    toggleConditions: stores.chat.toggleConditions,
}))
@observer
export default class Chat extends Component {
    static propTypes = {
        showConditions: PropTypes.bool.isRequired,
        toggleConditions: PropTypes.func.isRequired,
    };

    componentWillReceiveProps(nextProps) {
        var target=this.refs.container;
        var chat=target.querySelector('.' + classes.chat);
        var abnormalChat=target.querySelector('.' + classes.abnormalChat);
        var subTitle=target.querySelectorAll('.' + classes.subTitle);
        
        Object.assign(chat.style, {
            left: nextProps.showConditions? '-1450px' : '15px',
        });
         Object.assign(abnormalChat.style, {
            left:  nextProps.showConditions ? " 15px" : '-1450px',
        });
         Object.assign(subTitle[0].style, {
            background:  nextProps.showConditions ?'#ccc': "url(/images/M-M.png) no-repeat 0px 0px" ,
        });
        Object.assign(subTitle[1].style, {
            background:  nextProps.showConditions ? "url(/images/M-M.png) no-repeat 0px 0px" : '#ccc',
        });
    }
    render() {
        var data={
            img:"/images/team1.png",
            info:'  今天我们以集体谈话方式，今天我们以集体谈话方式，今天我们以集体谈话方式，今天我们以集体谈话方式',
        }
        return (
            <div className={clazz(this.props.className, classes.container)} ref='container'>
                <div className={classes.title}>
                    <div className={clazz('pull-left',classes.subTitle,classes.subTitle1)} style={{background:'url(/images/M-M.png) no-repeat 0px 0px'}} onClick={this.props.toggleConditions.bind(this,false)}>
                        谈话记录
                    </div>
                    <div className={clazz('pull-right',classes.subTitle,classes.subTitle2)} onCilck={this.showAbnormalChat} onClick={this.props.toggleConditions.bind(this,true)}>
                        异常谈话记录
                    </div>
                </div>

                <div className={classes.detail}>

                    <div className={clazz(classes.item,classes.chat)}>
                        <img src={data.img} />
                        <img src={data.img} />
                         <img src={data.img} />
                        <p>{data.info}</p>
                    </div>
                    <div className={clazz(classes.item,classes.abnormalChat)} >
                        <img src={data.img} />
                        <img src={data.img} />
                         <img src={data.img} />
                        <p>{data.info+"11111111111111111111111111111"}</p>
                    </div>
                  
                   
                </div>

            
            </div>
        );
    }
}
 