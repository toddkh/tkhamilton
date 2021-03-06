import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { ArticleAuthor} from 'paradigm-site-components';
import {
  getValidHtml,
  removeLinks
} from 'paradigm-site-components/lib/utilities/html';
import isServerSide from 'paradigm-site-components/lib/utilities/isServerSide';
import getEmbedUrl from 'paradigm-site-components/lib/utilities/getEmbedUrl';

const Trending = ({ classes, channelQueryResult, screenWidth }) => (
  channelQueryResult ? (
    <div className={classes.Trending}>
      <div className={classes.TrendingItems}>
        {channelQueryResult.map((docState, index) => {
          let imageWidth = screenWidth;

          if (screenWidth >= 1190) {
            if (index % 4) {
              imageWidth = 370;
            } else {
              imageWidth = 770;
            }
          } else if (screenWidth >= 768) {
            if (index % 3) {
              imageWidth = Math.ceil((screenWidth / 2) - 25);
            }
          }

          return (
            <div
              key={`TrendingItem:${docState.docId}`}
              className={classes.TrendingItem}
            >

              <Link
                className={classes.TrendingTitle}
                to={docState.docPermalink}
              >
                {docState.docTitle}
              </Link>

              <div
                className={classes.TrendingDetails}
                dangerouslySetInnerHTML={{
                  __html: getValidHtml(
                    docState.docExcerpt || docState.docIntro,
                    removeLinks
                  )
                }}
              />

              <Link
                className={classes.TrendingImageWrap}
                to={docState.docPermalink}
              >
                <img
                  className={classes.TrendingImage}
                  src={getEmbedUrl(
                    docState.docFeaturedImage,
                    imageWidth,
                    Math.ceil(imageWidth / 1.91)
                  )}
                />
              </Link>

              <Link
                className={classes.TrendingButton}
                to={`/basic`}
              >
              {'The Good Stuff'}
              </Link>

              <div
                className={classes.TrendingBottomSeperator}
                />
              
            </div>
          );
        })}
      </div>

    </div>
  ) : null
);

Trending.propTypes = {
  classes: PropTypes.object.isRequired,
  screenWidth: PropTypes.number.isRequired,
  channelQueryResult: PropTypes.array
};

export default Trending;
