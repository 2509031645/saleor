/*
*   fileName:
*   author: 宋均辉
*   time: 2019/8/19
*/
// @flow
import {postRequest,getRequest} from "../source";

export default {
    login: (param:any) => postRequest({url:'/api/login',param}),
    logout: (param:any) => getRequest({url:'/api/logout',param}),
    getUserInfoById: (param:any) => getRequest({url:'/api/user/getUserById',param})
}
