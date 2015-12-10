# Automated Chrome Profiling

A prototype of automated Chrome/V8 profiling. Inspired by Paul Irish's [repo](https://github.com/paulirish/automated-chrome-profiling) of the same name, using [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface).

## Setup

1. Install Node 0.12 or greater
2. `npm i`
3. Open `index.js`. If you're running this on Linux or Windows, change `chromeBinary` to `google-chrome` or `chrome.exe` respectively

## Run

`node index.js`. The profiles will be output to the `snapshots` directory.

The tests are located in tests.js, which consumes a `Promise`-based wrapper of `chrome-remote-interface`.