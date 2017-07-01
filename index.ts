

import * as stream from 'stream';
import * as assert from 'assert';

///////////////////////////////////////////////////


export const x = function(pre: string){

  assert(typeof pre === 'string', 'prepend-transform usage error -> only argument must be a string.');

  let saved : Array<string> = [];

  return new stream.Transform({

    transform(chunk, encoding, cb) {

      let split = String(chunk).split('\n');

      let v = pre + split.shift();

      split.forEach(s => {
        saved.push(s + '\n');
      });

      cb(null, v);
    },

    flush(cb) {
      saved.forEach(s =>{
        this.push(String(pre) + s);
      });
      cb();
    }

  });

};

export default function(pre: string){

  assert(typeof pre === 'string', 'prepend-transform usage error -> only argument must be a string.');

  let saved = '';

  return new stream.Transform({

    transform(chunk, encoding, cb) {
      cb(null, pre + String(chunk));
    },

    flush(cb) {
      // this.push(saved);/
      cb();
    }

  });

}