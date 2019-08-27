/*
*   fileName:
*   author:宋均辉
*   time:2019/4/25
*/
// @flow
import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
import { baseUrl } from '../../config';

interface optionType{
    url:string,
    param:any,
    isJson?:boolean,
    headers?:any,
    responseType?:string
}
// request拦截器
axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('TOKEN');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // 请求头携带token
        }
        config.timeout = 300000;
        config.baseURL = baseUrl;
        return config;
    },
    error => {
        Promise.reject(error);
    },
);
axios.interceptors.response.use(
    (response) => {
        switch (response.status) {
            case 404 :
                message.error('服务器被吃了⊙﹏⊙‖');
                throw new Error('404');
            default :
                break;
        }
        //判断状态码
        if (response.data.code && response.data.code !== 0) {
            message.error(response.data.msg);
            // throw new Error(response.data.msg);
            // code为19时，后台提示重新登陆，前端清除缓存，刷新页面
            if (response.data.code === 19) {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
            }
        }
        return response.data;
    },
    error => {
        // 对响应错误做点什么
        message.error('网络开小差，请刷新⊙﹏⊙‖');
        throw new Error(error);
    });

let CancelToken = axios.CancelToken;
let source = CancelToken.source();

export const getRequest = (option:optionType) => {
    return axios.get(option.url, {
        cancelToken: source.token,
        params: option.param
    });
};
export const postRequest = (option:optionType) => {
    return axios.post(option.url, option.isJson ? option.param : qs.stringify(option.param),
        {
            cancelToken: source.token,
            headers: {
                'Content-Type': 'application/json',
                ...option.headers
            },
            responseType: option.responseType || 'json'
        });
};
