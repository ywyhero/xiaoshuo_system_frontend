import Axios from './Axios';
const http = (type?: 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH' | undefined, url?: string | undefined, data?: any) => {
    return new Promise ((resolve, reject) => {
        Axios({
            method: type,
            url,
            data,
        }).then((res: any) => {
            resolve(res);
        }, (error: any) => {
            reject(error);
        }).catch((err: any) => {
            reject(err);
        });
    });
};
export default http;
