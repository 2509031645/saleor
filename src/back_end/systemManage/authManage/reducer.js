/*
*   fileName: reducer
*   author: 宋均辉
*   time: 2019/8/27
*/
// @flow

const defaultState = {
    list:[]
};

export default {
    auth_list: (state:any =defaultState,action:Object) => {
        switch(action.type){
            case 'sys_get_auth_list_success':
                return {
                    list:action.payload.data.selMenus
                };
            case 'set_auth_list_done':
                return {
                    list: action.payload
                };
            default:
                return state;
        }
    }
}