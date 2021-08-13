/**
 * @fileoverview ArrayWithDefault class
 * @author Nicholas C. Zakas
 */

/**
 * An array structure where unknown numeric properties automatically
 * return a default value when read.
 */
export class ArrayWithDefault extends Array {

    /**
     * Creates a new instance.
     * @param {Object} options
     * @param {*} options.default The default value for missing elements.
     * @param {Array} [options.elements] The array elements to prepopulate into
     *      the array.
     * @param {number} [options.length] The number of elements in the array.
     */
    constructor(options = {}) {
        super();

        if (!("default" in options)) {
            throw new TypeError("Missing default value.");
        }

        if (options.elements) {
            this.push(...options.elements);
        }

        if ("length" in options) {
            this.length = options.length;
        }

        return new Proxy(this, {
            get(target, property) {

                const value = target[property];

                // symbol properties excluded
                if (typeof property !== "string") {
                    return value;
                }

                const index = Number(property);

                /*
                 * We only want to return the default when the index
                 * is numeric (an array element), when the index is less
                 * than the length of the array (indicating a missing element),
                 * and when the value is undefined.
                 * 
                 * For an index beyond the length of the array, or a string or
                 * symbol property, just return the regular value.
                 */
                if (
                    Number.isInteger(index) && 
                    index < target.length &&
                    value === undefined
                ) {
                    return options.default;
                }

                return value;
            }
        });
    }

    /**
     * Ensure methods that produce arrays still use Array.
     */
    static get[Symbol.species]() {
        return Array;
    }
}
