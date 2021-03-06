// Generated by CoffeeScript 1.10.0
(function() {
  var Host_Metrics, Promise, debug;

  debug = require('debug')('XenAPI:Host_CPU');

  Promise = require('bluebird');

  Host_Metrics = (function() {
    var session, xenAPI;

    session = void 0;

    xenAPI = void 0;


    /**
    * Construct Host_CPU
    * @class
    * @param      {Object}   session - An instance of Session
    * @param      {Object}   metrics - A JSON object representing this metrics
    * @param      {String}   opaqueRef - The OpaqueRef handle to this metrics
    * @param      {Object}   xenAPI - An instance of XenAPI
     */

    function Host_Metric(_session, _metrics, _opaqueRef, _xenAPI) {
      debug("constructor()");
      debug(_metrics, _opaqueRef);
      if (!_session) {
        throw Error("Must provide `session`");
      }
      if (!_metrics) {
        throw Error("Must provide `host_metrics`");
      }
      if (!_opaqueRef) {
        throw Error("Must provide `opaqueRef`");
      }
      session = _session;
      xenAPI = _xenAPI;
      this.opaqueRef = _opaqueRef;
      this.uuid = _metrics.uuid;
      this.memory_total = _metrics.memory_total;
      this.memory_free = _metrics.memory_free;
      this.live = _metrics.live;
      this.last_updated = _metrics.last_updated;
    }

    return Host_Metric;

  })();

  module.exports = Host_Metrics;

}).call(this);
