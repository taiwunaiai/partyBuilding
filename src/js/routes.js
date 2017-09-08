
import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Layout, Home, Cavalry } from './pages';

export default () => {

    return (
        <Route path="/" component={Layout}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path="/cavalry" component={Cavalry}></Route>
        </Route>
    );
};
