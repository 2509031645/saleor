/*
*   fileName: reducer
*   author: 宋均辉
*   time: 2019/8/27
*/
// @flow

const defaultState = {
    list: [],
    total: 0,
    loading: false
};

export default {
    menu_list: (state: any = defaultState, action: Object) => {
        switch (action.type) {
            case 'sys_get_menu_list':
                return {
                    ...state,
                    loading: true
                };
            case 'sys_get_menu_list_success':
                return {
                    list: action.payload.data.dataInfo,
                    total: action.payload.data.totalCount,
                    loading: false
                };
            case 'sys_get_menu_list_failed':
                return defaultState;
            default:
                return state;
        }
    }
}