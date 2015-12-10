module.exports = {
	startCapture: function startCapture(testName) {
		return new Promise(function (resolve, reject) {
			Chrome(function onChrome(chrome) {
				Page.loadEventFired(function onLoad() {
					resolve(evaluate.bind(chrome));
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

	chrome.Runtime.evaluate({ 'expression': iife });
	stopCapture(chrome, testName);
}

function stopCapture(chrome, testName) {
	chrome.Profiler.consoleProfileFinished(function (params) {
		var cpuProfile = params.profile;
		console.log(cpuProfile);
	})

	chrome.Runtime.evaluate({ 'expression': 'console.profileEnd();' });
}