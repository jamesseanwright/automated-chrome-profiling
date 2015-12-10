var chrome = require('./chrome');

module.exports = [
	{
		name: 'Queued Filters for Clothing',
		url: 'http://localhost:8082/en-gb/mens/clothing',

		execute: function clothing() {
			chrome.startCapture(this.name)
				.then(function (evaluate) {
					return evaluate(function () {
						alert('hello!');
					});
				});
		}
	}
];