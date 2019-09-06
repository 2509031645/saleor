/*
*   fileName: actions
*   author: 宋均辉
*   time: 2019/8/27
*/
// @flow

export default {
    'sys_get_auth_list': {
        type: "request",
        path: ['system','getMenuAuthList']
    },
    'set_auth_list': {
        type: 'set_auth_list'
    }
}