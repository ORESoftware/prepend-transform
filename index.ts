

import * as stream from 'stream';

///////////////////////////////////////////////////


export default function(pre: string){

  let saved = '';

  return new stream.Transform({

    transform(chunk, encoding, cb) {

      cb(null, String(pre) + String(chunk));
    },

    flush(cb) {
      this.push(saved);
      cb();
    }

  });

}