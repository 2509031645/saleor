/*
*   fileName: reducer
*   author: 宋均辉
*   time: 2019/8/27
*/
// @flow

const defaultUserList = {
    list: [],
    total: 0,
    loading: false
};
const defaultValidUser = {
    list: [],
    total: 0
};

export default {
    user_list: (state: any = defaultUserList, action: Object) => {
        switch (action.type) {
            case 'sys_get_user_list':
                return {
                    ...state,
                    loading: true
                };
            case 'sys_get_user_list_success':
                return {
                    list: action.payload.data.dataInfo,
                    total: action.payload.data.totalCount,
                    loading: false
                };
            case 'sys_get_user_list_failed':
                return defaultUserList;
            default:
                return state;
        }
    },
    valid_user_list: (state: any = defaultValidUser, action: Object) => {
        switch (action.type) {
            case 'get_valid_user_success':
                return {
                    list: action.payload.data.dataInfo
                };
            default:
                return state;
        }
    }
}