var Chrome = require('chrome-remote-interface');

module.exports = {
	startCapture: function startCapture(test) {
		console.log('Executing ' + test.name + ' (' + test.url + ')...');

		return new Promise(function (resolve, reject) {
			Chrome(function onChrome(chrome) {
				console.log('Connected to Chrome!');

				chrome.Page.loadEventFired(function onLoad() {
					console.log('Page has loaded!');
					resolve(evaluate.bind(chrome));
				});

				chrome.Profiler.consoleProfileStarted(function () {
					console.log('Profiling started!');
				});

				chrome.Profiler.consoleProfileFinished(logResults);
				
				chrome.once('ready', function () {
					chrome.Page.navigate({ url: test.url });
				});

				chrome.Page.enable();
				chrome.Profiler.enable();
			}).on('error', function () {
				reject(new Error('Can\'t connect to Chrome!'));
			});
		});
	}
}

function evaluate(func) {
	var chrome = this;
	var iife = '(' + func + '());';

	console.log('Evaluating...')

	chrome.Runtime.evaluate({ expression: 'console.profile();' + iife });
	chrome.Runtime.evaluate({ expression: 'console.profileEnd();' });

}

function logResults(params) {
	console.log(params);
}