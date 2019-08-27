/*
*   fileName: product
*   author: 宋均辉
*   time: 2019/8/27
*/
// @flow
import {postRequest} from "../source";
import {baseUrl} from "../../../config";

export default {
    getProductList: (param:any) => Promise.resolve({
        status:'success',
        data:{
            page:1,
            total:5,
            list:[
                {
                    name:'宋均辉',
                    address: '木叶村'
                },
                {
                    name:'宋均辉1',
                    address: '木叶村1'
                }
            ]
        }
    })//postRequest({url:baseUrl + '/graphql/',param,isJson:true})
}