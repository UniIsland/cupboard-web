import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'

import App from './app'
import About from './app/components/about'
import Reporting from './app/components/reporting'
import EmptyView from './app/components/empty_view'
import MetricView from './app/components/metric_view'

require('./style.scss')

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={About}/>
      <Route path=":namespace" component={Reporting}>
        <IndexRoute component={EmptyView}/>
        <Route path=":metric" component={MetricView} />
      </Route>
    </Route>
  </Router>
), document.getElementById('container'))
