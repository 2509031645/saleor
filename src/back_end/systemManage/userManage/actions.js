/*
*   fileName: actions
*   author: 宋均辉
*   time: 2019/8/27
*/
// @flow

export default {
    'sys_get_user_list': {
        type: "request",
        path: ['system','getUserList']
    },
    'get_valid_user': {
        type: 'request',
        path: ['system','getValidUser']
    }
}