import 'react-redux-provide/lib/install';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { pushReplicator } from 'react-redux-provide';
import { apiProviders, replicators } from 'paradigm-site-components';
import App from './components/App';
import defaultProps from './defaultProps';

const { providers } = defaultProps;
const min = process.env.MIN_EXT || '';
const themes = require(`./themes/index${min}`);

providers.theme.state.themes = themes;

pushReplicator(apiProviders, replicators.paradigmApi);

replicators.paradigmApi.initApiStructure(apiProviders);

function renderAppToString(props = defaultProps) {
  return renderToString(<App { ...props } />);
}

export default renderAppToString;
