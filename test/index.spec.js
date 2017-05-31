import 'react-redux-provide/lib/install';
import expect from 'expect';
import React, { PropTypes } from 'react';
import { Simulate } from 'react-addons-test-utils';
import { renderTest } from 'react-redux-provide-test-utils';
import App from '../src/components/App';
import defaultProps from '../src/defaultProps';
import provideRouter from 'provide-router';
import { browserHistory } from 'react-router';

const { providers } = defaultProps;
const router = provideRouter(browserHistory);

providers.router = router;

const appInstance = renderTest(App, defaultProps);

describe('TKHamilton', () => {
  it('should render correctly', () => {
    // NOTE: use the page provider within some component then uncomment this
    // expect(document.title).toBe('TKHamilton');
    expect(appInstance.node.tagName).toBe('DIV');
    expect(typeof appInstance.node.className).toBe('string');
  });
});
