function getFetchDataFromRoute (route) {
  return route.WrappedComponent ? getFetchDataFromRoute(route.WrappedComponent) : route.fetchData;
}

function getPromisesFromRoutes (routes, store) {
  return routes
    .filter( (route) => getFetchDataFromRoute(route) )
    .map(getFetchDataFromRoute)
    .map( (fetchData) => fetchData(store) );
}

export default function fetchAllData (routes, store) {
    return Promise.all(getPromisesFromRoutes(routes, store));
}