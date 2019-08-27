/*
*   fileName:
*   author: 宋均辉
*   time: 2019/8/19
*/
// @flow
import {postRequest,getRequest} from "../source";
import {baseUrl} from "../../../config";

export default {
    login: (param:any) => Promise.resolve({
        data:{
            email: '2509031645@qq.com',
            isStaff: true,
            token:'HusdWEDA478879DFsda5asd2585F54aSaasdE',
            msg: ""
        }
    }),//postRequest({url:baseUrl + '/graphql/',param,isJson:true}),
    logout: (param:any) => postRequest({url:baseUrl + '/graphql/',param,isJson:true}),
    hello: (param:any) => getRequest({url: '/hello',param})
}
