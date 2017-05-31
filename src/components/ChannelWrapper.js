import React, { PropTypes } from 'react';
import ChannelNormal from './layoutComponents/Normal/ChannelNormal';

const ChannelWrapper = ({ applicationTitle, channelTitle, channelSlug }) => (
  <ChannelNormal
    applicationTitle={applicationTitle}
    channelTitle={channelTitle}
    channelSlug={channelSlug || 'home'}
  />
);

ChannelWrapper.propTypes = {
  applicationTitle: PropTypes.string.isRequired,
  channelTitle: PropTypes.string.isRequired,
  channelSlug: PropTypes.string.isRequired
};

export default ChannelWrapper;
