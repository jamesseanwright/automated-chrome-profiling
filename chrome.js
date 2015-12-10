var Chrome = require('chrome-remote-interface');

module.exports = {
	startCapture: function startCapture(test) {
		return new Promise(function (resolve, reject) {
			Chrome(function onChrome(chrome) {
				chrome.Page.loadEventFired(function onLoad() {
					resolve(evaluate.bind(chrome));
				});

				chrome.Page.enable();
				chrome.Profiler.enable();
				
				chrome.once('ready', function () {
					chrome.Page.navigate({ url: test.url });
				});
			}).on('error', function () {
				reject(new Error('Can\'t connect to Chrome!'));
			});
		});
	}
}

function evaluate(func) {
	var chrome = this;
	var iife = '(' + func + '());';

	chrome.Runtime.evaluate({ expression: iife });
	stopCapture(chrome);
}

function stopCapture(chrome) {
	chrome.Profiler.consoleProfileFinished(function (params) {
		var cpuProfile = params.profile;
		console.log(cpuProfile);
	})

	chrome.Runtime.evaluate({ expression: 'console.profileEnd();' });
}