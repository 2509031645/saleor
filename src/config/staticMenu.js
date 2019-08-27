/*
*   fileName: staticMenu
*   author: 宋均辉
*   time: 2019/8/23
*/
// @flow

export default [
    {
        name:'首页',
        menuId:'01',
        icon:'user',
        component:'home',
        path:'/BE/home'
    },
    {
        name:'客户列表',
        menuId:'02',
        icon:'user',
        component:'',
        path:'',
        children: [
            {
                name:'产品列表',
                menuId:'021',
                icon:'user',
                component:'productList',
                path:'/BE/productList'
            },
            {
                name:'客户列表02',
                menuId:'022',
                icon:'user',
                component:'',
                path:'',
                children: [
                    {
                        name:'客户列表03',
                        menuId:'0221',
                        icon:'user',
                        component:'costumerList',
                        path:'/BE/costumerList'
                    }
                ]
            }
        ]
    },
    {
        name:'订单列表',
        menuId:'03',
        icon:'user',
        component:'',
        path:''
    },
    {
        name:'生产订单',
        menuId:'04',
        icon:'user',
        component:'',
        path:''
    },
    {
        name:'生产任务',
        menuId:'05',
        icon:'user',
        component:'',
        path:''
    }
]