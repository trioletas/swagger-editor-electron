function getScreenSize() {
  const screen = require('screen');
  return screen.getPrimaryDisplay().workAreaSize;
}

module.exports = {
  getScreenSize,
};
