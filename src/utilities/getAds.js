const ads = {
  mobile: {
    inArticle: [
      'div-gpt-ad-1489504008612',
      'div-gpt-ad-1489504037170',
      'div-gpt-ad-1489504065406'
    ],

    bottom: 'div-gpt-ad-1489504095818',
    fixed: 'div-gpt-ad-1489503935048'
  },

  desktop: {
    inArticle: [
      'div-gpt-ad-1489503647033',
      'div-gpt-ad-1489503736452',
      'div-gpt-ad-1489503783140'
    ],

    top: 'div-gpt-ad-1489503854568',
    bottom: 'div-gpt-ad-1489503817214'
  }
};

const getAds = screenWidth => {
  if (screenWidth < 768) {
    return ads.mobile;
  } else {
    return ads.desktop;
  }
};

export default getAds;
