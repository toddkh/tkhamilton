import React, { PropTypes } from 'react';
import AppNormal from './layoutComponents/Normal/AppNormal';

const AppWrapper = ({ docId, children }) => (
  <AppNormal docId={docId} children={children} />
);

AppWrapper.propTypes = {
  docId: PropTypes.string.isRequired,
  children: PropTypes.any
};

export default AppWrapper;
