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
    it('should return the fallback value', function () {
        var obj = {};
        var ns = findNamespaceValue('noName', obj, 'this is the fallback');
        assert.equal(ns, 'this is the fallback');
    });
    it('should return the value from an object', function () {
        var obj = {
            name: 'yoda'
        };
        var ns = findNamespaceValue('name', obj, 'this should not be the value');
        assert.equal(ns, 'yoda');
    });
    it('should return the fallback value for non-object parent', function () {
        var fallback = 'this should not be the value';
        var ns = findNamespaceValue('name', true, fallback);
        assert.equal(ns, fallback);
    });
    it('should return `undefined`', function () {
        var ns = findNamespaceValue('test.lastName', tester);
        assert.equal(ns, undefined);
    });
});
