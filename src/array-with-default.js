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
     * @param {*} options.default The default value/callback for missing elements.
     * @param {Array} [options.elements] The array elements to prepopulate into
     *      the array.
     * @param {number} [options.length] The number of elements in the array.
     * @param {boolean} [options.outOfRange=false] When true, the default value
     *      with also be returned for indices after the last element.
     */
    constructor(options = {}) {

        super();

        if (!("default" in options)) {
            throw new TypeError("Missing default value.");
        }

        if (Array.isArray(options.elements)) {
            this.push(...options.elements);
        }

        if ("length" in options) {
            this.length = options.length;
        }

        return new Proxy(this, {
            get(target, property) {

                const currValue = target[property];

                // return for Symbol properties
                if (typeof property !== "string") {
                    return currValue;
                }

                const index = Number(property);

                /*
                 * We only want to return the default when:
                 * - index is numeric (an array element),
                 * - currValue is undefined
                 * - index is less than the length of the array, or out-of-range
                 *
                 * If default is a callback, assign its result to the missing element.
                 */
                if (
                    Number.isInteger(index) &&
                    currValue === undefined &&
                    (options.outOfRange || index < target.length)
                ) {
                    let defaultValue = options.default;

                    if (typeof defaultValue === "function") {
                        // resolve the callback defaultValue
                        defaultValue = defaultValue(index);
                        return target[property] = defaultValue;
                    }

                    return defaultValue;
                }

                /*
                 * When index is beyond the length of the array, and no out-of-range, just return the currValue.
                 */
                return currValue;
            }
        });
    }

    /**
     * Ensure methods that produce arrays still use Array.
     */
    static get [Symbol.species]() {
        return Array;
    }
}
