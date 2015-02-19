// Generated by CoffeeScript 1.8.0
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

  describe("VMCollection", function() {
    var VM, VMCollection, session;
    session = void 0;
    VMCollection = void 0;
    VM = void 0;
    beforeEach(function() {
      session = {
        request: function() {}
      };
      VMCollection = require('../lib/VMCollection');
      return VM = require('../lib/Models/VM');
    });
    describe("constructor", function() {
      beforeEach(function() {});
      afterEach(function() {});
      it("should throw unless session is provided", function() {
        return expect(function() {
          return new VMCollection();
        }).to["throw"](/Must provide session/);
      });
      return it("should throw unless VM is provided", function() {
        return expect(function() {
          return new VMCollection(session);
        }).to["throw"](/Must provide VM/);
      });
    });
    return describe("list()", function(done) {
      var requestStub, vmCollection;
      requestStub = void 0;
      vmCollection = void 0;
      beforeEach(function() {
        requestStub = sinon.stub(session, "request", function() {
          return new Promise(function(resolve, reject) {
            return resolve([]);
          });
        });
        return vmCollection = new VMCollection(session, VM);
      });
      afterEach(function() {
        return requestStub.restore();
      });
      it("should call `VM.get_all_records` on the API", function(done) {
        return vmCollection.list().then(function() {
          expect(requestStub).to.have.been.calledWith("VM.get_all_records");
          return done();
        })["catch"](function(e) {
          return done(e);
        });
      });
      it("should resolve if the API call is successful", function(done) {
        var promise;
        promise = vmCollection.list();
        return expect(promise).to.eventually.be.fulfilled.and.notify(done);
      });
      it("should reject if the API call resolves with undefined", function(done) {
        var promise;
        requestStub.restore();
        requestStub = sinon.stub(session, "request", function() {
          return new Promise(function(resolve, reject) {
            return resolve();
          });
        });
        promise = vmCollection.list();
        return expect(promise).to.eventually.be.rejected.and.notify(done);
      });
      it("should reject if the API call fails", function(done) {
        var promise;
        requestStub.restore();
        requestStub = sinon.stub(session, "request", function() {
          return new Promise(function(resolve, reject) {
            return reject();
          });
        });
        promise = vmCollection.list();
        return expect(promise).to.eventually.be.rejected.and.notify(done);
      });
      it("should resolve with an empty array if the API returns nothing", function(done) {
        return vmCollection.list().then(function(vms) {
          expect(vms).to.deep.equal([]);
          return done();
        })["catch"](function(e) {
          return done(e);
        });
      });
      it("should not return VMs that are actually templates", function(done) {
        requestStub.restore();
        requestStub = sinon.stub(session, "request", function() {
          return new Promise(function(resolve, reject) {
            return resolve([
              {
                is_a_template: true
              }
            ]);
          });
        });
        return vmCollection.list().then(function(vms) {
          expect(vms).to.deep.equal([]);
          return done();
        })["catch"](function(e) {
          return done(e);
        });
      });
      it("should not return VMs that are a control domain", function(done) {
        requestStub.restore();
        requestStub = sinon.stub(session, "request", function() {
          return new Promise(function(resolve, reject) {
            return resolve([
              {
                is_control_domain: true
              }
            ]);
          });
        });
        return vmCollection.list().then(function(vms) {
          expect(vms).to.deep.equal([]);
          return done();
        })["catch"](function(e) {
          return done(e);
        });
      });
      it("should return VMs that are not templates or control domains", function(done) {
        var validVM;
        validVM = {
          uuid: 'abcd',
          is_control_domain: false,
          is_a_template: false
        };
        requestStub.restore();
        requestStub = sinon.stub(session, "request", function() {
          return new Promise(function(resolve, reject) {
            return resolve({
              'abcd': validVM
            });
          });
        });
        return vmCollection.list().then(function(vms) {
          expect(vms.length).to.equal(1);
          return done();
        })["catch"](function(e) {
          return done(e);
        });
      });
      it("should return instances of VM", function(done) {
        var validVM;
        validVM = {
          uuid: 'abcd',
          is_control_domain: false,
          is_a_template: false
        };
        requestStub.restore();
        requestStub = sinon.stub(session, "request", function() {
          return new Promise(function(resolve, reject) {
            return resolve({
              'abcd': validVM
            });
          });
        });
        return vmCollection.list().then(function(vms) {
          expect(vms[0]).to.be.an["instanceof"](VM);
          expect(vms[0]).to.not.be.an["instanceof"](VMCollection);
          return done();
        })["catch"](function(e) {
          return done(e);
        });
      });
      return it("should return instances of VM with details set up", function(done) {
        var validVM;
        validVM = {
          uuid: 'abcd',
          is_control_domain: false,
          is_a_template: false
        };
        requestStub.restore();
        requestStub = sinon.stub(session, "request", function() {
          return new Promise(function(resolve, reject) {
            return resolve({
              'abcd': validVM
            });
          });
        });
        return vmCollection.list().then(function(vms) {
          expect(vms[0].uuid).to.equal(validVM.uuid);
          return done();
        })["catch"](function(e) {
          return done(e);
        });
      });
    });
  });

}).call(this);
