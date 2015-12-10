'use strict';

var Chrome = require('chrome-remote-interface');
var writeResultsToFile = require('./writeResultsToFile');

module.exports = {
	startCapture: function startCapture(test) {
		var self = this;
		this.test = test;
		console.log('Executing ' + test.name + ' (' + test.url + ')...');

		return new Promise(function (resolve, reject) {
			Chrome(function onChrome(chrome) {
				self.chrome = chrome;
				console.log('Connected to Chrome!');

				chrome.Page.loadEventFired(function onLoad() {
					console.log('Page has loaded!');
					resolve();
				});

				chrome.once('ready', function () {
					chrome.Page.navigate({ url: test.url });
				});

				chrome.Page.enable();
				chrome.Profiler.enable();
			}).on('error', function () {
				reject(new Error('Can\'t connect to Chrome!'));
			});
		});
	},

	evaluate: function evaluate(func) {
		var chrome = this.chrome;
		var test = this.test;
		var iife = '(' + func + '());';

		return new Promise(function (resolve, reject) {
			chrome.Profiler.consoleProfileStarted(function () {
				console.log('Profiling started!');
			});

			chrome.Profiler.consoleProfileFinished(function (params) {
				writeResultsToFile(test, params);
				resolve();
			});

			console.log('Evaluating...');

			chrome.Runtime.evaluate({ expression: 'console.profile();' + iife + 'console.profileEnd();' });
		});
	}
}