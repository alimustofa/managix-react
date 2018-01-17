import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const loggedIn = false;
ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
        </Switch>
    </Router>
), document.getElementById('root'));
