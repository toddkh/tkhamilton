import 'paradigm-site-components/lib/utilities/setGlobalDocument';
import getEmbedUrl from 'paradigm-site-components/lib/utilities/getEmbedUrl';

const fs = require('fs');
const nsaHtml = fs.readFileSync('static/nsa.html');

const staticOrigin = process.env.STATIC_ORIGIN;

const getImageUrl = digitalAsset => {
  let imageUrl = getEmbedUrl(
    digitalAsset || {},
    digitalAsset && digitalAsset.customWidth || '1200',
    digitalAsset && digitalAsset.customHeight || '0'
  );

  if (imageUrl.indexOf('//') === 0) {
    imageUrl = 'http:'+imageUrl;
  }

  return imageUrl;
};

function renderDocumentToString(html, states, clientStates) {
  const {
    documentTitle = `tkhamilton`,
    metaDescription = `tkhamilton`,
    metaRobots = `index,follow`,
    iconFile = `${staticOrigin}/static/favicon.ico`,
    cssFiles = [],
    jsFiles = []
  } = states.page || {};

  const { routing } = states.router || {};
  const { pathname } = routing.locationBeforeTransitions;
  const docId = /^\/(.*)\/([0-9]*)\/([0-9]*)\/([0-9]*)\/(.*)/gi.test(pathname)
    && pathname.split('/')[5];  // TODO: get this from page state instead?
  const docState = docId && clientStates[`documents/${docId}`];

  return (
    `<!DOCTYPE html>`
    + `<html>`
    + `<head>`
    + `<title>${documentTitle.substring(0, 50).trim()}</title>`
    + `<meta charset="utf-8"/>`
    + `<meta http-equiv="X-UA-Compatible" content="IE=edge"/>`
    + `<meta name="viewport" content="width=device-width, initial-scale=1.0"/>`
    + `<meta name="description" content="${metaDescription}"/>`
    + `<meta name="robots" content="${metaRobots}"/>`
    + `<meta name="msapplication-config" content="${staticOrigin}/static/browserconfig.xml" />`
    + (docState ? (
      `<meta name="keywords" content="${docState.docCategories && docState.docCategories.map(({ title }) => title).join(',')}"/>`
      + `<meta property="fb:app_id" content="213707182135602"/>`
      + `<meta property="og:site_name" content="tkhamilton"/>`
      + `<meta property="og:title" content="${docState.docFacebookTitle || docState.docTitle}"/>`
      + `<meta property="og:url" content="http://www.tkhamilton.com${docState.docPermalink}"/>`
      + `<meta property="og:description" content="${docState.docFacebookDesc || docState.docExcerpt || metaDescription}"/>`
      + `<meta property="og:image" content="${getImageUrl(docState.docFacebookImage && docState.docFacebookImage.url ? docState.docFacebookImage : docState.docFeaturedImage)}"/>`
      + `<meta property="og:type" content="article"/>`
      + `<meta property="og:article:published_time" content="${docState.docPublishedAt}"/>`
      + `<meta property="og:article:modified_time" content="${docState.docUpdatedAt}"/>`
      + `<meta property="og:locale" content="en_US" />`
      + `<meta property="bt:id" content="${docId}"/>`
      + `<meta property="bt:author" content="${docState.docUser && docState.docUser.username}"/>`
      + `<meta property="article:publisher" content="https://www.facebook.com/tkhamilton"/>`
      + (docState.docUser && docState.docUser.facebook ? `<meta property="article:author" content="${docState.docUser.facebook}"/>` : '')
      + `<meta name="twitter:site" content="@tkhamilton"/>`
      + `<meta name="twitter:card" content="summary_large_image"/>`
      + `<meta name="twitter:title" content="${docState.docTwitterTitle || docState.docTitle}"/>`
      + `<meta name="twitter:description" content="${docState.docTwitterDesc || docState.docExcerpt || metaDescription}"/>`
      + `<meta name="twitter:image" content="${getImageUrl(docState.docTwitterImage && docState.docTwitterImage.url ? docState.docTwitterImage : docState.docFeaturedImage)}"/>`
      + (docState.docUser && docState.docUser.twitter ? `<meta name="twitter:creator" content="${docState.docUser.twitter}"/>` : '')
      + `<link rel="canonical" href="http://www.tkhamilton.com${docState.docPermalink}"/>`
    ) : (
      `<meta name="keywords" content="trending,latest"/>`
      + `<meta property="fb:app_id" content="213707182135602"/>`
      + `<meta property="article:publisher" content="https://www.facebook.com/tkhamilton"/>`
      + `<meta property="og:type" content="website"/>`
      + `<meta property="og:url" content="http://www.tkhamilton.com"/>`
      + `<meta property="og:site_name" content="tkhamilton"/>`
      + `<meta property="og:title" content="tkhamilton"/>`
      + `<meta property="og:description" content="${metaDescription}"/>`
      + `<meta property="og:image" content="${staticOrigin}/static/LogoNormal.svg"/>`
      + `<meta property="og:locale" content="en_US" />`
      + `<meta name="twitter:site" content="@tkhamilton"/>`
      + `<meta name="twitter:card" content="summary_large_image"/>`
      + `<meta name="twitter:title" content="tkhamilton"/>`
      + `<meta name="twitter:description" content="${metaDescription}"/>`
      + `<link rel="canonical" href="http://www.tkhamilton.com"/>`
    ))
    + `<link rel="shortcut icon" type="image/ico" href="${iconFile}"/>`
    + `<link href="${staticOrigin}/static/apple-icon-120x120.png" rel="apple-touch-icon" />`
    + `<link href="${staticOrigin}/static/apple-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />`
    + `<link href="${staticOrigin}/static/apple-icon-167x167.png" rel="apple-touch-icon" sizes="167x167" />`
    + `<link href="${staticOrigin}/static/apple-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />`
    + `<link href="${staticOrigin}/static/android-icon-192x192.png" rel="icon" sizes="192x192" />`
    + `<link href="${staticOrigin}/static/android-icon-128x128.png" rel="icon" sizes="128x128" />`
    + `<link href="https://fonts.googleapis.com/css?family=Dosis|Oswald" rel="stylesheet"/>`
    + cssFiles.map(cssFile => (
      `<link rel="stylesheet" type="text/css" href="${cssFile}"/>`
    )).join('')
    + `</head>`
    + `<body>`
    + `<div id="root">${html}</div>`
    + `<script>`
    + `window.onunload = function(){ window.scrollTo(0,0); };`
    + `window.paradigmBuildNumber = ${process.env.BUILD_NUMBER || 0};`
    + `window.clientStates = JSON.parse(unescape('${escape(JSON.stringify(clientStates))}'));`
    + `window.paradigmApiHost = window.location.origin;`
    + `</script>`
    + jsFiles.map(jsFile => (
      `<script src="${jsFile}"></script>`
    )).join('')
    + nsaHtml
    + `</body>`
    + `</html>`
  );
}

export default renderDocumentToString;
