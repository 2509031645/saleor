/*
*   fileName:
*   author: 宋均辉
*   time: 2019/8/19
*/
// @flow
export default {
    login_result:(state:any={},action:Object) => {
        switch (action.type) {
            case "login_success":
                return {
                    email: action.payload.email,
                    isStaff: action.payload.isStaff,
                    token:action.payload.token,
                    msg: ""
                };
            case "login_fail":
                return {
                    email: "",
                    isStaff: true,
                    msg: action.payload.msg
                };
            case "init_login_result":
                return {
                    email: "",
                    isStaff: "",
                    msg: ""
                };
            case "logout_success":
                return {
                    email: "logout",
                    isStaff: "",
                    msg: ""
                };
            case "logout_failed":
                return {
                    email: "logout_f",
                    isStaff: "",
                    msg: ""
                };
            default:
                return state;
        }
    }
}