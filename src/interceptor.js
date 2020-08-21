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


axios.interceptors.response.use(response => {
    return response;
}, err => {
    return new Promise((resolve, reject) => {
        const originalReq = err.config;
        if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest)
        {
            originalReq._retry = true;

            let res = fetch('http://localhost:3200/user/refresh/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refresh: localStorage.getItem("refresh")
                }),
            }).then(res => {
                if (res.status != 201){
                    localStorage.clear()
                    window.location.reload(false);
                    return Promise.reject(err);
                }
                return res.json()
            })
            .then(res => {
                // console.log(res);
                localStorage.setItem('access',res.access)
                return axios(originalReq);
            })
            .catch(err => {
                return Promise.reject(err);
            });
            resolve(res);
        }


        return Promise.reject(err);
    });
});