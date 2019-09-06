/*
*   fileName: staticMenu
*   author: 宋均辉
*   time: 2019/8/23
*/
// @flow

export default [
    {
        name:'首页',
        id:'local_home',
        iconCls:'home',
        component:'home',
        path:'/BE/home',
        frontPath:'/FE/home',
        frontCom:'home',
        frontIcon:'iconshouyex',
        pagetype:3 // 1:只显示在前端 2: 只显示在后端 3: 前后端都有
    },
    {
        name:'权限管理',
        id:'local_auth',
        iconCls:'auth',
        component:'systemManage/authManage',
        path:'/BE/systemManage/authManage',
        frontPath:'',
        frontCom:'',
        frontIcon:'',
        hideInMenu:true, // 只添加路由，不在菜单内显示
        pagetype:2
    }
    /*{
        name:'客户列表',
        id:'02',
        iconCls:'user',
        component:'',
        path:'',
        children: [
            {
                name:'产品列表',
                menuId:'021',
                iconCls:'user',
                component:'productList',
                path:'/BE/productList'
            },
            {
                name:'客户列表02',
                menuId:'022',
                iconCls:'user',
                component:'',
                path:'',
                children: [
                    {
                        name:'客户列表03',
                        menuId:'0221',
                        iconCls:'user',
                        component:'costumerList',
                        path:'/BE/costumerList'
                    }
                ]
            }
        ]
    }*/
]