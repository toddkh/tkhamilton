import React, { PropTypes } from 'react';
import { Doc } from 'paradigm-site-components';
import getReadableDate from '../../../utilities/getReadableDate';
import getAds from '../../../utilities/getAds';

const DocNormal = ({ classes, screenWidth, docId, channelSlug }) => (
  <div className={classes.DocNormal}>
    <Doc
      docId={docId}
      channelSlug={channelSlug}
      defaultDocSubHeading="Trending"
      getReadableDate={getReadableDate}
      embedWidth={840}
      embedHeight={440}
      paginateEvery={9}
      ads={getAds(screenWidth)}
      adOffset={3}
      adEvery={4}
      minItemsBeforeBottomAd={2}
    />
  </div>
);

DocNormal.propTypes = {
  classes: PropTypes.object.isRequired,
  screenWidth: PropTypes.number.isRequired,
  docId: PropTypes.string.isRequired,
  channelSlug: PropTypes.string.isRequired
};

export default DocNormal;
