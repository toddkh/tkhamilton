import React, { PropTypes } from 'react';
import { ChannelFeed } from 'paradigm-site-components';
import isServerSide from 'paradigm-site-components/lib/utilities/isServerSide';
import getReadableDate from '../../utilities/getReadableDate';

const Latest = ({ channelSlug, screenWidth }) => (
  <ChannelFeed
    channelSlug={channelSlug}
    defaultDocSubHeading="News"
    getReadableDate={getReadableDate}
    embedWidth={index => {
      if (isServerSide || screenWidth < 768) {
        return 414;
      } else if (screenWidth < 1190) {
        return (index % 5)
          ? Math.ceil((screenWidth / 2) - 25)
          : screenWidth;
      } else {
        return (index % 7 < 4)
          ? 570
          : 370;
      }
    }}
    embedHeight={index => {
      if (isServerSide || screenWidth < 768) {
        return 201;
      } else if (screenWidth < 1190) {
        return (index % 5)
          ? Math.ceil(((screenWidth / 2) - 25) / 1.91)
          : Math.ceil(screenWidth / 1.91);
      } else {
        return (index % 7 < 4)
          ? 298
          : 194;
      }
    }}
  />
);

Latest.propTypes = {
  channelSlug: PropTypes.string.isRequired,
  screenWidth: PropTypes.number.isRequired
};

export default Latest;
