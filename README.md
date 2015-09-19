# JavaScript App Boilerplate

This is a template for universal ("isomorphic") javascript web applications. This is very much a work in progress. I'm also not necessarily recommending this setup. I'm still learning many of these tools and don't know how to use them or how I feel about them*.

\* Except for React and Redux, which are the cat's pajamas and the dog's galoshes, respectively.

# Setup

1. Clone the repo
2. `cd` into the repo base directory
3. Run `npm install` to install dependencies
4. Run `gulp build` to build assets
5. Run `gulp test` to test
6. Run `gulp serve` to start

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
* Clean up route handling (redirects, 404s, etc.)
* Clean up data fetching (create a mixing?)
* Stuff it all into Yoeman w/ some handy-dandy generators and options
* look at redux-react-router