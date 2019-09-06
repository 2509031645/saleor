/*
*   fileName:
*   author: 宋均辉
*   time: 2019/8/19
*/
// @flow
export default {
    'login':{
        type: "request",
        path: ['login','login']
    },
    'logout': {
        type: "request",
        path: ['login','logout']
    },
    'init_login_result': {
        type: "init_login_result"
    },
    'get_user_from_local': {
        type: "get_user_from_local"
    },
    'get_menu_by_user_id': {
        type: 'request',
        path: ['common','getMenuByUserId']
    },
    'get_menu_from_local': {
        type: 'get_menu_from_local'
    },
    'get_user_info_by_id': {
        type: 'request',
        path: ['login','getUserInfoById']
    }
}