/**
 * @author Craig Thayer <cthayer@sazze.com>
 */

var stream = require('stream');
var Transform = stream.Transform;
var util = require('util');
var os = require('os');

function Liner(EOL) {
  Transform.call(this, {objectMode: true});

  this.EOL = EOL || os.EOL;
}

util.inherits(Liner, Transform);

Liner.prototype._transform = function (chunk, encoding, done) {
  var data = chunk.toString();

  if (this._lastLineData) {
    data = this._lastLineData + data;
  }

  var lines = data.split(this.EOL);

  this._lastLineData = lines.splice(lines.length - 1, 1)[0];

  lines.forEach(this.push.bind(this));

  done();
};

Liner.prototype._flush = function (done) {
  if (this._lastLineData) {
    this.push(this._lastLineData);
  }

  this._lastLineData = null;

  done();
};

module.exports = Liner;