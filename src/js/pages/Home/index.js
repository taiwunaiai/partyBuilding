
import React, { Component, PropTypes } from 'react';
import clazz from 'classname';

import classes from './style.scss';
import Personal from './components/Personal';
import Achievement from './components/Achievement';
import Chat from './components/Chat';
import Party from './components/Party';
import Study from './components/Study';
import CurrentPolitics from './components/CurrentPolitics';
import Model from './components/Model';
import StudyGarden from './components/StudyGarden';
export default class Home extends Component {

    render() {

        return (
            <div>
                <div className={classes.background}>
                    <div className={classes.bgimg}>
                          <img src="/images/Top.png"></img>
                    </div>
                </div>

                <div className={classes.content}>

                    <div className={classes.title}>
                      
                    </div>

                    <div className={classes.topRow}>
                        <Personal className={classes.card}></Personal>
                         <Achievement className={classes.card}></Achievement>
                    </div>

                    <div className={classes.row}>
                        <Chat className={classes.card}></Chat>
                        <Party className={classes.card}></Party>
                         <Study className={classes.card}></Study>
                    </div>

                    <div className={classes.row}>
                        
                         <CurrentPolitics className={classes.card}></CurrentPolitics>
                        <Model className={classes.card}></Model>
                         <StudyGarden className={classes.card}></StudyGarden>
                    </div>
                </div>
            </div>
        );
    }
}
