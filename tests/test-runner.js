const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost/',
  runScripts: 'dangerously'
});

// Set up a global DOM environment for tests
global.window = window;
global.document = window.document;
global.Node = window.Node;
global.navigator = { userAgent: 'node.js' };

// Add all window properties to global scope
Object.keys(window).forEach(key => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

// Add test assertions
const assert = require('assert');
global.assert = assert;

// Load MiniVue
const fs = require('fs');
const path = require('path');
const miniVuePath = path.join(__dirname, '..', 'dist', 'minivue.js');
const miniVueContent = fs.readFileSync(miniVuePath, 'utf8');

// Inject MiniVue into our virtual DOM
const scriptEl = window.document.createElement('script');
scriptEl.textContent = miniVueContent;
window.document.body.appendChild(scriptEl);

// If MiniVue is an object with a default property, use that
if (window.MiniVue && typeof window.MiniVue === 'object' && window.MiniVue.default) {
  global.MiniVue = window.MiniVue.default;
} else {
  global.MiniVue = window.MiniVue;
}

// Run the tests
const Mocha = require('mocha');
const mocha = new Mocha({
  timeout: 5000, // Increase timeout for tests
});

// Add the test files
mocha.addFile(path.join(__dirname, 'mini-vue.test.js'));

// Run the tests
mocha.run(function(failures) {
  process.exitCode = failures ? 1 : 0;
}); 