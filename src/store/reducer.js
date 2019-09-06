/*
*   fileName:
*   author: 宋均辉
*   time: 2019/8/19
*/
import { combineReducers } from "redux";
import Login from '@/pages/login/reducer';
import register from '@/pages/register/reducer';
import product from '@/back_end/productList/reducer';
import userManege from '@/back_end/systemManage/userManage/reducer'; // 用户管理
import menuManage from '@/back_end/systemManage/menuManage/reducer'; // 菜单管理
import roleManage from '@/back_end/systemManage/roleManage/reducer'; // 角色管理
import authManage from '@/back_end/systemManage/authManage/reducer'; // 权限管理
import layout from '@/back_end/layout/reducer';

export default combineReducers({
    ...Login,
    ...register,
    ...product,
    ...userManege,
    ...menuManage,
    ...roleManage,
    ...authManage,
    ...layout
})