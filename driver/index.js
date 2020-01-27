const chrome = require("./chrome");

module.exports = function (drive) {
  switch (drive) {
      case "chrome": {
          return chrome;
      }
      default: chrome;
  }
};
