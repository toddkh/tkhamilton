import React, { PropTypes } from 'react';
import DocNormal from './layoutComponents/Normal/DocNormal';

const DocWrapper = ({ docId, channelSlug }) => (
  <DocNormal docId={docId} channelSlug={channelSlug} />
);

DocWrapper.propTypes = {
  docId: PropTypes.string.isRequired,
  channelSlug: PropTypes.string.isRequired
};

export default DocWrapper;
