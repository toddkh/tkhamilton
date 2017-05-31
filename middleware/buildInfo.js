'use strict';

function buildInfo(req, res) {
  res.json({
    buildNumber: process.env.BUILD_NUMBER || 0
  });
}

module.exports = buildInfo;
