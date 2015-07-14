# Find Namespace Value [![Build Status](https://travis-ci.org/1stdibs/find-namespace-value.svg?branch=master)](https://travis-ci.org/1stdibs/find-namespace-value)


Find a value inside an object namespace

example:

    var findNamespaceValue = require('find-namespace-value');
    var obj = {
        company: {
            name: '1stdibs'
        }
    };
    var companyName = findNamespaceValue('company.name', obj);
    var companyLocation = findNamespaceValue('company.location', obj, 'New York, NY');
    var companySecrets = findNamespaceValue('company.secrets', obj);
    
    console.log(companyName); // => "1stdibs"
    console.log(companyLocation); // => "New York, NY"
    console.log(companySecrets); // => undefined

testing:

    $ npm install
    $ npm test
