/**
 * @fileoverview Tests that array-with-default.d.ts is valid.
 */
/* eslint-disable no-console */

const { execSync } = require("child_process");
execSync("cd tests/fixtures/typescript-project && npm i && tsc --showConfig index.ts");
console.log("array-with-default.d.ts load: success");
