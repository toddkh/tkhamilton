import React, { PropTypes } from 'react';
import {
  Header,
  HeaderLogo,
  HeaderNavigation,
  HeaderNavigationLinks,
  SocialIcons,
  CopyrightInfo,
  ButtonShareFacebook,
  ButtonRandomArticle
} from 'paradigm-site-components';

const staticPath = `${process.env.STATIC_ORIGIN}/static`;

const HeaderNormal = ({ classes, screenWidth, docId }) => (
  <Header>

    <HeaderLogo docId={docId} />

    <HeaderNavigation docId={docId}>

      <HeaderNavigationLinks
        className={classes.HeaderNavigationInfo}
        links={[
          `About`
        ]}
      />

      {docId ? undefined : (
        <div className={classes.HeaderNavigationSocialIcons}>
          <SocialIcons
            links={[
              {
                classNameKey: `SocialIconTwitter`,
                href: `https://twitter.com/toddkh`,
                imgSrc: `${staticPath}/SocialIconTwitter.svg`,
                imgHoverSrc: `${staticPath}/SocialIconTwitterHover.svg`
              },
              {
                classNameKey: `SocialIconEmail`,
                href: `mailto:todd@tkhamilton.com`,
                imgSrc: `${staticPath}/SocialIconEmail.svg`,
                imgHoverSrc: `${staticPath}/SocialIconEmailHover.svg`
              }
            ]}
          />
        </div>
      )}

      <div className={classes.HeaderNavigationCopyrightInfo}>
        <CopyrightInfo name="tkhamilton." />
      </div>
    </HeaderNavigation>



    {(!docId || screenWidth < 768) ? undefined : (
      <ButtonRandomArticle docId={docId} children="Next Article" />
    )}
  </Header>
);

HeaderNormal.propTypes = {
  classes: PropTypes.object.isRequired,
  screenWidth: PropTypes.number.isRequired,
  docId: PropTypes.string.isRequired
};

export default HeaderNormal;
