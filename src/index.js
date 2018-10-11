import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from "react-router-dom";
import indexRoutes from './routes/index';
import './assets/css/index.css';
import { Provider } from 'react-redux';
import store from './store';

const history = createBrowserHistory();

ReactDOM.render(
	<Provider store={store}>
	  <Router history={history}>
	    <Switch>
	      {indexRoutes.map((route, index) => 
	        <Route path={route.path} component={route.component} key={index} />
	      )}
	    </Switch>
	  </Router>
	</Provider>,
  document.getElementById('root')
);