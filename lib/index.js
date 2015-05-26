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
    var firstNS = ns[0];
    var target = parent;

    if (!parent || !parent[firstNS]) {
        return fallback;
    }

    while (ns.length) {
        var currentNs = ns.shift();
        if (target[currentNs]) {
            target = target[currentNs];
        } else {
            // since false and null are falsy values, doing fallback || undefined will always return undefined
            target = fallback === false ? false : fallback === null ? null : (fallback || undefined);
            break;
        }
    }

    return target;

};
