import { providers } from 'paradigm-site-components';
import themesFiles from './themes/files';

const staticOrigin = process.env.STATIC_ORIGIN;
const min = process.env.MIN_EXT || '';
const themeName = Object.keys(themesFiles).shift();
const themeFiles = themesFiles[themeName];

export default {
  providers: {
    ...providers,

    page: {
      ...providers.page,

      state: {
        ...providers.page.state,

        documentTitle: 'tkhamilton',
        metaDescription: 'tkhamilton',
        jsFiles: [`${staticOrigin}/dist/TKHamilton${min}.js`]
      }
    },

    theme: {
      ...providers.theme,

      state: {
        ...providers.theme.state,

        themesFiles,
        themeFiles,
        themeName
      }
    }
  }
};
