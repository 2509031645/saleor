/*
*   fileName:
*   author: 宋均辉
*   time: 2019/8/19
*/
import { combineReducers } from "redux";
import Login from '@/pages/login/reducer'
import register from '@/pages/register/reducer'
import product from '@/back_end/productList/reducer'

export default combineReducers({
    ...Login,
    ...register,
    ...product
})