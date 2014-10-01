var expect = require('chai').expect;
var fs = require('fs');
var Liner = require('../');
var path = require('path');

describe('sz-liner', function () {
  it('should read first line', function (done) {
    var source = fs.createReadStream(path.join(__dirname, 'data/boot.log'));
    var liner = new Liner();

    source.pipe(liner);

    liner.once('data', function (line) {
      expect(line).to.equal('G		Welcome to CentOS');
    });

    liner.once('end', function () {
      done();
    });
  });

  it('should read the whole file line by line', function (done) {
    var source = fs.createReadStream(path.join(__dirname, 'data/boot.log'));
    var liner = new Liner();
    var lines = [];

    source.pipe(liner);

    liner.on('data', function (line) {
      lines.push(line);
    });

    liner.once('end', function () {
      expect(lines.length).to.equal(50);
      expect(lines[0]).to.equal('G		Welcome to CentOS');
      expect(lines[49]).to.equal('                                                           [FAILED]');

      done();
    });
  });
});