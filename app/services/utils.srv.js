'use strict';

module.exports =  function () {

  // Public API here
  return {
    labelFromURI: function (uri) {
      var uriLabel = '';
      if (uri !== undefined && uri !== '') {
        var lastSlash = uri.lastIndexOf('/');
        var lastHash = uri.lastIndexOf('#');
        uriLabel = uri.substr(Math.max(lastSlash, lastHash) + 1).replace(/\_/g, ' ');
      }

      return uriLabel;
    }
  };
};
