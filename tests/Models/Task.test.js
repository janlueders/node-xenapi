// Generated by CoffeeScript 1.9.1
(function() {
  var Promise, chai, chaiAsPromised, expect, sinon, sinonChai;

  chai = require('chai');

  chaiAsPromised = require('chai-as-promised');

  expect = chai.expect;

  sinon = require('sinon');

  sinonChai = require('sinon-chai');

  Promise = require('bluebird');

  chai.use(sinonChai);

  chai.use(chaiAsPromised);

  describe("Task", function() {
    var Task, requestStub, session;
    session = void 0;
    Task = void 0;
    requestStub = void 0;
    beforeEach(function() {
      session = {
        request: function() {}
      };
      requestStub = sinon.stub(session, "request", function() {
        return new Promise(function(resolve, reject) {
          return resolve();
        });
      });
      return Task = require('../../lib/Models/Task');
    });
    describe("constructor", function() {
      beforeEach(function() {});
      afterEach(function() {});
      it("should throw unless session is provided", function() {
        return expect(function() {
          return new Task();
        }).to["throw"](/Must provide `session`/);
      });
      it("should throw unless JSON task is provided", function() {
        return expect(function() {
          return new Task(session);
        }).to["throw"](/Must provide `task`/);
      });
      it("should throw unless OpaqueRef key is provided", function() {
        return expect(function() {
          return new Task(session, {});
        }).to["throw"](/Must provide `key`/);
      });
      it("should throw if a JSON task does not provide a valid representation of Task", function() {
        var invalidTask;
        invalidTask = {};
        return expect(function() {
          return new Task(session, invalidTask, "OpaqueRef");
        }).to["throw"](/`task` does not describe a valid Task/);
      });
      it("should not throw if a JSON task provides a valid representation of Task", function() {
        var validTask;
        validTask = {
          allowed_operations: [],
          status: "success"
        };
        return expect(function() {
          return new Task(session, validTask, "OpaqueRef");
        }).not.to["throw"]();
      });
      it("should assign the `uuid` property from the JSON representation to itself", function() {
        var task, validTask;
        validTask = {
          allowed_operations: [],
          status: "success",
          uuid: "abcd1234"
        };
        task = new Task(session, validTask, "OpaqueRef");
        return expect(task.uuid).to.equal(validTask.uuid);
      });
      it("should assign the `name_label` property from the JSON representation to itself", function() {
        var task, validTask;
        validTask = {
          allowed_operations: [],
          status: "success",
          name_label: "abcd1234"
        };
        task = new Task(session, validTask, "OpaqueRef");
        return expect(task.name).to.equal(validTask.name_label);
      });
      it("should assign the `name_description` property from the JSON representation to itself", function() {
        var task, validTask;
        validTask = {
          allowed_operations: [],
          status: "success",
          name_description: "abcd1234"
        };
        task = new Task(session, validTask, "OpaqueRef");
        return expect(task.description).to.equal(validTask.name_description);
      });
      it("should assign the `allowed_operations` property from the JSON representation to itself", function() {
        var task, validTask;
        validTask = {
          allowed_operations: [],
          status: "success"
        };
        task = new Task(session, validTask, "OpaqueRef");
        return expect(task.allowed_operations).to.deep.equal(validTask.allowed_operations);
      });
      it("should assign the `status` property from the JSON representation to itself", function() {
        var task, validTask;
        validTask = {
          allowed_operations: [],
          status: "success"
        };
        task = new Task(session, validTask, "OpaqueRef");
        return expect(task.status).to.equal(validTask.status);
      });
      it("should assign the `created` property from the JSON representation to itself", function() {
        var task, validTask;
        validTask = {
          allowed_operations: [],
          status: "success",
          created: new Date()
        };
        task = new Task(session, validTask, "OpaqueRef");
        return expect(task.created).to.equal(validTask.created);
      });
      it("should assign the `finished` property from the JSON representation to itself", function() {
        var task, validTask;
        validTask = {
          allowed_operations: [],
          status: "success",
          finished: new Date()
        };
        task = new Task(session, validTask, "OpaqueRef");
        return expect(task.finished).to.equal(validTask.finished);
      });
      return it("should assign the `progress` property from the JSON representation to itself", function() {
        var task, validTask;
        validTask = {
          allowed_operations: [],
          status: "success",
          progress: 0
        };
        task = new Task(session, validTask, "OpaqueRef");
        return expect(task.progress).to.equal(validTask.progress);
      });
    });
    return describe("cancel()", function() {
      var task, validTask;
      task = void 0;
      validTask = void 0;
      beforeEach(function() {
        validTask = {
          allowed_operations: ["cancel"],
          status: "success"
        };
        return task = new Task(session, validTask, "OpaqueRef");
      });
      afterEach(function() {});
      it("should return a Promise", function() {
        return expect(task.cancel()).to.be.an["instanceof"](Promise);
      });
      it("should reject its promise if `cancel` is not an allowed operation", function(done) {
        validTask = {
          allowed_operations: [],
          status: "success"
        };
        task = new Task(session, validTask, "OpaqueRef");
        return expect(task.cancel()).to.eventually.be.rejectedWith(/Operation is not allowed/).and.notify(done);
      });
      it("should call `task.cancel` on the API", function(done) {
        return task.cancel().then(function() {
          expect(requestStub).to.have.been.calledWith("task.cancel");
          return done();
        })["catch"](function(e) {
          return done(e);
        });
      });
      return it("should call `task.cancel` with the OpaqueRef of the Task", function(done) {
        var opaqueRef;
        opaqueRef = "abcd1234";
        task = new Task(session, validTask, opaqueRef);
        return task.cancel().then(function() {
          expect(requestStub).to.have.been.calledWith("task.cancel", opaqueRef);
          return done();
        })["catch"](function(e) {
          return done(e);
        });
      });
    });
  });

}).call(this);