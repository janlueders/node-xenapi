// Generated by CoffeeScript 1.9.1
(function() {
  var Promise, Task, _, debug,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  debug = require('debug')('XenAPI:Task');

  Promise = require('bluebird');

  _ = require('lodash');

  Task = (function() {
    var key, session, task;

    key = void 0;

    session = void 0;

    task = void 0;


    /**
    	* Construct Task
    	* @class
    	* @param      {Object}   session - An instance of Session
    	* @param      {Object}   task - A JSON object representing this Task
    	* @param      {String}   key - The OpaqueRef handle to this Task
     */

    function Task(_session, _task, _key) {
      this.cancel = bind(this.cancel, this);
      debug("constructor()");
      if (!_session) {
        throw Error("Must provide `session`");
      }
      session = _session;
      if (!_task) {
        throw Error("Must provide `task`");
      }
      if (!_key) {
        throw Error("Must provide `key`");
      }
      key = _key;
      if (!(_task.allowed_operations && _task.status)) {
        throw Error("`task` does not describe a valid Task");
      }
      task = _task;
      this.STATUS = {
        PENDING: "pending",
        SUCCESS: "success",
        FAILURE: "failure",
        CANCELLING: "cancelling",
        CANCELLED: "cancelled"
      };
      this.ALLOWED_OPERATIONS = {
        CANCEL: "cancel"
      };
      this.uuid = task.uuid;
      this.name = task.name_label;
      this.description = task.name_description;
      this.allowed_operations = task.allowed_operations;
      this.status = task.status;
      this.created = task.created;
      this.finished = task.finished;
      this.progress = task.progress;
    }

    Task.prototype.cancel = function() {
      debug("cancel()");
      return new Promise((function(_this) {
        return function(resolve, reject) {
          if (!_.contains(_this.allowed_operations, _this.ALLOWED_OPERATIONS.CANCEL)) {
            reject(new Error("Operation is not allowed"));
            return;
          }
          return session.request("task.cancel", key).then(function(value) {
            debug(value);
            return resolve();
          })["catch"](function(e) {
            debug(e);
            return reject(e);
          });
        };
      })(this));
    };

    return Task;

  })();

  module.exports = Task;

}).call(this);