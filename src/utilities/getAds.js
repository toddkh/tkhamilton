const ads = {
  mobile: {},

  desktop: {}
};

const getAds = screenWidth => {
  if (screenWidth < 768) {
    return ads.mobile;
  } else {
    return ads.desktop;
  }
};

export default getAds;
