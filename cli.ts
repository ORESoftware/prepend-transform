#!/usr/bin/env node
'use strict';

import {pt} from '.';
const v = process.argv[2] || '';
process.stdin.resume().pipe(pt(v)).pipe(process.stdout);
