import React, { PropTypes } from 'react';
import {
  AppContainer,
  PreviewBar
} from 'paradigm-site-components';
import HeaderNormal from './HeaderNormal';

const AppNormal = ({ classes, screenWidth, docId, children }) => (
  <AppContainer className={classes.AppNormal}>
    <HeaderNormal docId={docId} />

    <div className={classes.Body}>
      <div className={classes.Main}>
        {children}
      </div>


    </div>

    <PreviewBar />
  </AppContainer>
);

AppNormal.propTypes = {
  classes: PropTypes.object.isRequired,
  screenWidth: PropTypes.number.isRequired,
  docId: PropTypes.string,
  children: PropTypes.any
};

export default AppNormal;
