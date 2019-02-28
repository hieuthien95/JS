import * as CONST from '@/components/util/const.js'

window.axios = require('axios');
var thiss = this;

export const http = axios.create({
  baseURL: CONST.HTTP_PREFIX_URL_SUBMIT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

http.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  if (error.status != 200 && error.config && !error.config.__isRetryRequest) {
    // if you ever get an unauthorized, logout the user
    // window.location.href = "/about";
    localStorage.removeItem(CONST.HTTP_ACCESS_TOKEN);
  }
  return Promise.reject(error);
});

// Set the AUTH token for any request
http.interceptors.request.use(function (config) {
  if (localStorage.getItem(CONST.HTTP_ACCESS_TOKEN)) {
    config.url = updateQueryStringParameter(config.url, CONST.HTTP_ACCESS_TOKEN, localStorage.getItem(CONST.HTTP_ACCESS_TOKEN))
  }
  return config
});



function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      return uri + separator + key + "=" + value;

    }
}
