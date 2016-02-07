'use strict';

module.exports = function ($cookies) {

  var cookiePrefix = "ldvowl_";
  var endpointURL = $cookies.get(cookiePrefix + 'endpoint') || 'http://dbpedia.org/sparql';
  var useLocalProxy = false;
  var limit = 10;
  var sparqlTimeout = 30000;
  var debug = 'on';
  var labelLanguage = 'en';
  var format = 'application/sparql-results+json';

  var propertiesOrdered = true;

  var self = this;

  self.init = function () {
    $cookies.put(cookiePrefix + 'endpoint', endpointURL);
  };

  /**
   * Returns the URL to which the requests should be sent. This can be the URL of the selected endpoint for a direct
   * connection or a local proxy.
   *
   * @returns {*}
   */
  self.getRequestURL = function () {
    var url;

    if (useLocalProxy) {
      url = 'http://localhost:8080/sparql';
    } else {
      endpointURL = $cookies.get(cookiePrefix + 'endpoint');
      url = endpointURL;
    }

    return url;
  };

  self.getEndpointURL = function () {
    endpointURL = $cookies.get(cookiePrefix + 'endpoint');
    return endpointURL;
  };

  self.setEndpointURL = function (newEndpoint) {
    endpointURL = newEndpoint;
    $cookies.put(cookiePrefix + 'endpoint', newEndpoint);
  };

  self.getUseLocalProxy = function () {
    return useLocalProxy;
  };

  self.setUseLocalProxy = function (useProxy) {
    useLocalProxy = useProxy;
  };

  self.getLimit = function () {
    return limit;
  };

  self.setLimit = function (newLimit) {
    limit = (typeof newLimit === 'number' && newLimit > 0) ? newLimit : limit;
  };

  self.getTimout = function () {
    return sparqlTimeout;
  };

  self.setTimout = function (newTimeout) {
    if (typeof newTimeout === 'number' && newTimeout > 0) {
      sparqlTimeout = newTimeout;
    }
  };

  self.getDebug = function () {
    return debug;
  };

  self.getLabelLanguage = function () {
    return labelLanguage;
  };

  self.setLabelLanguage = function (newLang) {
    labelLanguage = newLang;
  };

  self.getPropertiesOrdered = function () {
    return propertiesOrdered;
  };

  self.setPropertiesOrdered = function (ordered) {
    propertiesOrdered = ordered;
  };

  self.switchFormat = function () {
    if (format === 'application/sparql-results+json') {
      format = 'json';
    } else {
      format = 'application/sparql-results+json';
    }
  };

  /**
   * Returns a configuration object for the given SPARQL query
   */
  self.forQuery = function (query, short) {
    var config = {};
    if (short) {
      config.params = {
        query: query,
        output: format
      };

    } else {
      config.params = {
        timeout: sparqlTimeout,
        debug: debug,
        format: format,
        query: query,
        ep: endpointURL
      };
    }

    config.headers = {
      "Accept": "application/sparql-results+json"
    };

    return config;
  };

  self.init();

};
