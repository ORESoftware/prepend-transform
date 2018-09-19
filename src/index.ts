'use strict';

//core
import * as stream from 'stream';
import * as assert from 'assert';

///////////////////////////////////////////////////

export interface PTOptions {
  omitWhitespace?: boolean,
  color?: Function
}

///////////////////////////////////////////////////

export const r2gSmokeTest = function () {
  return true;
};

export const pt =  (pre: string, o?: PTOptions) => {
  return new PrependTransform(pre, o);
};

export default pt;

export class PrependTransform extends stream.Transform {

  lastLineData = '';
  pre = '';
  opts: PTOptions;

  constructor(pre: string, o?: PTOptions) {

    super({objectMode: true});

    const opts = o || {};
    assert(pre && typeof pre === 'string', `prepend-transform usage error -> first arg must be a string.`);
    assert(opts && typeof opts === 'object', `prepend-transform usage error -> 'options' arg must be an object.`);
    this.pre = pre;
    this.opts = opts;

  }

  _transform(chunk: string, encoding: string, cb: Function) {

    let data = String(chunk);
    if (this.lastLineData) {
      data = this.lastLineData + data;
    }

    const lines = data.split('\n');
    this.lastLineData = lines.splice(lines.length - 1, 1)[0];

    const pre = this.pre;

    if (this.opts.omitWhitespace) {
      for (let l of lines) {
        if (/[^ ]/.test(l)) {
          this.push(pre + l + '\n');
        }
      }
      return cb();
    }

    for (let l of lines) {
      this.push(pre + l + '\n');
    }

    cb();

  }

  _flush(cb: Function) {

    if (!this.lastLineData) {
      return cb();
    }

    if (this.opts.omitWhitespace && /[^ ]/.test(this.lastLineData)) {
      this.push(this.pre + this.lastLineData + '\n')
    }
    else {
      this.push(this.pre + this.lastLineData + '\n');
    }

    this.lastLineData = '';
    cb();
  }
}

