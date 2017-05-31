if (!process.env.API_HOST) {
  process.env.API_HOST = 'https://paradigm-api.f12.global';
}
if (!process.env.ORGANIZATION_ID) {
  process.env.ORGANIZATION_ID = 'f643bdef-fa32-4ba8-a010-4a8bc412d6d8';
}
if (!process.env.APPLICATION_ID) {
  process.env.APPLICATION_ID = '90cf7f2f-bba6-4291-b17e-1234e0c45754';
}
if (!process.env.APPLICATION_SECRET) {
  process.env.APPLICATION_SECRET = 'eyJhbGciOiJIUzI1NiJ9.MTQ5NTcyODQzNzA4NQ.H6mk6IQneVDkFeM76SLnsyjz0q677brrfbzlqtz12So';
}

var requestDefaults = {
  headers: {
    organizationid: process.env.ORGANIZATION_ID,
    applicationid: process.env.APPLICATION_ID,
    applicationsecret: process.env.APPLICATION_SECRET
  }
};

var responseHeaders = {
  'X-Tag': 'tkhamiltonChannelAPI'
};

module.exports = {
  debug: true,
  host: process.env.API_HOST,
  version: process.env.API_VERSION,
  requestDefaults: requestDefaults,
  responseHeaders: responseHeaders
};
