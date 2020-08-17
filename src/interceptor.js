import axios , {AxisResponse} from 'axios';


// declare a request interceptor
axios.interceptors.request.use(config => {
    // perform a task before the request is sent  
    let token = localStorage.getItem('access')
    config.headers.authorization = `Bearer ${token}`
    return config;
  }, error => {
    // handle the error
    return Promise.reject(error);
  });


// axios.interceptors.response.use((response) => {
//     return response
//  },
//  error => {
//     const originalRequest = error.config;
//     console.log(originalRequest._retry)
//     if (error.response.status === 401 && !originalRequest._retry) {
 
//         originalRequest._retry = true;
//         return axios.post('/auth/token',
//             {
//                 "refresh_token": localStorage.getItem('refresh')
//             })
//             .then(res => {
//                 if (res.status === 201) {
//                     // 1) put token to LocalStorage
//                     localStorage.setItem('access',res.data.access)
 
//                     // 2) Change Authorization header
//                     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access');
 
//                     // 3) return originalRequest object with Axios.
//                     return axios(originalRequest);
//                 }
//             })
//     }
 
//     // return Error object with Promise
//     return Promise.reject(error);
//  });