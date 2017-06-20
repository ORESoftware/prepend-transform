"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stream = require("stream");
function default_1(pre) {
    var saved = '';
    return new stream.Transform({
        transform: function (chunk, encoding, cb) {
            cb(null, String(pre) + String(chunk));
        },
        flush: function (cb) {
            this.push(saved);
            cb();
        }
    });
}
exports.default = default_1;
