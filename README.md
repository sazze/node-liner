Usage
============================
```javascript
var Liner = require('@sazze/liner');
var fs = require('fs');

var source = fs.createReadStream('/tmp/someFile');
var liner = new Liner();

source.pipe(liner);

liner.on('data', function (line) {
  // do something with the line
});

liner.on('end', function () {
  // source file is complete
});
```

Install
============================
` npm install @sazze/liner `

Tests
============================

` npm test `
