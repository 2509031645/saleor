/*
*   fileName:
*   author: 宋均辉
*   time: 2019/8/19
*/
// @flow
type State = {}
const defaultLoginResult: State = {
    loading: false,
    data: {
        msg: {
            username: '' // 用户名
        },
        status: 'notLoggedIn'
    }
};

const defaultMenuList: State = {
    list: [],
    status: 'notGetYet'
};
export default {
    login_result: (state: State = defaultLoginResult, action: Object) => {
        switch (action.type) {
            // 登录中
            case "login":
                return {
                    ...state,
                    loading: true
                };
            // 登录成功
            case "login_success":
                return {
                    ...state,
                    data: action.payload,
                    loading: false
                };
            // 登录失败
            case "login_fail":
                return defaultLoginResult;
            // 从本地获取用户信息完成
            case "get_user_from_local_done":
                return {
                    loading: false,
                    data: action.payload || defaultLoginResult.data
                };
            // 登出中
            case 'logout':
                return state;
            // 登出成功
            case "logout_success":
                return defaultLoginResult;
            // 登出失败
            case "logout_failed":
                return state;
            // 清除登录信息完成
            case "init_login_result":
                return defaultLoginResult;
            // 根据用户id获取登陆信息成功
            case "get_user_info_by_id_success":
                return {
                    loading: false,
                    data: {
                        msg: action.payload.data.dataInfo,
                        status: 'success'
                    }
                };
            default:
                return state;
        }
    },
    user_menu_list: (state: any = defaultMenuList, action: Object) => {
        console.log(action.type);
        switch (action.type) {
            case 'get_menu_by_user_id_success':
                return {
                    list: action.payload.data.dataInfo || [],
                    status: 'success'
                };
            case 'get_menu_by_user_id_failed':
                return {
                    list: [],
                    status: 'error'
                };
            case 'get_menu_from_local_done':
                return {
                    list: action.payload ? action.payload.list : [],
                    status: action.payload ? 'success' : 'notGetYet'
                };
            case "logout":
                return defaultMenuList;
            default:
                return state;
        }
    }
}