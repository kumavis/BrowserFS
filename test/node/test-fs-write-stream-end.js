// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var BrowserFS = BrowserFS ? BrowserFS : require('../../lib/browserfs.js');
var assert = require('assert');
var path = BrowserFS.node.path;
var fs = BrowserFS.node.fs;
var common = BrowserFS.common;

(function() {
  var file = path.join(common.tmpDir, 'write-end-test0.txt');
  var stream = fs.createWriteStream(file);
  stream.end();
  stream.on('close', common.mustCall(function() { }));
})();

(function() {
  var file = path.join(common.tmpDir, 'write-end-test1.txt');
  var stream = fs.createWriteStream(file);
  stream.end('a\n', 'utf8');
  stream.on('close', common.mustCall(function() {
    var content = fs.readFileSync(file, 'utf8');
    assert.equal(content, 'a\n');
  }));
})();
