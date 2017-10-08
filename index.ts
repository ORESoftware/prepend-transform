'use strict';

//core
import * as stream from 'stream';
import * as assert from 'assert';

///////////////////////////////////////////////////

export interface IPTOptions {
  omitWhitespace: boolean
}

///////////////////////////////////////////////////

export const pt = function (pre: string, $options?: Partial<IPTOptions>) {

  const options = $options || {};
  assert(typeof pre === 'string', `prepend-transform usage error -> first argument must be a string.`);
  assert(typeof options === 'object', `prepend-transform usage error -> 'options' value must be an object.`);

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

      if (options.omitWhitespace) {
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
        if (options.omitWhitespace && /[^ ]/.test(lastLineData)) {
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