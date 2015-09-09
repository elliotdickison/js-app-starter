# React Boilerplate

This is a template for isomorphic react web applications. This is very much a work in progress. I'm also not necessarily recommending this setup. I'm still learning many of these tools and don't know how I feel about all of them yet*.

* Except for React and Redux, which are the cat's pajamas, the bee's knees, and the future of the web.

# Setup

1. Clone the repo
2. `cd` into the repo base directory
3. Run `npm install` to install dependencies
4. Run `gulp` to build assets
5. Run `mocha` to test
6. Run `node src/server.js` to start a server
7. Visit `http://localhost:3000/`

# Technologies

## App
* [React](http://facebook.github.io/react/)
* [Redux](https://github.com/rackt/redux)

## Build
* [npm](https://www.npmjs.com/)
* [Gulp](http://gulpjs.com/)
* [Browserify](http://browserify.org/)
* [Babel](http://babeljs.io/)

## Test
* [Mocha](https://mochajs.org/)
* [Chai](http://chaijs.com/)
* [jsdom](https://github.com/tmpvar/jsdom)

# Future Plans

* Documentation (sheesh, why isn't this done already!?)
* Express => Koa?
* Add react router and a couple views
* Add styles (sass, radium?)
* Try out webpack
* Stuff it all into a Yoeman generator w/ some handy-dandy options