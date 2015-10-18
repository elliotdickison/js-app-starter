[![Build Status](https://travis-ci.org/elliotdickison/js-app-starter.svg?branch=master)](https://travis-ci.org/elliotdickison/js-app-starter)
[![Dependency Status](https://david-dm.org/elliotdickison/js-app-starter.svg)](https://david-dm.org/elliotdickison/js-app-starter)
[![Dev Dependency Status](https://david-dm.org/elliotdickison/js-app-starter/dev-status.svg)](https://david-dm.org/elliotdickison/js-app-starter#info=devDependencies)

# JavaScript Web App Starter Kit

This is a boilerplate for fully-functional universal react/redux JavaScript web applications. It's designed to be a lightweight starter kit for small or medium sized apps ([Relay](https://facebook.github.io/relay/) is probably a better choice for large, data intensive apps). The primary goals for this are: universal rendering (with async data fetching), immutable state, stateless views, and a fast development cycle – all with as few tools as possible. These features should ideally allow rapid bootstrapping of an elegant, powerful, and easy-to-reason-about (i.e. super hip) JavaScript web application. This is written in JavaScript because I don't know ClojureScript yet.

# Features

## Universal

Routing, data fetching, and view rendering is handled both on the server and the client. This means that a new request will return a fully rendered app in the correct state, all before any client-side javascript has been run. When client-side javascript has been fetched and run, React hooks into the pre-rendered DOM and takes over (without the need for a full client-side re-render). [React Router](https://github.com/rackt/react-router) is used to match routes on the server as well as handle dynamic routing on the client. An [ES2016 decorator](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841) is used to attach static data-fetching methods to any react components that require remote data. These methods are automatically called server-side for every component in the matched route. They are automatically called client-side on componentDidMount. View rendering is handled entirely by React ([ReactDomServer.renderToString](https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostring) on the server, and [ReactDom.render](https://facebook.github.io/react/docs/top-level-api.html#reactdom.render) on the client).

## Immutable

[Custom reducer code](https://github.com/elliotdickison/js-app-starter/blob/master/src/plumbing/create-store.js) works around Redux's current assumption that the state is a plain objection and allows it to be a single [ImmutableJS](https://facebook.github.io/immutable-js/) object (i.e. store.getState() returns an immutable object). React ensures that the UI is immutable as well (no custom DOM manipulations).

## Testable

[Substack's Tape](https://github.com/substack/tape) library, which uses the tried-and-true Test Anything Protocol, is used as an all-in-one testing/assertion solution. The React test utils allow for [shallow rendering](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering) of components, meaning that individual components can be easily isolated and tested without the need for a DOM or complex mocking/stubbing.

## Developable

All of the awesome dev tools from [Dan Abromov](https://github.com/gaearon/react-transform-boilerplate) are included when the app is run in development mode. This means: hot module replacement (auto-reloading of javascript and sass w/o browser refreshes), in-browser error display, and the redux dev tools (time travel, etc.).

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