import React from 'react';
import { createAppRoutes } from 'paradigm-site-components/lib/utilities';
import * as components from './index';
import staticHtml from '../staticHtml/index';

const AppRoutes = createAppRoutes({
  AppContainer: components.AppWrapper,
  Channel: components.ChannelWrapper,
  Doc: components.DocWrapper,

  applicationTitle: 'tkhamilton',

  channels: [
    'Basic',
    'Home'
  ],

  staticHtml,
  staticPages: [
    'About'
  ]
});

const App = () => (
  <AppRoutes />
);

export default App;
export { components };
