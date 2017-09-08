
import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import clazz from 'classname';0

import classes from './style.scss';
@inject(stores => ({
    teams: stores.model.teams,
}))
@observer
export default class Model extends Component {
    static propTypes = {
        teams: PropTypes.object.isRequired,
    }
    state={
          timeOuter:null,
          interval:3000,
          autoPlay:true,
          activeIndex:0,
          defaultActiveIndex:0,
          direction:'left',
    }
    componentDidMount() {
        var container = this.refs.container;
        var info=container.querySelector("."+classes.info);
        Object.assign(info.style,{
            width:(this.props.teams.length*170)+'px',
        })
        this.autoPlay();  
    }
    componentWillUnmount(){
        clearInterval(this.state.timeOuter);
    }
    autoPlay(){
        if(this.state.autoPlay){
          if(this.state.direction==="right"){
            this.state.timeOuter=setInterval(this.playRight.bind(this),this.state.interval);
          }else if(this.state.direction==="left"){
            this.state.timeOuter=setInterval(this.playLeft.bind(this),this.state.interval);
          }
        }
    }
    position(){
        return -(this.state.activeIndex*700)+'px'
    }
    playRight(indexIn){
      let index=indexIn?indexIn:this.state.activeIndex-1;

      if(index<0){
        index=Math.ceil(this.props.teams.length/4)-1;
      }
      this.setState({
        activeIndex:index,
      })
    }
    playLeft(indexIn){
          let index=indexIn?indexIn:this.state.activeIndex+1;
          if(index>Math.ceil(this.props.teams.length/4)-1){
            index=0;
          }
          this.setState({
            activeIndex:index,
          })
    }
    left(){
       clearInterval(this.state.timeOuter);
        let oldIndex=this.state.activeIndex;
        this.playLeft(oldIndex+1);
        this.autoPlay();
    }
    right(){
        clearInterval(this.state.timeOuter);
        let oldIndex=this.state.activeIndex;
        this.playRight(oldIndex-1);
        this.autoPlay();
    }
    stopTimeOuter(){
         clearInterval(this.state.timeOuter);
    }
    startTimeOuter(){
        if(this.state.autoPlay){
          if(this.state.direction==="right"){
            this.state.timeOuter=setInterval(this.playRight.bind(this),this.state.interval);
          }else if(this.state.direction==="left"){
            this.state.timeOuter=setInterval(this.playLeft.bind(this),this.state.interval);
          }
        }
    }
    render() {

       let teams=this.props.teams.slice();
       let{
        interval,
        autoPlay,
        activeIndex,
        defaultActiveIndex,
        direction,
        number,
        boxStyle
      }=this.props;
      let that=this;
        return (
            <div className={clazz(this.props.className, classes.container)} ref="container">
                <div className={classes.title}>
                   党员先锋模范
                </div>
                <span className={classes.leftIcon} onClick={this.left.bind(this)}></span>
                <span className={classes.rightIcon} onClick={this.right.bind(this)}></span>
                <div className={classes.detail} onMouseEnter={this.stopTimeOuter.bind(this)} onMouseLeave={this.startTimeOuter.bind(this)}>
                    
                    <div className={classes.info} style={{left:this.position(this)}}>
                        
                        {
                            teams.map((e,index)=>(
                               <div key={index} className={classes.item}>
                                    <img src={e.img}></img>
                                    <p className={classes.name}>{e.name}</p>
                                    <p className={classes.duty}>{e.zw}</p>
                                </div>
                            ))
                       }
                    </div>
                   
                </div>
            </div>
        );
    }
}
