// import axios from 'axios'
// import _assign from 'lodash/assign'
// import cookies from 'axios/lib/helpers/cookies'

// const instance = axios.create({

//   baseURL: process.window
//     ? process.env.BROWSER_API_URL
//     : process.env.SERVER_API_URL,
//   headers: {
//     'X-XSRF-TOKEN': cookies.read('XSRF-TOKEN'),
//   },
// })

// if (!process.window) {
//   instance.interceptors.request.use((config) => _assign({}, config, {
//     url: decodeURI(config.url) === config.url ? encodeURI(config.url) : config.url,
//   }))
// }

// export default instance
