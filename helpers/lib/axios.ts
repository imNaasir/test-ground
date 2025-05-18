import axios from "axios";

// export const baseURL = "https://api.yiksi.exchange";
// export const baseURL = "https://api-uat-walletadmin.yiksi.com";
// export const baseURL = "http://216.48.176.105:8000";
// export const baseURL = "http:192.168.6.103:3000";
// export const baseURL = "http://192.168.28.251:3000";
// export const baseURL = "http://localhost:3000";

// export const baseURL = "http://localhost:3000";

export const baseURL = "https://dk8ecduv09mcq.cloudfront.net";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${baseURL}/api`;
axios.defaults.headers.common = {
    "X-Requested-With": "XMLHttpRequest",
    "REQUEST-FROM": "app",
    Accept: "application/json",
};

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error?.sta00tus === 401) {
            console.log(" unauthorized  401 ");
        }
        return Promise.reject(error);
    }
);

export default axios;
