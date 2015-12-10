'use strict';

var chrome = require('./chrome');

module.exports = [
	{
		name: 'Queued Filters for Clothing',
		url: 'http://localhost:8082/en-gb/mens/clothing',

		execute: function clothing() {
			return chrome.startCapture(this)
				.then(function () {
					return chrome.evaluate(function () {
						document.body.style.background = 'blue';
					});
				});
		}
	}
];