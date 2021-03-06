// Generated by CoffeeScript 1.10.0
(function() {
  var Host, Promise, debug, _, minimatch,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  debug = require('debug')('Host');

  Promise = require('bluebird');

  minimatch = require('minimatch');

  _ = require('lodash');

  Host = (function() {
    var Host_CPU, Host_Metrics, createMetricsInstance, session, xenAPI;

    Host_CPU = void 0;

    Host_Metrics = void 0;

    session = void 0;
    
    xenAPI = void 0;
    
    createHostCPU = function(cpu, opaqueRef) {
      return new Host_CPU(session, cpu, opaqueRef, xenAPI);
    };

    createHostMetrics = function(metrics, opaqueRef) {
      return new Host_Metrics(session, metrics, opaqueRef, xenAPI);
    };

    function Hosts(_session, _hostCPU, _hostMetrics, _xenAPI) {
      this.list = bind(this.list, this);
      debug("constructor()");
      if (!_session) {
        throw Error("Must provide session");
      }
      if (!_xenAPI) {
        throw Error("Must provide xenAPI");
      }
      session = _session;
      xenAPI = _xenAPI;
      Host_CPU = _hostCPU;
      Host_Metrics = _hostMetrics;
    }

    Hosts.prototype.get = function() {
      debug("list()");
      var $this = this;
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var _cpu = null;
          var _metrics = null;

          $this.cpu().then(function(cpu) {
            _cpu = cpu;
            if(_cpu !== null && _metrics !== null){
              return resolve({'cpu': _cpu, 'metrics': _metrics});
            }
          });
          $this.metrics().then(function(metrics) {
            _metrics = metrics;
            if(_cpu !== null && _metrics !== null){
              return resolve({'cpu': _cpu, 'metrics': _metrics});
            }
          });
        };
      })(this));
    };
    
    Hosts.prototype.metrics = function() {
      debug("list()");
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return session.request("host_metrics.get_all_records").then(function(value) {
            var Metrics;
            if (!value) {
              reject();
            }
            debug("Received " + (Object.keys(value).length) + " records");
            Metrics = _.map(value, createHostMetrics);
            return resolve(_.filter(Metrics, function(metrics) {
              return metrics;
            }));
          })["catch"](function(e) {
            debug(e);
            return reject(e);
          });
        };
      })(this));
    };
    
    Hosts.prototype.cpu = function() {
      debug("list()");
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return session.request("host_cpu.get_all_records").then(function(value) {
            var CPUS;
            if (!value) {
              reject();
            }
            debug("Received " + (Object.keys(value).length) + " records");
            CPUS = _.map(value, createHostCPU);
            return resolve(_.filter(CPUS, function(cpu) {
              return cpu;
            }));
          })["catch"](function(e) {
            debug(e);
            return reject(e);
          });
        };
      })(this));
    };

    return Hosts;

  })();

  module.exports = Host;

}).call(this);
