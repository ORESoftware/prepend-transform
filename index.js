"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stream = require("stream");
var assert = require("assert");
exports.x = function (pre) {
    assert(typeof pre === 'string', 'prepend-transform usage error -> only argument must be a string.');
    var saved = [];
    return new stream.Transform({
        transform: function (chunk, encoding, cb) {
            var split = String(chunk).split('\n');
            var v = pre + split.shift();
            split.forEach(function (s) {
                saved.push(s + '\n');
            });
            cb(null, v);
        },
        flush: function (cb) {
            var _this = this;
            saved.forEach(function (s) {
                _this.push(String(pre) + s);
            });
            cb();
        }
    });
};
function default_1(pre) {
    assert(typeof pre === 'string', 'prepend-transform usage error -> only argument must be a string.');
    var saved = '';
    return new stream.Transform({
        transform: function (chunk, encoding, cb) {
            cb(null, pre + String(chunk));
        },
        flush: function (cb) {
            cb();
        }
    });
}
exports.default = default_1;
