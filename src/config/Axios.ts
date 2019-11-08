import Axios from 'axios';
import ENV from './env';
import { Message } from 'element-ui';
// 请求时间
Axios.defaults.timeout = 5000;
// 请求域名
Axios.defaults.baseURL = ENV.api || 'http://localhost:8080';
// 请求头的content-type
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Axios.defaults.withCredentials = true;
// aixos请求拦截
Axios.interceptors.request.use((config: any) => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
}, (err: object) => {
    return Promise.reject(err);
});
// aixos response拦截
Axios.interceptors.response.use((config: any) => {
    const token = config.headers.authorization;
    if (token) {
        window.sessionStorage.setItem('token', token.split(' ')[1]);
    }
    if (config.data.code === 401) {
        return Message({
            type: 'error',
            message: '登陆过期，请重新登录。',
            onClose: () => {
                window.sessionStorage.removeItem('token');
                location.href = '/system';
            },
        });
    }
    if (config.data.code !== 200) {
        Message({
            type: 'error',
            message: config.data.data.msg || '未知错误',
        });
        return Promise.reject(config.data);
    }
    return config.data;
}, (err: any) => {
    if (err.response && err.response.status === 401) {
        return Message({
            type: 'error',
            message: '登陆过期，请重新登录。',
            onClose: () => {
                window.sessionStorage.removeItem('token');
                location.href = '/system';
            },
        });
    }
    err.type = 'timeout';
    return Promise.reject(err);
});
export default Axios;
