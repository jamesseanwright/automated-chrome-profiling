'use strict';

var chrome = require('./chrome');

module.exports = [
	{
		name: 'BBC',
		url: 'http://www.bbc.co.uk',
		execute: function bbc() {
			return chrome.startCapture(this)
				.then(function () {
					return chrome.evaluate(function () {
						document.body.style.background = 'blue';
						console.log('Hi!');
					});
				});
		}
	}
];