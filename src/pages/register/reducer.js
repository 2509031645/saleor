/*
*   fileName:
*   author: 宋均辉
*   time: 2019/8/19
*/
// @flow
export default {
    register_result: (state: any = {}, action: Object) => {
        switch (action.type) {
            case "register_success":
                return {
                    status: "success",
                    msg: ""
                };
            case "register_fail":
                return {
                    status: "failed",
                    msg: action.payload.msg
                };
            case "init_register_result":
                return {
                    status: "",
                    msg: ""
                };
            default:
                return state;
        }
    }
}