const exec = require('child_process').exec;

const ACTION_MINIMIZE = 'Minimize';
const ACTION_MAXIMIZE = 'Maximize';
const ACTION_DISABLED = 'None';

function wrapPromiseCallback(promise, callback) {
  if (callback) {
    promise
      .then(result => callback(null, result))
      .catch(err => callback(err, null));
  }
  return promise;
}

function getTitlebarAction(callback) {
  const promise = new Promise((resolve, reject) => {
    exec('defaults read NSGlobalDomain AppleActionOnDoubleClick', (err, stdout, stderr) => {
      const result = stdout ? stdout.trim() : null;
      if (callback) {
        callback(err, err ? null : result);
      }
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  return wrapPromiseCallback(promise, callback);
}

function createIsTitlebarActionHelper(ACTION) {
  return (callback) => {
    const promise = getTitlebarAction()
      .then(action => (action === ACTION));
    return wrapPromiseCallback(promise, callback);
  };
}

module.exports = getTitlebarAction;
module.exports.isMinimize = createIsTitlebarActionHelper(ACTION_MINIMIZE);
module.exports.isMaximize = module.exports.isZoom = createIsTitlebarActionHelper(ACTION_MAXIMIZE);
module.exports.isDisabled = createIsTitlebarActionHelper(ACTION_DISABLED);
