/*
*   fileName:
*   author: 宋均辉
*   time: 2019/8/19
*/

import login from '@/pages/login/actions';
import register from '@/pages/register/actions';
import productList from "@/back_end/productList/actions";
import userManage from '@/back_end/systemManage/userManage/actions'; // 用户管理
import menuManage from '@/back_end/systemManage/roleManage/actions'; // 菜单管理
import roleManage from '@/back_end/systemManage/menuManage/actions'; // 角色管理
import authManage from '@/back_end/systemManage/authManage/actions'; // 权限管理
import layout from '@/back_end/layout/actions';

export default {
    ...login,
    ...register,
    ...productList,
    ...userManage,
    ...menuManage,
    ...roleManage,
    ...authManage,
    ...layout
}
