const {readdirSync, lstatSync} = require('fs');
readdirSync(__dirname + '/').forEach(function(file) {
    if (file !== 'index.js') {
        file = file.replace(/\.js$/, '');
        exports[`${file}`] = require('./' + file);
    }
});