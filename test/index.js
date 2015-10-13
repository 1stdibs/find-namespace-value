/**
 * User: daletan
 * Date: 4/22/14
 * Time: 10:25 AM
 * Copyright 1stdibs.com, Inc. 2014. All Rights Reserved.
 */

'use strict';

var assert = require('assert')
var findNamespaceValue = require('..');

describe("findNamespaceValue", function () {
    var tester;
    beforeEach(function () {
        tester = {
            test: {
                name: {
                    space: {}
                }
            }
        };
    });
    afterEach(function () {
        tester = null;
    });
    it('should find "test.name" and be equal to an empty object', function () {
        var ns = findNamespaceValue('test.name', tester);
        assert(ns, { space: { } });
    });
    it('should return `undefined`', function () {
        var ns = findNamespaceValue('test.lastName', tester);
        assert.strictEqual(ns, undefined);
    });
    it('should return the fallback value', function () {
        var obj = {};
        var ns = findNamespaceValue('noName', obj, 'this is the fallback');
        assert.strictEqual(ns, 'this is the fallback');
    });
    it('should return the value from an object', function () {
        var obj = {
            name: 'yoda'
        };
        var ns = findNamespaceValue('name', obj, 'this should not be the value');
        assert.strictEqual(ns, 'yoda');
    });
    it('should return the fallback value for non-object parent', function () {
        var fallback = 'this should not be the value';
        var ns = findNamespaceValue('name', true, fallback);
        assert.strictEqual(ns, fallback);
    });
    it('should return `undefined`', function () {
        var ns = findNamespaceValue('test.lastName', tester);
        assert.strictEqual(ns, undefined);
    });
    it('should return the value from an array', function () {
        var obj = {
            test: {
                names: ['seymour', 'moe', 'ralph']
            }
        };
        var ns = findNamespaceValue('test.names.0', obj);
        assert.strictEqual(ns, 'seymour');
        ns = findNamespaceValue('test.names.2', obj);
        assert.strictEqual(ns, 'ralph');
        ns = findNamespaceValue('test.names.3', obj);
        assert.strictEqual(ns, undefined)
    });

    it('should return the fallback value when accessing array or string prototype properties', function () {
        var ns = findNamespaceValue('values.length', { values: [1, 2, 3, 4, 5] }, 'myFallback');
        assert.strictEqual(ns, 'myFallback');
        ns = findNamespaceValue('values.some', { values: [1, 2, 3, 4, 5] }, 'someFallback');
        assert.strictEqual(ns, 'someFallback');

        ns = findNamespaceValue('values.length', { values: 'string' }, 'stringFallback');
        assert.strictEqual(ns, 'stringFallback');
    });

});
