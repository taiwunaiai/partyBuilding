
import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import clazz from 'classname';

import classes from './style.scss';
@inject(stores => ({
    showTabNum: stores.party.showTabNum,
    toggleTabNum: stores.party.toggleTabNum,
    data: stores.party.data,
}))
@observer
export default class Party extends Component {
    static propTypes = {
        showTabNum: PropTypes.number.isRequired,
        toggleTabNum: PropTypes.func.isRequired,
        data:PropTypes.object.isRequired,
    };
    state={
        timeOuter:null,
        interval:1000,
        autoPlay:true,
        activeIndex:Math.ceil(this.props.data.img.length/8)-1,
        defaultActiveIndex:0,
        direction:'left',
    }
    componentDidMount() {
        var target = this.refs.container;
        var info = target.querySelectorAll("."+classes.linebottom);
        var img=this.props.data.img;
        console.log(this.state.activeIndex);
        Object.assign(info[0].style,{
            width:720*Math.ceil(img.length/8)+'px',
            left:-(720*Math.ceil(img.length/16))+'px'
        });
         Object.assign(info[1].style,{
            width:720*Math.ceil(img.length/8)+'px',
            left:-(720*Math.ceil(img.length/16))+'px'
        });
    }
    componentWillReceiveProps(nextProps){
        var target=this.refs.container;
        var info=target.querySelectorAll("."+classes.item);
        for(var i = 0 ; i<3; i++){
            if(i==nextProps.showTabNum){
                Object.assign(info[i].style,{
                    display:'block',
                })
            }else{
                 Object.assign(info[i].style,{
                    display:'none',
                })
            }     
        }

    }
    position(){
        return -(this.state.activeIndex*720)+'px'
    }
    playRight(indexIn){
        let data=this.props.data;
        let index=indexIn?indexIn:this.state.activeIndex-1;

        if(index<0){
           return true ;
        }
        this.setState({
            activeIndex:index,
        })
    }
    playLeft(indexIn){
        let data=this.props.data;
        let index=indexIn?indexIn:this.state.activeIndex+1;
        if(index>Math.ceil(data.img.length/8)-1){
            return true ;
        }
        this.setState({
            activeIndex:index,
        })
    }
    left(){
        let oldIndex=this.state.activeIndex;
        this.playLeft(oldIndex+1);
    }
    right(){
        let oldIndex=this.state.activeIndex;
        this.playRight(oldIndex-1);
    }
    render() {
        var data=this.props.data;
        var tap=["党组织生活情况"," 党费上缴情况","党建责任清单"];
        var tabNum=this.props.showTabNum;
        return (
            <div className={clazz(this.props.className, classes.container)} ref="container">
                <span className={classes.leftIcon} onClick={this.left.bind(this)}></span>
                <span className={classes.rightIcon} onClick={this.right.bind(this)}></span>
                <div className={classes.title}>
                        {
                           tap.map((e,index)=>{
                                if(index==tabNum){
                                    return( <div className={clazz('pull-left',classes.subTitle)} style={{background:"url(/images/M-M.png) no-repeat 0px 0px"}} key={index} onClick={this.props.toggleTabNum.bind(this,index)}>{e}</div>);
                                }
                                 return(<div className={clazz('pull-left',classes.subTitle)} key={index} onClick={this.props.toggleTabNum.bind(this,index)}>{e}</div>);
                           }) 
                        }      
                </div>

                <div className={classes.detail}>
                   <div className={classes.item}>
                        <div className={classes.life}> 
                            <div className={classes.img}>
                                <div className={classes.linebottom} style={{left:this.position(this)}}>
                                    {
                                      (data.img).map((e,index)=>{
                                        if((index+1)%4==1&&(index+1)%8!=1){
                                             return <img src={e} key={index} alt={index} style={{marginLeft: '110px'}}/>
                                        }else{
                                             return <img src={e} key={index} alt={index}/>
                                        }
                                      })  
                                    } 
                                </div>
                                <div  className={classes.month}>
                                    <div className={classes.monthIcon} style={{background:'url(/images/M-M3.png) no-repeat 0px 0px'}} >2</div>
                                    <div className={classes.monthIcon} style={{background:'url(/images/M-M4.png) no-repeat 0px 0px'}} >3</div>
                                    <div className={classes.monthIcon} style={{background:'url(/images/M-M6.png) no-repeat 0px 0px'}} >4</div>
                                    <div className={classes.monthIcon} style={{background:'url(/images/M-M2.png) no-repeat 0px 0px'}} >5</div>
                                    <div className={classes.monthIcon} style={{background:'url(/images/M-M7.png) no-repeat 0px 0px'}} >7</div>
                                    <div className={classes.monthIcon} style={{background:'url(/images/M-M8.png) no-repeat 0px 0px'}} >8</div>
                                    <div className={classes.monthIcon} style={{background:'url(/images/M-M9.png) no-repeat 0px 0px'}} >9</div>
                                    <div className={classes.monthIcon} style={{background:'url(/images/M-M10.png) no-repeat 0px 0px'}}>10</div>
                                </div>
                            </div>
                            <div className={classes.info}>
                                {
                                  (data.img).map((e,index)=>{
                                    if(index<2){
                                        return( <img src={e} key={index}/>)
                                   
                                    }
                                  })  
                                }
                                <p>{data.info}</p>

                            </div>
                        </div>
                   </div>
                    <div className={classes.item}>
                        <div className={classes.cost}> 
                            <div className={classes.img}>
                                <div className={classes.linebottom} style={{left:this.position(this)}}>
                                    {
                                      (data.img).map((e,index)=>{
                                        if((index+1)%4==1&&(index+1)%8!=1){
                                             return <img src={e} key={index} alt={index} style={{marginLeft: '110px'}}/>
                                        }else{
                                             return <img src={e} key={index} alt={index}/>
                                        }
                                      })  
                                    } 
                                </div>
                                <div  className={classes.month}>
                                    <div className={classes.monthIcon} style={{background:'url(/images/M-M3.png) no-repeat 0px 0px'}} >2</div>
                                    <div className={classes.monthIcon} style={{background:'url(/images/M-M4.png) no-repeat 0px 0px'}} >3</div>
                                    <div className={classes.monthIcon} style={{background:'url(/images/M-M6.png) no-repeat 0px 0px'}} >4</div>
                                    <div className={classes.monthIcon} style={{background:'url(/images/M-M2.png) no-repeat 0px 0px'}} >5</div>
                                    <div className={classes.monthIcon} style={{background:'url(/images/M-M7.png) no-repeat 0px 0px'}} >7</div>
                                    <div className={classes.monthIcon} style={{background:'url(/images/M-M8.png) no-repeat 0px 0px'}} >8</div>
                                    <div className={classes.monthIcon} style={{background:'url(/images/M-M9.png) no-repeat 0px 0px'}} >9</div>
                                    <div className={classes.monthIcon} style={{background:'url(/images/M-M10.png) no-repeat 0px 0px'}}>10</div>
                                </div>
                            </div>
                            <div className={classes.info}>
                                {
                                  (data.img).map((e,index)=>{
                                    if(index<4){
                                        return( <img src={e} key={index}/>)
                                   
                                    }
                                  })  
                                }

                            </div>
                        </div>
                   </div>
                   <div className={classes.item}>
                        
                   </div>
                </div>
            </div>
        );
    }
}
