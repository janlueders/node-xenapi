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

  describe("Session", function() {
    var Session, apiClient;
    Session = void 0;
    apiClient = void 0;
    beforeEach(function() {
      Session = require('../../lib/Models/Session');
      return apiClient = {
        request: function() {}
      };
    });
    describe("constructor", function() {
      return it("should throw unless apiClient is provided", function() {
        return expect(function() {
          return new Session();
        }).to["throw"](/Must provide apiClient/);
      });
    });
    describe("login", function() {
      var requestStub, session;
      session = void 0;
      requestStub = void 0;
      beforeEach(function() {
        requestStub = sinon.stub(apiClient, "request", function() {
          return new Promise(function(resolve, reject) {
            return resolve();
          });
        });
        return session = new Session(apiClient);
      });
      afterEach(function() {
        return requestStub.restore();
      });
      it("should call `session.login_with_password` from the API", function(done) {
        return session.login()["finally"](function() {
          expect(requestStub).to.have.been.calledWith("session.login_with_password");
          return done();
        })["catch"](function(e) {
          return done(e);
        });
      });
      it("should pass `username` and `password` to the API", function(done) {
        return session.login("test", "pass")["finally"](function() {
          expect(requestStub).to.have.been.calledWith("session.login_with_password", ["test", "pass"]);
          return done();
        })["catch"](function(e) {
          return done(e);
        });
      });
      return it("should reject if already logged in", function(done) {
        return session.login().then(function() {
          var promise;
          promise = session.login();
          return expect(promise).to.eventually.be.rejected.and.notify(done);
        })["catch"](function(e) {
          return done(e);
        });
      });
    });
    describe("logout", function() {
      var requestStub, session;
      session = void 0;
      requestStub = void 0;
      beforeEach(function() {
        requestStub = sinon.stub(apiClient, "request", function() {
          return new Promise(function(resolve, reject) {
            return resolve();
          });
        });
        return session = new Session(apiClient);
      });
      afterEach(function() {
        return requestStub.restore();
      });
      it("should reject if not currently logged in", function(done) {
        var promise;
        promise = session.logout();
        return expect(promise).to.eventually.be.rejected.and.notify(done);
      });
      it("should call `session.logout` from the API if currently logged in", function(done) {
        return session.login().then(function() {
          return session.logout()["finally"](function() {
            expect(requestStub).to.have.been.calledWith("session.logout");
            return done();
          })["catch"](function(e) {
            return done(e);
          });
        });
      });
      it("should pass the session ref from `login` to the API", function(done) {
        var sessionRef;
        sessionRef = "abcd1234";
        requestStub.restore();
        requestStub = sinon.stub(apiClient, "request", function(method) {
          return new Promise(function(resolve, reject) {
            if (method !== "session.logout") {
              return resolve(sessionRef);
            } else {
              return resolve();
            }
          });
        });
        return session.login().then(function() {
          return session.logout()["finally"](function() {
            expect(requestStub).to.have.been.calledWith("session.logout", [sessionRef]);
            return done();
          })["catch"](function(e) {
            return done(e);
          });
        });
      });
      return it("should resolve when logout is complete", function(done) {
        return session.login().then(function() {
          var promise;
          promise = session.logout();
          return expect(promise).to.eventually.be.fulfilled.and.notify(done);
        })["catch"](function(e) {
          return done(e);
        });
      });
    });
    return describe("request", function() {
      var requestStub, session;
      session = void 0;
      requestStub = void 0;
      beforeEach(function() {
        requestStub = sinon.stub(apiClient, "request", function() {
          return new Promise(function(resolve, reject) {
            return resolve();
          });
        });
        return session = new Session(apiClient);
      });
      afterEach(function() {
        return requestStub.restore();
      });
      it("should throw if not logged in", function() {
        return expect(function() {
          return session.request();
        }).to["throw"](/Must be logged in to make API requests/);
      });
      it("should call `request` on apiClient if logged in", function(done) {
        return session.login().then(function() {
          session.request();
          expect(requestStub).to.have.been.called;
          return done();
        })["catch"](function(e) {
          return done(e);
        });
      });
      it("should call `request` with the method name passed to it", function(done) {
        return session.login().then(function() {
          session.request("test.method");
          expect(requestStub).to.have.been.calledWith("test.method");
          return done();
        })["catch"](function(e) {
          return done(e);
        });
      });
      it("should call `request` with the args passed to it and sessionID", function(done) {
        var sessionRef;
        sessionRef = "abcd1234";
        requestStub.restore();
        requestStub = sinon.stub(apiClient, "request", function(method) {
          return new Promise(function(resolve, reject) {
            return resolve(sessionRef);
          });
        });
        return session.login().then(function() {
          session.request("test.method");
          expect(requestStub).to.have.been.calledWith("test.method", [sessionRef]);
          return done();
        })["catch"](function(e) {
          return done(e);
        });
      });
      it("should resolve with the value resolved by apiClient if successful", function(done) {
        var resolveValue;
        resolveValue = "test123";
        requestStub.restore();
        requestStub = sinon.stub(apiClient, "request", function(method) {
          return new Promise(function(resolve, reject) {
            if (method !== "test.method") {
              return resolve();
            } else {
              return resolve(resolveValue);
            }
          });
        });
        return session.login().then(function() {
          return session.request("test.method").then(function(value) {
            expect(value).to.equal(resolveValue);
            return done();
          });
        })["catch"](function(e) {
          return done(e);
        });
      });
      return it("should reject with the error rejected by apiClient if failure", function(done) {
        var rejectValue;
        rejectValue = "test123";
        requestStub.restore();
        requestStub = sinon.stub(apiClient, "request", function(method) {
          return new Promise(function(resolve, reject) {
            if (method !== "test.method") {
              return resolve();
            } else {
              return reject(rejectValue);
            }
          });
        });
        return session.login().then(function() {
          return session.request("test.method")["catch"](function(e) {
            expect(e).to.equal(rejectValue);
            return done();
          });
        })["catch"](function(e) {
          return done(e);
        });
      });
    });
  });

}).call(this);
