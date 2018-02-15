import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Router, Switch, Route } from 'react-router-dom';

import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

import './styles/index.css';
import Store from './global/Store';

import DefaultLayout from './ui/layouts/Default';

import DashboardPage from './ui/common/Dashboard';
import IntrospectPage from './ui/introspect/Introspect';
import PageNotFound from './ui/common/NotFound';
import InfoModal from './ui/introspect/InfoModal';

import DevPage from './ui/common/Dev';

// replace it with your own tracking code.
ReactGA.initialize('UA-109500944-1');

const history = createBrowserHistory();
const historyListener = ( location, action ) => {
  ReactGA.set({ page: location.pathname + location.search });
  ReactGA.pageview(location.pathname + location.search);
  // ReactGA.pageview(location.pathname);
}

history.listen( historyListener );
historyListener(window.location);


Store.hydrate();


const IntrospectRoutes = (props) => {
  return (
    <IntrospectPage {...props}>
    <Switch>
      <Route path="/introspect/info" component={ InfoModal } />
    </Switch>
    </IntrospectPage>
  );
}


ReactDOM.render(
  <Router history={history}>
    <DefaultLayout>
      <Switch>
        <Route exact path="/" component={ DashboardPage } />
        <Route exact path="/dashboard" component={ DashboardPage } />
        <Route exact path="/dev" component={ DevPage } />
        <Route path="/introspect" component={ IntrospectRoutes } />
        <Route component={ PageNotFound }/>
      </Switch>
    </DefaultLayout>
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
