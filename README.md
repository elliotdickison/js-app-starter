# JavaScript App Starter Kit

This is a starter kit for universal react/redux javascript web applications. This is very much a work in progress. I'm also not necessarily recommending this setup. I'm still learning many of these tools and don't know how to use them or how I feel about them*.

\* Update: React, Redux, and Babel are the cat's pajamas, the bee's knees, and the dog's galoshes.

# Setup

1. Clone the repo
2. `cd` into the repo base directory
3. Run `npm install` to install dependencies
4. Run `npm run build:dev` to build assets for development
5. Run `npm run start:hot` to start a server w/ hot module replacement

# Features

* Universal - async data fetching and rendering on server and client
* Immutable - state and UI
* Testable - mocha + chai + jsom = easy testing of app and components

# Technologies

## App
* [Babel](http://babeljs.io/)
* [ImmutableJS](https://facebook.github.io/immutable-js/)
* [Node](https://nodejs.org/)
* [React](http://facebook.github.io/react/)
* [Redux](https://github.com/rackt/redux)
* [Sass](http://sass-lang.com/)

## Build
* [Webpack](https://webpack.github.io/)

## Test
* [Chai](http://chaijs.com/)
* [ESLint](http://eslint.org/)
* [jsdom](https://github.com/tmpvar/jsdom)
* [Mocha](https://mochajs.org/)

# Future Plans

* Documentation (sheesh, why isn't this done already!?)
* ~~Firebase~~ not necessary for a starter kit
* Track git hooks
* Koa
* PureRender base component
* http://simonsmith.io/unit-testing-react-components-without-a-dom/
* Redux devtools
* Serve initial state from a file for a faster first-render (security?)
* Source maps?
* Stuff it all into Yoeman w/ some handy-dandy generators and options