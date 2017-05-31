import { createMiddleware } from 'provide-page';
import renderToString from './renderAppToString';
import renderDocumentToString from './renderDocumentToString';
import defaultProps from './defaultProps';

const middleware = createMiddleware({
  renderToString,
  renderDocumentToString,
  defaultProps,
  initStates: providers => {
    const pageState = providers.page.state;
    const isMobile = parseInt(pageState.requestHeaders['x-mobile']) > 0;

    providers.screen.state = {
      ...providers.screen.state,
      screenWidth: isMobile ? 640 : 1280,
      screenHeight: isMobile ? 640 : 1280,
      isMobile
    };
  },
  getStates: states => {
    const pageState = states.page;
    const themeState = states.theme;
    const themeJsFile = themeState && themeState.themeFiles.jsFile;
    const themeCssFile = themeState && themeState.themeFiles.cssFile;
    const search = states.router
      && states.router.routing
      && states.router.routing.locationBeforeTransitions
      && states.router.routing.locationBeforeTransitions.search
      || '';

    return {
      ...states,

      page: {
        ...pageState,

        previewing: search === '?preview',

        jsFiles: [
          ...(themeJsFile ? [themeJsFile] : []),
          ...(pageState.jsFiles || [])
        ],

        cssFiles: [
          ...(themeCssFile ? [themeCssFile] : []),
          ...(pageState.cssFiles || [])
        ]
      }
    };
  },
  maxResponseTime: 0
});

export default middleware;
