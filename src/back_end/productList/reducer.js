/*
*   fileName: reducer
*   author: 宋均辉
*   time: 2019/8/27
*/
// @flow
export default {
    product_list: (state:any ={},action:Object) => {
        switch(action.type){
            case 'getProductList_success':
                return {
                    list:action.payload.list,
                    page:action.payload.page,
                    total:action.payload.total
                };
            default:
                return state;
        }
    }
}