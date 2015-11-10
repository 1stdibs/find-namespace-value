'use strict';

const lodashClone = require('lodash.clone');

/**
 * Finds the value of any given namespace
 * @param {object} options
 * @param {string} options.ns Period delimited string representing the property to search for (ie. "my.name.space")
 * @param {object} [options.parent={}] object to iterate over
 * @param {boolean} [options.clone=false] Clone the returned value if it is an object or an array
 * @param {*} [options.fallback=undefined] the return value if the `options.ns` is not found
 * @returns {*} Whatever the property value is or whatever is defined in the `options.fallback` param
 */
module.exports = function findNamespaceValue({ ns = '', parent = {}, clone = false, fallback = undefined }) {
    const namespace = ns.split('.');
    let target = parent;
    let currentNs;
    if (!target) {
        return fallback;
    }
    while (currentNs = namespace.shift()) {
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
};
