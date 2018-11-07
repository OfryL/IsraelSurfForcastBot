const logger = require('log4js').getLogger("middlewareLogger");
const telegramLogger = require('./telegramLogger');

module.exports = async function(ctx, next) {
  const ctxData = JSON.stringify(ctx.message);
  try {
    await next();
  } catch(err) {
    logger.error(err + '\nData: ' + ctxData);
    telegramLogger.extLogErr(err, errorDesc);
  }
}