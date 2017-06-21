
# Prepend-Transform

## Installation
npm install -S prepend-transform



## Usage

import pt from 'prepend-transform';

n.stdout.pipe(pt('[remote stdout]')).pipe(process.stdout);
n.stderr.pipe(pt('[remote stderr]')).pipe(process.stderr);