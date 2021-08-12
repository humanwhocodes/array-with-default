/**
 * @fileoverview Tests that Common JS can access npm package.
 */

const { ArrayWithDefault } = require("../dist/array-with-default.cjs");
new ArrayWithDefault({ default: 1});
console.log("CommonJS load: success");
