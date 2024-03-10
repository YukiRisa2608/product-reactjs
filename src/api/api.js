import axios from "axios";

const cancelTokenSource = axios.CancelToken.source();

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8081/api.com/v2',
    timeout: 100000,
    cancelToken: cancelTokenSource.token
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response && error.response.status === 403) {
        console.log("back into home due to unable authentication")
        window.location.href = window.location.origin;
    }
    return Promise.reject(error);
});

let api = function () {
    let token = localStorage.getItem("token");
    if (token && token.length > 0) {
        instance.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
    return instance;
}

export default api;