/**
 * @fileoverview Tests for the ArrayWithDefault class.
 */
/*global describe, it*/

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

import { ArrayWithDefault } from "../src/array-with-default.js";
import { expect } from "chai";

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("ArrayWithDefault", () => {

    describe("new ArrayWithDefault()", () => {

        it("should throw an error when argument is missing", () => {
            expect(() => {
                new ArrayWithDefault();
            }).throws(/default/);
        });

        it("should throw an error when default is missing", () => {
            expect(() => {
                new ArrayWithDefault({});
            }).throws(/default/);
        });

        it("should copy elements argument into array", () => {
            const items = [1,2,3];
            const itemsWithDefault = new ArrayWithDefault({
                elements:items,
                default: 0
            });

            expect(itemsWithDefault).to.deep.equal(items);
        });

    });

    describe("get array element", () => {
        
        it("should retrieve element when element exists", () => {
            const items = [1, 2, 3];
            const itemsWithDefault = new ArrayWithDefault({
                elements: items,
                default: 0
            });

            expect(itemsWithDefault[0]).to.equal(1);
            expect(itemsWithDefault[1]).to.equal(2);
            expect(itemsWithDefault[2]).to.equal(3);
        });

        it("should not retrieve element when element is past array length", () => {
            const items = [1, 2, 3];
            const itemsWithDefault = new ArrayWithDefault({
                elements: items,
                default: 0
            });

            expect(itemsWithDefault[3]).to.be.undefined;
        });

        it("should return default when element is missing", () => {

            /*eslint-disable-next-line no-sparse-arrays*/
            const items = [1, , 3];
            const itemsWithDefault = new ArrayWithDefault({
                elements: items,
                default: 0
            });

            expect(itemsWithDefault[0]).to.equal(1);
            expect(itemsWithDefault[1]).to.equal(0);
            expect(itemsWithDefault[2]).to.equal(3);
        });

        it("should return default when element is undefined", () => {

            /*eslint-disable-next-line no-sparse-arrays*/
            const items = [1, undefined, 3];
            const itemsWithDefault = new ArrayWithDefault({
                elements: items,
                default: 0
            });

            expect(itemsWithDefault[0]).to.equal(1);
            expect(itemsWithDefault[1]).to.equal(0);
            expect(itemsWithDefault[2]).to.equal(3);
        });

        it("should return normal value when retrieving string property", () => {
            /*eslint-disable-next-line no-sparse-arrays*/
            const items = [1, 2, 3];
            const itemsWithDefault = new ArrayWithDefault({
                elements: items,
                default: 0
            });

            itemsWithDefault.push(4);
            expect(itemsWithDefault).to.deep.equal([1, 2, 3, 4]);
        });
    });

    describe("length", () => {

        it("should set length of array when passed", () => {

            const itemsWithDefault = new ArrayWithDefault({
                length: 5,
                default: 0
            });

            expect(itemsWithDefault.length).to.equal(5);
        });

        it("should not created elements when passed", () => {

            const itemsWithDefault = new ArrayWithDefault({
                length: 5,
                default: 0
            });

            expect(itemsWithDefault).not.haveOwnProperty(0);
            expect(itemsWithDefault).not.haveOwnProperty(1);
            expect(itemsWithDefault).not.haveOwnProperty(2);
            expect(itemsWithDefault).not.haveOwnProperty(3);
            expect(itemsWithDefault).not.haveOwnProperty(4);
        });

        it("should return default when element is missing", () => {

            const itemsWithDefault = new ArrayWithDefault({
                length: 5,
                default: 0
            });

            expect(itemsWithDefault).to.deep.equal([0, 0, 0, 0, 0]);
        });

        it("should set length when elements are passed", () => {

            const itemsWithDefault = new ArrayWithDefault({
                elements: [1, 2, 3],
                length: 5,
                default: 0
            });

            expect(itemsWithDefault.length).to.equal(5);
            expect(itemsWithDefault).to.deep.equal([1, 2, 3, 0, 0]);
        });
    });

    describe("outOfRange", () => {

        it("should return default for elements after the last element", () => {

            const itemsWithDefault = new ArrayWithDefault({
                default: 0,
                outOfRange: true
            });

            expect(itemsWithDefault[0]).to.equal(0);
            expect(itemsWithDefault[1]).to.equal(0);
        });

        it("should return default for elements after the last element when length is set", () => {

            const itemsWithDefault = new ArrayWithDefault({
                default: 0,
                length: 5,
                outOfRange: true
            });

            expect(itemsWithDefault[0]).to.equal(0);
            expect(itemsWithDefault[5]).to.equal(0);
        });

    });

    describe("concat()", () => {
        
        it("should return an instance of Array when called", () => {

            const itemsWithDefault = new ArrayWithDefault({
                elements: [1,2,3],
                default: 0
            });

            const newItems = itemsWithDefault.concat([4,5,6]);
            expect(newItems).to.deep.equal([1,2,3,4,5,6]);
            expect(newItems).to.be.instanceOf(Array);

        });

    });

});
