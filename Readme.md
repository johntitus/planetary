Planetary
=========

Planetary calculates planetary alignments for a given date, as viewed from Earth (geocentric).

## Installation
1) Install Node, if you haven't already:

http://nodejs.org/

2) NPM install Planetary:

`npm install planetary`

## Example

```js
var planetary = require('planetary');
var now = new Date();
var maxSeparation = 8; // maximum degrees of separation of planets. Default is 5.
var alignments = planetary.alignments( now, maxSeparation );
```

The result is an array of planetary alignments for the given date.  Each alignment is, itself, an array, listing the planets in the alignment.

## Source
Derived from https://github.com/lhartikk/AstroBuild