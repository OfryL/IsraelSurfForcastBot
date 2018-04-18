/*jshint esversion: 6 */

const config = require('config');
const Pageres = require('pageres');
const fs = require('fs');
const util = require('util');

const log4js = require('log4js');

const logger = log4js.getLogger("screenshot");

module.exports = function() {
  const selectorValue = 'body > div.cover > div.cover-inner > div.pages.clear-left.clear-right > div > div.msw-fc.msw-js-forecast > div:nth-child(2) > div:nth-child(2) > div > div > div.msw-col-fluid > div > div:nth-child(2) > div > div';

  function getScreenshot(url, fileName, workingDir) {

    const options = {
      crop: true,
      filename: fileName,
      delay: 0,
      selector: selectorValue,
      userAgent: config.get('Screenshots.userAgent'),
      script: __dirname + "/runOnSite.js"
    };

    const fullFilePathNameExt = workingDir + '/' + fileName + '.png';

    return new Promise(function(resolve, reject) {

      var stats = fs.statSync(fullFilePathNameExt);
      var mtime = new Date(util.inspect(stats.mtime));
      logger.error(mtime);

      getScreenshotFromWebPage = function(resolve, reject) {
        logger.debug("getting screenshot started");
        let pageres = new Pageres()
          .src(url, ['400X480'], options)
          .dest(workingDir)
          .run()
          .then(() => {
            logger.debug('screenshot saved to ' + fullFilePathNameExt);
            resolve(fullFilePathNameExt);
          }, (err) => {
            logger.error(err);
            reject(err);
          });
      };

    });
  }

  return {
    getScreenshot
  };

}();
