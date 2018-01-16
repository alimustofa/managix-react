import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Login from './Login';

ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path='/' component={Login} />
        </Switch>
    </Router>
), document.getElementById('root'));