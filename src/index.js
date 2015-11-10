'use strict';

/**
 * Finds the value of any given namespace
 * @param {String} targetNamespace Period delimited string representing the object/property to search for (ie. "my.name.space")
 * @param {Object} [parent] defaults to the window object as the object to iterate over
 * @param {*} [fallback] Any value to return if no property is found
 * @returns {*} Whatever the property value is or whatever is defined in the [fallback] param
 */
module.exports = function findNamespaceValue(targetNamespace, parent, fallback) {
    var ns = targetNamespace.split('.');
    var target = parent;
    var currentNs;
    if (!target) {
        return fallback;
    }
    while (currentNs = ns.shift()) {
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

    return target;
};
