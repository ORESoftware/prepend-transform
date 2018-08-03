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

export const pt = function (pre: string, o?: PTOptions) {

  const opts = o || {};
  assert(pre && typeof pre === 'string', `prepend-transform usage error -> first argument must be a string.`);
  assert(opts && typeof opts === 'object', `prepend-transform usage error -> 'options' value must be an object.`);

  let lastLineData = '';

  return new stream.Transform({

    objectMode: true,

    transform(chunk, encoding, cb) {

      let data = String(chunk);
      if (lastLineData) {
        data = lastLineData + data;
      }

      let lines = data.split('\n');
      lastLineData = lines.splice(lines.length - 1, 1)[0];

      if (opts.omitWhitespace) {
        lines.forEach(l => {
          if (/[^ ]/.test(l)) {
            this.push(pre + l + '\n');
          }
        });
      }
      else {
        lines.forEach(l => {
          this.push(pre + l + '\n');
        });
      }

      cb();

    },

    flush(cb) {
      if (lastLineData) {
        if (opts.omitWhitespace && /[^ ]/.test(lastLineData)) {
          this.push(pre + lastLineData + '\n')
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

export default pt;


