require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/.*\..*/) === null) {
    exports[`${file}Controller`] = require('./' + file);
  }
});