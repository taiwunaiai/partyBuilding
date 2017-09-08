
import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import clazz from 'classname';

import classes from './style.scss';
@inject(stores => ({
    showTabNum: stores.study.showTabNum,
    toggleTabNum: stores.study.toggleTabNum,
    data:stores.study.data,
}))
@observer
export default class Study extends Component {
    static propTypes = {
        showTabNum: PropTypes.number.isRequired,
        toggleTabNum: PropTypes.func.isRequired,
        data:PropTypes.object.isRequired,
    };
     state={
        height: 0,
        width: 0,
        timeOuter:null,
        interval:1000,
        autoPlay:true,
        activeIndex:0,
        defaultActiveIndex:0,
        direction:'left',
    }
    componentWillReceiveProps(nextProps){
        var target=this.refs.container;
        var info=target.querySelectorAll("."+classes.info);
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

    componentDidMount() {
        var target = this.refs.container;
        var rect = target.getClientRects()[0];
        var info = target.querySelectorAll("."+classes.info);
        var data=this.props.data;

        Object.assign(info[0].style,{
            width:data.length*60+'px',
        });
        Object.assign(info[2].style,{
            width:data.length*60+'px',
        })
        this.setState({
            width:data.length*60,
            height: rect.height - 30,
        });
    }

     position(){
        return -(this.state.activeIndex*320)+'px'
    }
    playRight(indexIn){
      let index=indexIn?indexIn:this.state.activeIndex-1;

      if(index<0){
        index=Math.ceil(this.props.data.length/8)-1;
      }
      this.setState({
        activeIndex:index,
      })
    }
    playLeft(indexIn){
          let index=indexIn?indexIn:this.state.activeIndex+1;
          if(index>Math.ceil(this.props.data.length/8)-1){
            index=0;
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
    renderLabel(props){
         var { x, y, width, height } = props;
         console.log(props);
        return (
            <text x={x + width + 5} y={y - 20} className={classes.xLable}>{props.percent+"%"}</text>
        );
    }
    render() {
        var tap=["日常学习","专项学习","考核"];
        var tabNum=this.props.showTabNum;
        var data=this.props.data.slice();
        return (
            <div className={clazz(this.props.className, classes.container)} ref="container">
                <div className={classes.title}>
                    <ul>
                        {
                           tap.map((e,index)=>{
                                if(index==tabNum){
                                    return(<li className={classes.subTitle} key={index} onClick={this.props.toggleTabNum.bind(this,index,)} style={{background:'#999'}}>{e}</li>);
                                }
                                 return(<li key={index} onClick={this.props.toggleTabNum.bind(this,index)}>{e}</li>);
                           }) 
                        }                        
                    </ul>
                </div>

                <div className={classes.detail}>
                    <p className={classes.left} onClick={this.left.bind(this)}></p>
                    <p className={classes.right} onClick={this.right.bind(this)}></p>
                   <div className={classes.item}>
                        <div className={classes.info} style={{left:this.position(this)}}>
                            {
                                data.length && (
                                    <div className={classes.chart}>
                                        <BarChart
                                        width={this.state.width-70}
                                        height={this.state.height}
                                        data={data}
                                        margin={{
                                            top: 30,
                                            right: 10,
                                            left: 10,
                                            bottom: 0
                                        }}>
                                            <XAxis tickLine={false} interval={0} dataKey="name"  stroke="#999999"/>
                                            <CartesianGrid vertical={false}  stroke="#ccc"/>
                                            <Tooltip />
                                            <Bar barSize={10} unit="%" dataKey="percent" label={{ fill: '#6699ff', fontSize: 12,width:'20px',height:'20px', borderRadius:'50%'}} fill='#ffaf00'  />
                                           
                                        </BarChart>
                                    </div>
                                )
                            }
                        </div>
                        <div className={classes.info} style={{left:this.position(this)}}>
                            {
                                data.length && (
                                    <div className={classes.chart}>
                                        <BarChart
                                        width={this.state.width-70}
                                        height={this.state.height}
                                        data={data}
                                        margin={{
                                            top: 30,
                                            right: 10,
                                            left: 10,
                                            bottom: 0
                                        }}>
                                            <XAxis tickLine={false} interval={0} dataKey="name"  stroke="#999999"/>
                                            <CartesianGrid vertical={false}  stroke="#ccc"/>
                                            <Tooltip />
                                            <Bar barSize={10} unit="%" dataKey="percent" label={{ fill: '#6699ff', fontSize: 12,width:'20px',height:'20px', borderRadius:'50%'}} fill='#ffaf00'  />
                                           
                                        </BarChart>
                                    </div>
                                )
                            }
                        </div>
                        <div  className={classes.info} >
                            {
                                data.length
                               
                            }
                        </div>
                   </div>
                </div>
            </div>
        );
    }
}
