"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stream = require("stream");
var assert = require("assert");
module.exports = function (pre) {
    assert(typeof pre === 'string', 'prepend-transform usage error -> only argument must be a string.');
    var lastLineData = '';
    return new stream.Transform({
        objectMode: true,
        transform: function (chunk, encoding, cb) {
            var _this = this;
            var data = String(chunk);
            if (lastLineData) {
                data = lastLineData + data;
            }
            var lines = data.split('\n');
            lastLineData = lines.splice(lines.length - 1, 1)[0];
            lines.forEach(function (l) {
                _this.push(pre + l + '\n');
            });
            cb();
        },
        flush: function (cb) {
            if (lastLineData) {
                this.push(pre + lastLineData + '\n');
            }
            lastLineData = '';
            cb();
        }
    });
};
var $exports = module.exports;
exports.default = $exports;
