'use strict';

const lodashClone = require('lodash.clone');

/**
 * Finds the value of any given namespace
 * @param {object} options
 * @param {string} options.ns Period delimited string representing the property to search for (ie. "my.name.space")
 * @param {object} [options.parent={}] object to iterate over
 * @param {*} [options.fallback=undefined] the return value if the `options.ns` is not found
 * @param {boolean} [options.clone=false] Clone the returned value if it is an object or an array
 * @returns {*} Whatever the property value is or whatever is defined in the `options.fallback` param
 */
function fns({ ns = '', parent = {}, fallback = undefined, clone = false }) {
    const namespace = ns.split('.');
    let target = parent;
    let currentNs;
    if (!target) {
        return fallback;
    }
    while (currentNs = namespace.shift()) {
        if (target === null || target === void(0)) {
            // void(0) always returned `undefined`
            // used this since `undefined` can be overwritten
            // `null` and `undefined` do not have `.hasOwnProperty`
            // so short circuit this loop here instead
            return target;
        }
        if (Array.isArray(target) || typeof target === 'string') {
            // if target is an array or a string, ensure that
            // currentNs indexes within the bounds of target
            if (currentNs % 1 !== 0 || currentNs >= target.length || currentNs < 0) {
                return fallback;
            }
        } else if (!target.hasOwnProperty(currentNs)) {
            // if the target is an object but does not have the property
            return fallback;
        }
        target = target[currentNs];
    }

    return (typeof target === 'object' || Array.isArray(target)) && clone ? lodashClone(target) : target;
}

module.exports = function findNamespaceValue(...args) {

    if (args.length === 1) {
        const arg = args[0];
        if (typeof arg === 'string') {
            // this will ultimately return `undefined`
            // since you always need a `parent`
            return fns({
                ns: arg
            });
        }
        return fns(arg);
    }

    // backwards compat - there was never a "clone" option before es6-ifying this module
    return fns({
        ns: args[0],
        parent: args[1],
        fallback: args[2]
    });

};
