var auth         = require('./auth')
  , facade       = require('segmentio-facade')
  , helpers      = require('./helpers')
  , integrations = require('..')
  , should       = require('should');


var splunk = new integrations['Splunk']()
  , settings = auth['Splunk'];


describe('Splunk', function () {

  describe('.enabled()', function () {
    var Track = facade.Track;
    it('should only be enabled for server side messages', function () {
      splunk.enabled(new Track({ channel : 'server' })).should.be.ok;
      splunk.enabled(new Track({ channel : 'client' })).should.not.be.ok;
      splunk.enabled(new Track({})).should.not.be.ok;
    });
  });


  describe('.validate()', function () {
    it('should require a host', function () {
      splunk.validate({}, {}).should.be.an.instanceOf(Error);
      splunk.validate({}, { host : ''}).should. be.an.instanceOf(Error);
    });
    it('should require a port', function () {
      splunk.validate({}, {}).should.be.an.instanceOf(Error);
      splunk.validate({}, { port : ''}).should. be.an.instanceOf(Error);
    });
  });


  describe('.track()', function () {
    var track = helpers.track();
    it('should track correctly', function (done) {
      splunk.track(track, settings, done);
    });
  });


  describe('.identify()', function () {
    var identify = helpers.identify();
    it('should be able to identify correctly', function (done) {
      splunk.identify(identify, settings, done);
    });
  });


  describe('.alias()', function () {
    var alias = helpers.alias();
    it('should do nothing', function (done) {
      splunk.alias(alias, settings, done);
    });
  });
});