/*
*   fileName: sagas
*   author: 宋均辉
*   time: 2019/8/20
*/
// @flow
import {takeEvery, call, put} from 'redux-saga/effects';
import actions from './actionTypes';
import login from '@/pages/login/actions';
import register from '@/pages/register/actions';
import productList from "@/back_end/productList/actions";
import Api from '../common/api';
// tabeEvery 捕捉每一个action   put也可以发送action到store里面
interface sagaType {
    type: string,
    path: Array<string>
}

function executeSaga({type, path}:sagaType){
    return function*(action) {
        if(type === 'request'){
            let response = yield Api[path[0]][path[1]](action.payload);
            if(response.data){
                yield put( {
                    type:action.type + '_success',
                    payload: response.data
                })
            }else{
                yield put( {
                    type:action.type + '_failed',
                    payload: response.data
                })
            }
        }

    }
}
const sagas = Object.assign({},login,register,productList);
export function* rootSaga(): any {
    for(let key in sagas){
        yield takeEvery( key, executeSaga(sagas[key]))
    }
}