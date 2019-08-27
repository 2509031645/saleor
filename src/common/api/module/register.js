/*
*   fileName: register
*   author: 宋均辉
*   time: 2019/8/21
*/
// @flow
import {postRequest} from "../source";
import {baseUrl} from "../../../config";

export default {
    register: (param:any) => postRequest({url:baseUrl + '/graphql/',param,isJson:true})
}