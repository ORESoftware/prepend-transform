const fs = require('fs');
const {pt} = require('prepend-transform');

fs.createReadStream(__filename)
.pipe(pt('zoooooo'))
.pipe(process.stdout);
