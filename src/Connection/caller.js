export default class Caller {
  static async callServer({
    route,
    method,
    params,
    query,
    headers,
    body,
    urlPath,
  }) {
    var url = urlPath ?? API_BASE_URL + route;

    if (params && params !== null) url += '/' + params.join('/');

    if (query && query !== null) url += '?' + query;

    // Default headers
    var defaultHeaders = new Headers();
    defaultHeaders.append('content-type', 'application/json');
    defaultHeaders.append('Accept', 'application/json');

    // Request Options
    var options = {
      method: method,
      headers: headers ?? defaultHeaders,
      body: body ?? null,
    };

    console.log('Calling... ' + url);
    console.log('body... ' + JSON.stringify(body));
    console.log('Consoling Options', options);

    return fetch(url, options)
      .then(async response => {
        if (response.status === 401) {
          console.log('API ERROR: Unathorized user, logging off');
          await Store.flush();
          window.location.reload();
          return false;
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .catch(err => {
        console.log('API ERROR', err);
        return false;
      });
  }
}
