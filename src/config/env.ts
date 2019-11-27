const CONFIG = {
    LOCAL: {
        api: 'http://192.168.44.96:3000/api',
    },
    PROD: {
        api: 'https://www.vinekan.com:3000/api',
        // api: 'http://47.105.109.192:3000/api',
    },
};
interface ConfigObj {
    api: string;
}
let  ENV: ConfigObj;
if (window.location.href.includes('47.105.109.192')) {
    ENV = CONFIG.PROD;
} else {
    ENV = CONFIG.LOCAL;
}
export default ENV;
