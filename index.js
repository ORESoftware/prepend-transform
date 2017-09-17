"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stream = require("stream");
var assert = require("assert");
exports.pt = function (pre, $options) {
    var options = $options || {};
    assert(typeof pre === 'string', "prepend-transform usage error -> first argument must be a string.");
    assert(typeof options === 'object', "prepend-transform usage error -> 'options' value must be an object.");
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
            if (options.omitWhitespace) {
                lines.forEach(function (l) {
                    if (/[^ ]/.test(l)) {
                        _this.push(pre + l + '\n');
                    }
                });
            }
            else {
                lines.forEach(function (l) {
                    _this.push(pre + l + '\n');
                });
            }
            cb();
        },
        flush: function (cb) {
            if (lastLineData) {
                if (options.omitWhitespace && /[^ ]/.test(lastLineData)) {
                    this.push(pre + lastLineData + '\n');
                }
                else {
                    this.push(pre + lastLineData + '\n');
                }
            }
            lastLineData = '';
            cb();
        }
    });
};
exports.default = exports.pt;
