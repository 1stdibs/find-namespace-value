# Find Namespace Value [![Build Status](https://travis-ci.org/1stdibs/find-namespace-value.svg?branch=master)](https://travis-ci.org/1stdibs/find-namespace-value)

Find a value inside an object namespace

jsPerf: http://jsperf.com/find-namespace-value

example:

```js
    const findNamespaceValue = require('find-namespace-value');
    const obj = {
        company: {
            name: '1stdibs'
        }
    };
    const companyName = findNamespaceValue({
        ns: 'company.name',
        parent: obj
    });
    const companyLocation = findNamespaceValue({
        ns: 'company.location',
        parent: obj,
        fallback: 'New York, NY'
    });
    const companySecrets = findNamespaceValue({
        ns: 'company.secrets',
        parent: obj
    });

    console.log(companyName); // => "1stdibs"
    console.log(companyLocation); // => "New York, NY"
    console.log(companySecrets); // => undefined
```

testing:

```shell
    $ npm install
    $ npm test
```

## Usage

A single `object` is passed in as `options`:

```js
@param {object} options
@param {String} options.ns Period delimited string representing the property to search for (ie. "my.name.space")
@param {Object} [options.parent={}] defaults to the window object as the object to iterate over
@param {*} [options.fallback=undefined] Clone the returned value if it is an object or an array
@param {boolean} [options.clone=false] Clone the returned value if it is an object or an array
@returns {*} Whatever the property value is or whatever is defined in the [fallback] param
```

