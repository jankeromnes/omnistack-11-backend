const {readdirSync, lstatSync} = require('fs');
readdirSync(__dirname + '/').forEach(function(file) {
    if (lstatSync(__dirname + '/' + file).isDirectory()) {
        exports[`${file}Service`] = require('./' + file);
    }
});