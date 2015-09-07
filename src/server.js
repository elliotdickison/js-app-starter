require('babelify/node_modules/babel-core/register');

var React = require('react');
var App = require('./components/app.js');

var express = require('express');
var fs = require('fs');
var path = require('path');

var AppFactory = React.createFactory(App);
var renderedApp = React.renderToString(
    AppFactory({done: false, name: 'Write Tutorial'})
);

var indexHtml = fs.readFileSync(path.join(__dirname, '/index.html')).toString();
indexHtml = indexHtml.replace('{{renderedApp}}', renderedApp);

var server = express();

server.use(express.static(path.join(__dirname,  '/../public')));

server.get('/', function(req, res) {
  res.send(indexHtml);
});

server.listen(3000, function() {
    console.log("Listening on port 3000");
});

module.exports = server;