/*
*   fileName: register
*   author: 宋均辉
*   time: 2019/8/21
*/
// @flow
import {postRequest} from "../source";

export default {
    register: (param:any) => postRequest({url:'/api/regUser',param})
}