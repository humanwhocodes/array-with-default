# Array with Default Utility

by [Nicholas C. Zakas](https://humanwhocodes.com)

If you find this useful, please consider supporting my work with a [donation](https://humanwhocodes.com/donate).

## Description

A class that represents an array where missing elements return a specified default value.

The built-in JavaScript `Array` class automatically returns `undefined` when you attempt to access a missing element. Here's an example:

```js
const items = [1, , 3];
console.log(items[1]);      // undefined
```

In most cases that is okay, but in some cases you may want an alternate default value returned. The `ArrayWithDefault` class does that:

```js
const items = new ArrayWithDefault({
    default: 0
    elements: [1, , 3]
});

console.log(items[1]);      // 0
```

The primary use case for this class is when an array is an optional argument for a function or when an array may have holes.

## Usage

### Node.js

Install using [npm][npm] or [yarn][yarn]:

```
npm install @humanwhocodes/array-with-default --save

# or

yarn add @humanwhocodes/array-with-default
```

Import into your Node.js project:

```js
// CommonJS
const { ArrayWithDefault } = require("@humanwhocodes/array-with-default");

// ESM
import { ArrayWithDefault } from "@humanwhocodes/array-with-default";
```

### Deno

Import into your Deno project:

```js
import { ArrayWithDefault } from "https://cdn.skypack.dev/@humanwhocodes/array-with-default?dts";
```

### Browser

It's recommended to import the minified version to save bandwidth:

```js
import { ArrayWithDefault } from "https://cdn.skypack.dev/@humanwhocodes/array-with-default?min";
```

However, you can also import the unminified version for debugging purposes:

```js
import { ArrayWithDefault } from "https://cdn.skypack.dev/@humanwhocodes/array-with-default";
```

## API

After importing, create a new instance of `ArrayWithDefault`. The constructor expects one object argument with the following properties:

* `default` **(required)** - the default value to return for the missing items.
* `elements` - an optional iterable object used to populate the array.
* `length` - an optional value to set the array's `length` property to.
* `outOfRange` - an optional value that, when set to `true`, indicates that numeric indices after the end of the array should also return the default value.

Here are some examples:

```js
const items = new ArrayWithDefault({
    default: 0,
    elements: [1, , 3]
});

// missing elements return the default
console.log(items[1]);      // 0

// elements after the end of the array return undefined
console.log(items[10])      // undefined

// elements whose value are undefined return the default
items.push(undefined);
console.log(items[3]);      // 0

const emptyItems = new ArrayWithDefault({
    default: 0,
    length: 5
});

// all elements return 0
console.log(emptyItems[0]);     // 0
console.log(emptyItems[1]);     // 0
console.log(emptyItems[2]);     // 0
console.log(emptyItems[3]);     // 0
console.log(emptyItems[4]);     // 0

// items past the end still return undefined
console.log(emptyItems[5]);     // undefined

const numbers = new ArrayWithDefault({
    default: 0,
    elements: [1, 2, 3],
    outOfRange: true
});

// all elements return 0
console.log(emptyItems[0]);     // 1
console.log(emptyItems[1]);     // 2
console.log(emptyItems[2]);     // 3
console.log(emptyItems[3]);     // 0
console.log(emptyItems[4]);     // 0
console.log(emptyItems[5]);     // 0
```

## Developer Setup

1. Fork the repository
2. Clone your fork
3. Run `npm install` to setup dependencies
4. Run `npm test` to run tests

## License

Apache 2.0

[npm]: https://npmjs.com/
[yarn]: https://yarnpkg.com/
