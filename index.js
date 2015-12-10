var tests = require('./tests');
var spawn = require('child_process').spawn;

var chromeBinary = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome';

function main() {
	startChrome();
	
	runTests().then(function () {
		process.exit(0);
	});
}

function startChrome() {
	spawn(chromeBinary, ['--remote-debugging-port=9222']);
}

function runTests() {
	return Promise.all(tests.map(function (test) {
		return test.execute();
	});
}

main();