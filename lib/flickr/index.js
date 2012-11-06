// Exports all modules
[ 'flickr_api' ].forEach(function (path) {
  	var module = require('./' + path)
  	for (var i in module) {
  		exports[i] = module[i]
    }
});