import Axios from './Axios';
import { Message } from 'element-ui';
const http = (type?: 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH' | undefined, url?: string | undefined, data?: any) => {
    return new Promise ((resolve, reject) => {
        Axios({
            method: type,
            url,
            data,
        }).then((res: any) => {
            resolve(res);
        }, (error: any) => {
            if (error.type === 'timeout') {
                return  Message({
                    type: 'error',
                    message: '网络错误，请稍后重试',
                });
            }
            reject(error);
        }).catch((err: any) => {
            reject(err);
        });
    });
};
export default http;
