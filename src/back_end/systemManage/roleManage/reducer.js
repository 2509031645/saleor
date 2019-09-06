/*
*   fileName: reducer
*   author: 宋均辉
*   time: 2019/8/27
*/
// @flow

const defaultRoleList = {
    list:[],
    total:0,
    loading: false
};
const defaultAvailableRoleList = {
    list:[]
};
const defaultUserRoleList = {
    list:[]
};

export default {
    role_list: (state:any =defaultRoleList,action:Object) => {
        switch(action.type){
            case 'sys_get_role_list':
                return {
                    ...state,
                    loading: true
                };
            case 'sys_get_role_list_success':
                return {
                    list:action.payload.data.dataInfo,
                    total:action.payload.data.totalCount,
                    loading: false
                };
            case 'sys_get_role_list_failed':
                return defaultRoleList;
            default:
                return state;
        }
    },
    user_role_list: (state:any =defaultUserRoleList,action:Object) => {
        switch(action.type){
            case 'get_role_by_id_success':
                return {
                    list:action.payload.data.selRoles
                };
            default:
                return state;
        }
    },
    available_role_list: (state:any =defaultAvailableRoleList,action:Object) => {
        switch(action.type){
            case 'get_available_role_list_success':
                return {
                    list:action.payload.data.dataInfo
                };
            default:
                return state;
        }
    }
}