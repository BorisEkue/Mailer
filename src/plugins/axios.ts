/* eslint-disable */
import Vue from 'vue'
import axios, { AxiosRequestConfig } from 'axios'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const host = 'http://192.168.0.101:8000/api/v1'

const config: AxiosRequestConfig = {
  baseURL: host,
  // baseURL: process.env.baseURL || process.env.apiUrl || '',
  timeout: 15 * 60 * 1000 // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

export const Axios = axios.create(config)

Axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config
  },
  error => {
    // Do something with request error
    logError(error)
    return Promise.reject(error)
  }
)

// Add a response interceptor
Axios.interceptors.response.use(
  response => {
    const status: number = response.status
    const statusText: string = response.statusText
    switch (status) {
      case 403: // Forbidden
        break
      case 401: // Unauthorized
        break
      case 406: // Not Acceptable
        break
    }
    /* Message({
        message: 'Error : ' + status + ' => ' + statusText,
        type: 'error',
        showClose: true
      }); */
    // Do something with response data
    return response
  },
  error => {
    logError(error)
    /* Message({
        message: error.message,
        type: 'error',
        showClose: true
      }) */
    return Promise.reject(error)
  }
)

function logError (error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
  console.log(error.config)
}

export class AxiosPluginOptions {

}

export function AxiosPlugin<AxiosPluginOptions> (_Vue: typeof Vue, options?: AxiosPluginOptions): void {
  _Vue.prototype.$axios = Axios
}

Vue.use(AxiosPlugin)

/*
Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin) */

// export default Plugin;
