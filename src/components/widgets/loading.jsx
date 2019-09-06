/*
*   fileName: loading
*   author: 宋均辉
*   time: 2019/8/28
*/
// @flow
import * as React from 'react';
import style from './index.module.scss'

type Props = {

}

type State = {

}

class Loading extends React.Component<Props,State>{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <div className={style['loading-wrapper']}>
                <img src="/img/loading.gif" alt=""/>
            </div>
        )
    }
}

export default Loading;
