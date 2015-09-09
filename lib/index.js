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
            // keep this as a nested `if` block
            // if this is combined as one check:
            // `(Array.isArray(target) && typeof target[currentNs] === 'undefined')`
            // the `typeof` check will make it go into the `hasOwnProperty` check below
            // if there is a value in `target[currentNs]`
            // Otherwise this will throw an exception in IE10 (not sure about 11)
            // when the `currentNs` is an index of an array

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
