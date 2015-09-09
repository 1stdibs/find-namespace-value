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
        if (!target.hasOwnProperty(currentNs)) {
            return fallback;
        }
        target = target[currentNs];
    }

    return target;

};
