#!/usr/bin/env node
'use strict';

import {pt} from '.';
import chalk from 'chalk';

let v = process.argv[2] || '';
const color = process.argv[3] || '';

if (color) {
  try {
    v = (chalk as any)[color](v);
  }
  catch (err) {
  
  }
}

process.stdin.resume().pipe(pt(v)).pipe(process.stdout);
