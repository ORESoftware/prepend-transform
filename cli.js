#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var v = process.argv[2] || '';
process.stdin.resume().pipe(_1.pt(v)).pipe(process.stdout);
