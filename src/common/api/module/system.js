/*
*   fileName: system
*   author: 宋均辉
*   time: 2019/8/29
*/
// @flow
import {postRequest,putRequest,getRequest} from "../source";

export default {
    getUserList: (param:any) => postRequest({url:'/api/user/list',param}),
    addUser: (param:any) => postRequest({url:'/api/user/addNewUser',param,isJson:true,headers:{"Content-Type":"application/json"}}),
    editUser: (param:any) => putRequest({url:'/api/user/updateUser',param,isJson:true,headers:{"Content-Type":"application/json"}}),

    getMenuList: (param:any) => postRequest({url:'/api/menu/list',param}),
    addMenu: (param:any) => postRequest({url:'/api/menu/addMenu',param,isJson:true,headers:{"Content-Type":"application/json"}}),
    editMenu: (param:any) => putRequest({url:'/api/menu/updateMenu',param,isJson:true,headers:{"Content-Type":"application/json"}}),
    getMenuListById: (param:any) => getRequest({url:'/api/menu/getMenuInfoById',param}),

    getRoleList: (param:any) => postRequest({url:'/api/role/list',param}),
    addRole: (param:any) => postRequest({url:'/api/role/addRole',param,isJson:true,headers:{"Content-Type":"application/json"}}),
    editRole: (param:any) => putRequest({url:'/api/role/updateRole',param,isJson:true,headers:{"Content-Type":"application/json"}}),
    getRoleById:(param:any) => getRequest({url:'/api/user/getRolesByUserId',param}),
    editRoleById: (param:any) => putRequest({url:'/api/user/addRolesByUserId',param}),
    getAvailableRoleList: (param:any) => getRequest({url:'/api/role/allValidRoles',param}),

    getMenuAuthList: (param:any) => getRequest({url:'/api/role/listMenuRoleById',param}),
    editMenuAuth: (param:any) => putRequest({url:'/api/role/updateMenuRole',param}),
    getValidUser: (param:any) => getRequest({url:'/api/user/listValidUsers',param}),
    changeMenuIndex: (param:any) => putRequest({url:'/api/menu/changeOrderIndex',param})
}