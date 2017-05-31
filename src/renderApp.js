import Raven from './raven'
import 'react-redux-provide/lib/install';
import React from 'react';
import { render } from 'react-dom';
import { pushReplicator } from 'react-redux-provide';
import { reloadFunctions, reloadProviders } from 'react-redux-provide';
import memory from 'redux-replicate-memory';
import {
  apiProviders,
  localProviders,
  replicators
} from 'paradigm-site-components';
import App, { components } from './components/App';
import defaultProps from './defaultProps';
import provideRouter from 'provide-router';
import { browserHistory } from 'react-router';

const { providers } = defaultProps;
const router = provideRouter(browserHistory);

providers.router = router;

pushReplicator(apiProviders, replicators.paradigmApi);
pushReplicator(localProviders, memory);

replicators.paradigmApi.initApiStructure(apiProviders);

function renderApp(props, element = document.getElementById('root')) {
  return render(<App { ...props } />, element);
}

renderApp(defaultProps);

export default renderApp;

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    let oldFunctions = components;

    module.hot.accept('./components/App', () => {
      const newFunctions = require('./components/App').components;

      reloadFunctions(oldFunctions, newFunctions);
      oldFunctions = newFunctions;
    });

    module.hot.accept('./defaultProps', () => {
      const providers = require('./defaultProps').default.providers;

      providers.router = router;

      reloadProviders(providers);
    });
  }
}
