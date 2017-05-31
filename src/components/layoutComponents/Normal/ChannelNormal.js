import React, { PropTypes } from 'react';
import { Channel } from 'paradigm-site-components';
import channelQueryComponents from '../../channelQueryComponents';

const ChannelNormal = ({ applicationTitle, channelTitle, channelSlug }) => (
  <Channel
    applicationTitle={applicationTitle}
    channelTitle={channelTitle}
    channelSlug={channelSlug}
    channelQueryComponents={channelQueryComponents}
  />
);

ChannelNormal.propTypes = {
  applicationTitle: PropTypes.string.isRequired,
  channelTitle: PropTypes.string.isRequired,
  channelSlug: PropTypes.string.isRequired
};

export default ChannelNormal;