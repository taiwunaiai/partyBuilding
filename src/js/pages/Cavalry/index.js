
import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import clazz from 'classname';

import classes from './style.scss';
import Top from './components/Top';
import Map from './components/Map';
import Charts from './components/Charts';

@inject(stores => ({
    teams: stores.cavalry.teams,
    showConditions: stores.cavalry.showConditions,
    toggleConditions: stores.cavalry.toggleConditions,
}))
@observer
export default class Cavalry extends Component {

    render() {

        var { teams, showConditions, toggleConditions } = this.props;

        return (
            <div className={clazz('clearfix', classes.container)}>
                <Top teams={teams.slice()}></Top>
                <Map {...{
                    showConditions,
                }}></Map>
                <Charts {...{
                    showConditions,
                    toggleConditions,
                }}></Charts>
            </div>
        );
    }
}
