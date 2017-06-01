import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { ArticleAuthor} from 'paradigm-site-components';
import {
  getValidHtml,
  removeLinks
} from 'paradigm-site-components/lib/utilities/html';
import isServerSide from 'paradigm-site-components/lib/utilities/isServerSide';
import getEmbedUrl from 'paradigm-site-components/lib/utilities/getEmbedUrl';
import getReadableDate from '../../utilities/getReadableDate';

const New = ({ classes, channelQueryResult, screenWidth }) => (
  channelQueryResult ? (
    <div className={classes.New}>
      <div className={classes.NewItems}>
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
              key={`NewItem:${docState.docId}`}
              className={classes.NewItem}
            >
              <Link
                className={classes.NewImageWrap}
                to={docState.docPermalink}
              >
                <img
                  className={classes.NewImage}
                  src={getEmbedUrl(
                    docState.docFeaturedImage,
                    imageWidth,
                    Math.ceil(imageWidth / 1.91)
                  )}
                />
              </Link>

              <Link
                className={classes.NewTitle}
                to={docState.docPermalink}
              >
                {docState.docTitle}
              </Link>

              <div
                className={classes.NewDetails}
                dangerouslySetInnerHTML={{
                  __html: getValidHtml(
                    docState.docExcerpt || docState.docIntro,
                    removeLinks
                  )
                }}
              />
            <div className={classes.NewItemAuthorDate}>
              <ArticleAuthor
                className={classes.NewItemAuthor}
                userId={docState.docUserId}
                userFirstName={
                  docState.docUser && docState.docUser.firstName
                }
                userLastName={
                  docState.docUser && docState.docUser.lastName
                }
              />

              <div className={classes.NewItemDate}>
                {getReadableDate(docState.docPublishedAt)}
              </div>
            </div>
          </div>
          );
        })}
      </div>

    </div>
  ) : null
);

New.propTypes = {
  classes: PropTypes.object.isRequired,
  screenWidth: PropTypes.number.isRequired,
  channelQueryResult: PropTypes.array
};

export default New;
