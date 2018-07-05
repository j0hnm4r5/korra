let Linter = require('standard-engine').linter;
let opts = require('./options.js');
module.exports = new Linter(opts);
