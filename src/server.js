require('babelify/node_modules/babel-core/register');

var React = require('react');
var Base = require('./components/base.js');

var express = require('express');
var fs = require('fs');
var path = require('path');

var BaseFactory = React.createFactory(Base);
var renderedContent = React.renderToString(
    BaseFactory({done: false, name: 'Write Tutorial'})
);

var indexHtml = fs.readFileSync(path.join(__dirname, '/index.html')).toString();
indexHtml = indexHtml.replace('{{renderedContent}}', renderedContent);

var app = express();

app.use(express.static(path.join(__dirname,  '/../public')));

app.get('/', function(req, res) {
  res.send(indexHtml);
});

app.listen(3000, function() {
    console.log("Listening on port 3000");
});

module.exports = app;