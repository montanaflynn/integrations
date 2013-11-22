
var debug = require('debug')('segmentio:integrations:splunk');
var extend = require('extend');
var Integration = require('segmentio-integration');
var net = require('net');
var util = require('util');

module.exports = Splunk;

function Splunk () {
  this.name = 'splunk';
}

util.inherits(Splunk, Integration);

/**
 * Check whether the integration is enabled
 */

Splunk.prototype.enabled = function (message, settings) {
  return Integration.enabled.apply(this, arguments) &&
         message.channel() === 'server';
};

/**
 * Validate the settings for the project
 */

Splunk.prototype.validate = function (message, settings) {
  return this._missingSetting(settings, 'url') ||
         this._missingSetting(settings, 'port');};

/**
 * Track a splunk event
 * http://docs.splunk/track.html#http
 */

Splunk.prototype.track = function (track, settings, callback) {
  var id = track.userId() || track.sessionId();
  var timestamp = track.timestamp().toISOString();

  var payload = {
    timestamp : timestamp,
    data: {
      distinct_id: id,
      event: track.event(),
      properties: track.properties(),
      time: timestamp
    }
  };

  var client = net.connect({ host: settings.host, port: settings.port }, function() { 
    debug('sending track event %j', payload);
    client.write(JSON.stringify(payload) + "\r\n", callback);
  });

};




