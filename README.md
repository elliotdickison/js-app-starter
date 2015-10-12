[![Build Status](https://travis-ci.org/elliotdickison/js-app-starter.svg?branch=master)](https://travis-ci.org/elliotdickison/js-app-starter)
[![Dependency Status](https://david-dm.org/elliotdickison/js-app-starter.svg)](https://david-dm.org/elliotdickison/js-app-starter)
[![Dev Dependency Status](https://david-dm.org/elliotdickison/js-app-starter/dev-status.svg)](https://david-dm.org/elliotdickison/js-app-starter#info=devDependencies)

# JavaScript Web App Starter Kit

This is a boilerplate for fully-functional universal react/redux JavaScript web applications. It's designed to be a lightweight starter kit for small or medium sized apps ([Relay](https://facebook.github.io/relay/) is probably a better choice for large, data intensive apps). The primary goals for this are: universal rendering (with async data fetching), immutable state, stateless views, and a fast development cycle – all with as few tools as possible. These features should ideally allow rapid bootstrapping of an elegant, powerful, and easy-to-reason-about (i.e. super hip) JavaScript web application. This is written in JavaScript because I don't know ClojureScript yet.

# Features

* Universal - data fetching + view rendering on both sides of the fence
* Immutable - state + UI
* Testable - TAP with tape
* Developable (?) - hot module replacement + in-browser error display + redux dev tools

# Setup

1. Clone the repo
2. `cd` into the repo base directory
3. Run `npm install` to install dependencies
4. Run `npm run dev` to build and run in development mode

# Technologies

## Build
* [Sass](http://sass-lang.com/) - Cause inline styles [just aren't there yet](https://medium.com/@jedwatson/how-do-we-make-styles-in-components-play-nicely-with-server-side-rendering-25de9ecb1b49).
* [Webpack](https://webpack.github.io/) - Handles everything from building and preprocessing to minifying and concatenating. No need for a complicated chain of custom build tools.

## Run
* [Babel](http://babeljs.io/) - ESNext everywhere!
* [ImmutableJS](https://facebook.github.io/immutable-js/) - Forcing immutability is always better than relying on good intentions.
* [Node](https://nodejs.org/) - JavaScript everywhere...
* [React Router](https://github.com/rackt/react-router) - Handy dandy universal routing for react.
* [React](http://facebook.github.io/react/) - Views with unidirectional data flow.
* [Redux](https://github.com/rackt/redux) - The tiny, awesome state container.

## Test
* [Tape](https://github.com/substack/tape) - Simple dom-less testing using the transcendent Test Anything Protocol.