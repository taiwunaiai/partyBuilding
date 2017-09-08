
import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import clazz from 'classname';
import classes from './round.scss';

export default class Lochus extends Component {

   
    componentDidMount() {

    }
    showDetail(e){
        
        var target = e.currentTarget;
        var info = target.nextSibling;
         Object.assign(info.style, {
            display:'block',
   
        });
    }
    hideDetail(e){
        var target = e.currentTarget;
        var info = target.nextSibling;
        Object.assign(info.style, {
            display:'none',
        });
    }
    render() {
       var data=[
                {name:'李伟1',rank:'1'},
                {name:'李伟2',rank:'2'},
                {name:'李伟3',rank:'3'},
                {name:'李伟1',rank:'4'},
                {name:'李伟2',rank:'5'},
                
                        
                ];
        return (
            <div className={clazz('pull-left',this.props.className, classes.container )} ref="container">
                <div className={clazz(classes.ui_base,classes.u_p3d)}>
                    <div className={classes.ball_c}>中队排名</div>
                    <div className={clazz(classes.base,classes.u_p3d)}>
                        {
                            data.map((e, index)=>{
                                var round=360*(index)/(data.length);
                                var translatey=(Math.sin(2*Math.PI*round/360).toFixed(2))*80;
                                var translatex=(-Math.cos(2*Math.PI*round/360).toFixed(2))*80;
                                return(<div key={index} className={clazz(classes.ball_base ,classes.u_p3d)} style={{transform:`translate(${translatey}px,${translatex}px)`,}}>
                                    <div className={classes.ball} onMouseEnter={this.showDetail} onMouseLeave={this.hideDetail} >{index+1}</div>
                                    <div className={classes.detail}>{e.name}</div>
                                </div>)
                                
                            })
                        }
                    
                        
                    </div>
                </div>
            </div>
        );
    }
}
