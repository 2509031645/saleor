/*
*   fileName: actions
*   author: 宋均辉
*   time: 2019/8/27
*/
// @flow

export default {
    'sys_get_role_list': {
        type: "request",
        path: ['system','getRoleList']
    },
    'get_role_by_id': {
        type: "request",
        path: ['system','getRoleById']
    },
    'get_available_role_list': {
        type: "request",
        path: ['system','getAvailableRoleList']
    }
}