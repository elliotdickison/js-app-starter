/**
 * Application configuration shared accross client and server
 *
 * @module
 */

/**
 * Builds the application configuration and inserts the results into the top
 * level of Node's GLOBALS object
 *
 * @param {Object} Config opts - see buildAppConfig() for details
 *
 * @returns {Object} The final app config
 */
export function buildAppConfigIntoGlobals (opts) {
  const appConfig = buildAppConfig(opts);
  for (let key of Object.keys(appConfig)) {
    GLOBAL[key] = appConfig[key];
  }
  return appConfig;
}

/**
 * Builds the application configuration
 *
 * @param {Object} Config opts including the following keys:
 * - client: is the config being generated for client-side code?
 *
 * @returns {Object} The final app config
 */
export default function buildAppConfig({ client }) {
  return {
    __CLIENT__: client,
    __DEVELOPMENT__: process.env.NODE_ENV === 'development',
  };
}