require('babelify/node_modules/babel-core/register');

var React = require('react');
var BaseComponent = require('./components/base.js');

var express = require('express');
var fs = require('fs');
var path = require('path');

var BaseComponentFactory = React.createFactory(BaseComponent);
var renderedContent = React.renderToString(
    BaseComponentFactory({done: false, name: 'Write Tutorial'})
);

var indexHtml = fs.readFileSync(path.join(__dirname, '/index.html')).toString();
indexHtml = indexHtml.replace('{{renderedContent}}', renderedContent);

var app = express();

app.use(express.static(path.join(__dirname,  '/../public')));

app.get('/', function(req, res) {
  res.send(indexHtml);
});

app.listen(3000, function() {
    console.log("Listening on port 3000.");
});

module.exports = app;