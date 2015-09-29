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

* Universal - data fetching + rendering on both sides of the fence
* Immutable - state + UI
* Testable - TAP with tape
* Developable (?) - hot module replacement + in-browser error display

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
* [Tape](https://github.com/substack/tape)

# Future Plans

* Documentation (sheesh, why isn't this done already!?)
* TravisCI + badge
* Track git hooks
* Redux devtools
* Serve initial state from a file for a faster first-render (security?)
* Source maps?
* Stuff it all into Yoeman w/ some handy-dandy generators and options