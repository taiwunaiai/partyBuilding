
import React, { Component, PropTypes } from 'react';
import { RadialBarChart, RadialBar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { inject, observer } from 'mobx-react';
import clazz from 'classname';
import classes from './chart.scss';


export default class DetachMent extends Component {

    


    componentDidMount() {

    }
    showDetail(e){

    }
    render() {

	const data = [
	      {name: '7月份', uv: 31.47, pv: 2400, fill: '#8884d8'},
	      {name: '8月份', uv: 26.69, pv: 4567, fill: '#83a6ed'},
	    ];
	    

        return (
            <div className={clazz('pull-left',this.props.className, classes.container )} ref="container">
					<div className={clazz(classes.base,classes.u_p3d)}>
						<div className={classes.charts}>
							<RadialBarChart width={500} height={300} cx={170} cy={170} innerRadius={5} outerRadius={100} barSize={20} data={data} label >
					        <RadialBar minAngle={15} label background clockWise={true} dataKey='uv'/>
					         <Tooltip />
					        </RadialBarChart>

						</div>
						{
							data.map((e, index)=>{
								var round=360*(index)/(data.length);
								var translatey=(Math.sin(2*Math.PI*round/360).toFixed(2))*110;
								var translatex=(-Math.cos(2*Math.PI*round/360).toFixed(2))*110;
								return(<div key={index} className={clazz(classes.ball_base ,classes.u_p3d)} style={{transform:`translate(${translatey}px,${translatex}px)`,}} onClick={this.showDetail.bind(this)}>
									<div className={classes.ball}>{index+1}</div>
								</div>)
								
							})
						}
					
						
					</div>
            </div>
        );
    }
}
