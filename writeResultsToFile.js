'use strict';

var fs = require('fs');
var outputDir = 'snapshots';

module.exports = function writeResultsToFile(test, params) {
	var fileName = outputDir + '/' + test.name.toLowerCase().replace(/\ /g, '-') + Date.now() + '.cpuprofile';
	var serialisedProfile = JSON.stringify(params.profile, null, 2);
	fs.writeFileSync(fileName, serialisedProfile);
	console.log('Wrote CPU profile to ' + fileName + '!');
};