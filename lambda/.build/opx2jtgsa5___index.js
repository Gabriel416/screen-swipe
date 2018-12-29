const launch = require('@serverless-chrome/lambda')

const handler = require('./ijyo460ls48___index.js')
const options = {"flags":[]}

module.exports.handler = function ensureHeadlessChrome (
  event,
  context,
  callback
) {
  return (typeof launch === 'function' ? launch : launch.default)(options)
    .then(instance =>
      handler.handler(event, context, callback, instance))
    .catch((error) => {
      console.error(
        'Error occured in serverless-plugin-chrome wrapper when trying to ' +
          'ensure Chrome for handler() handler.',
        options,
        error
      )

      callback(error)
    })
}