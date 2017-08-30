import * as stream from 'stream';
import * as assert from 'assert';

///////////////////////////////////////////////////

module.exports = function (pre: string) {

  assert(typeof pre === 'string', 'prepend-transform usage error -> only argument must be a string.');

  let lastLineData = '';

  return new stream.Transform({

    objectMode: true,

    transform(chunk, encoding, cb) {

      let data = String(chunk);
      if (lastLineData) {
        data = lastLineData + data;
      }

      let lines = data.split('\n');
      lastLineData = lines.splice(lines.length-1,1)[0];

      lines.forEach(l => {
         this.push(pre + l + '\n');
      });

      cb();

    },

    flush(cb) {
      if (lastLineData) {
        this.push(pre + lastLineData + '\n')
      }
      lastLineData = '';
      cb();
    }

  });

};


const $exports = module.exports;
export default $exports;