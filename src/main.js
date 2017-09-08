
// @flow

/** Load global style */
import 'fonts/icomoon/style.css';
import './sass/global.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, browserHistory } from 'react-router';
import getRoutes from 'routes';
import stores from 'stores';

render(

    <Provider {...stores}>
        <Router history={browserHistory}>
            {getRoutes()}
        </Router>
    </Provider>,

    document.getElementById('root')
);
