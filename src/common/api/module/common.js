/*
*   fileName: common
*   author: 宋均辉
*   time: 2019/8/29
*/
// @flow

import {postRequest} from "@/common/api/source";

export default {
    getMenuByUserId: (param:any) => postRequest({url:'/api/menu/userMenuInfo',param})
}