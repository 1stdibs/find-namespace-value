/**
 * User: daletan
 * Date: 4/22/14
 * Time: 10:25 AM
 * Copyright 1stdibs.com, Inc. 2014. All Rights Reserved.
 */

'use strict';

const assert = require('assert');
const findNamespaceValue = require('../src');

describe("findNamespaceValue", () => {
    let tester;
    beforeEach(() => {
        tester = {
            test: {
                name: {
                    space: {}
                }
            }
        };
    });
    afterEach(() => {
        tester = null;
    });
    it('should be backwards compatible to 1.0.x', () => {
        let ns = findNamespaceValue('test.name', tester);
        assert.strictEqual(ns, tester.test.name);
        ns = findNamespaceValue('test.name', { test: { name: 'hanky' }});
        assert.strictEqual(ns, 'hanky');
        ns = findNamespaceValue('tester.name', { test: { name: 'hanky' }}, 'nope');
        assert.strictEqual(ns, 'nope');
        ns = findNamespaceValue('something.that.is.not.defined', { something: null });
        assert.strictEqual(ns, null);
    });
    it('should return falsey values properly: `null`, `undefined`', () => {
        let ns = findNamespaceValue({
            ns: 'test.name.first',
            parent: {
                test: {
                    name: undefined
                }
            }
        });
        assert.strictEqual(ns, undefined);
        ns = findNamespaceValue({
            ns: 'test.name.first',
            parent: {
                test: {
                    name: null
                }
            }
        });
        assert.strictEqual(ns, null);
    });
    it('should find "test.name" and be equal to an empty object', () => {
        const ns = findNamespaceValue({
            ns: 'test.name',
            parent: tester
        });
        assert(ns, { space: { } });
    });
    it('should return the fallback value', () => {
        const obj = {};
        const ns = findNamespaceValue({ ns: 'noName', parent: obj, fallback: 'this is the fallback' });
        assert.strictEqual(ns, 'this is the fallback');
    });
    it('should return the value from an object', () => {
        const obj = {
            name: 'yoda'
        };
        const ns = findNamespaceValue({ ns: 'name', parent: obj, fallback: 'this should not be the value' });
        assert.strictEqual(ns, 'yoda');
    });
    it('should return the fallback value for non-object parent', () => {
        const fallback = 'this should not be the value';
        const ns = findNamespaceValue({ ns: 'name', parent: true, fallback });
        assert.strictEqual(ns, fallback);
    });
    it('should return `undefined`', () => {
        const ns = findNamespaceValue({ ns: 'test.lastName', parent: tester });
        assert.strictEqual(ns, undefined);
    });
    it('should return the value from an array', () => {
        const obj = {
            test: {
                names: ['seymour', 'moe', 'ralph']
            }
        };
        let ns = findNamespaceValue({ ns: 'test.names.0', parent: obj });
        assert.strictEqual(ns, 'seymour');
        ns = findNamespaceValue({ ns: 'test.names.2', parent: obj });
        assert.strictEqual(ns, 'ralph');
        ns = findNamespaceValue({ ns: 'test.names.3', parent: obj });
        assert.strictEqual(ns, undefined)
    });

    it('should return the fallback value when accessing array or string prototype properties', () => {
        let ns = findNamespaceValue({ ns: 'values.length', parent: { values: [1, 2, 3, 4, 5] }, fallback: 'myFallback' });
        assert.strictEqual(ns, 'myFallback');
        ns = findNamespaceValue({ ns: 'values.some', parent: { values: [1, 2, 3, 4, 5] }, fallback: 'someFallback' });
        assert.strictEqual(ns, 'someFallback');

        ns = findNamespaceValue({ ns: 'values.length', parent: { values: 'string' }, fallback: 'stringFallback' });
        assert.strictEqual(ns, 'stringFallback');
    });

    it('should return a cloned array and object', () => {
        const obj = {
            test: {
                names: ['seymour', 'moe', 'ralph']
            }
        };
        let ns = findNamespaceValue({
            ns: 'test.names',
            parent: obj,
            clone: true
        });
        assert.notStrictEqual(ns, obj.test.names);

        ns = findNamespaceValue({
            ns: 'test',
            parent: obj,
            clone: true
        });
        assert.notStrictEqual(ns, obj.test);

    });

});
