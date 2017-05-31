import root from './root.css';
import common from './common.css';
import App from './App.css';
import Article from './Article.css';
import Channel from './Channel.css';
import CopyrightInfo from './CopyrightInfo.css';
import Header from './Header.css';
import Listacle from './Listacle.css';
import Logo from './Logo.css';
import RightRail from './RightRail.css';
import Slides from './Slides.css';
import Slideshow from './Slideshow.css';
import SocialIcons from './SocialIcons.css';
import SponsorContent from './SponsorContent.css';
import Trending from './Trending.css';
export default {
  classes: {
    ...root,
    ...common,
    ...App,
    ...Article,
    ...Channel,
    ...CopyrightInfo,
    ...Header,
    ...Listacle,
    ...Logo,
    ...RightRail,
    ...Slides,
    ...Slideshow,
    ...SocialIcons,
    ...SponsorContent,
    ...Trending
  }
};

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    const reloadTheme = require('provide-theme').reloadTheme;

    // for some reason webpack uses static analysis (or something like that)
    // for both module.hot.accept and require, which means we can't use a nice
    // array and map all of this; each module path has to be explicitly defined
    module.hot.accept([
      './root.css',
      './common.css',
      './App.css',
      './Article.css',
      './Channel.css',
      './CopyrightInfo.css',
      './Header.css',
      './Listacle.css',
      './Logo.css',
      './RightRail.css',
      './Slides.css',
      './Slideshow.css',
      './SocialIcons.css',
      './SponsorContent.css',
      './Trending.css'
    ], () => {
      reloadTheme('BasicTheme', {
        classes: {
          ...require('./root.css'),
          ...require('./common.css'),
          ...require('./App.css'),
          ...require('./Article.css'),
          ...require('./Channel.css'),
          ...require('./CopyrightInfo.css'),
          ...require('./Header.css'),
          ...require('./Listacle.css'),
          ...require('./Logo.css'),
          ...require('./RightRail.css'),
          ...require('./Slides.css'),
          ...require('./Slideshow.css'),
          ...require('./SocialIcons.css'),
          ...require('./SponsorContent.css'),
          ...require('./Trending.css')
        }
      });
    });
  }
}
