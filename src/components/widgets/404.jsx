/*
*   fileName: 404
*   author: 宋均辉
*   time: 2019/8/22
*/
// @flow
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import style from './index.module.scss';

type Props = {

}
type State = {

}
class NotFound extends Component<Props,State> {
    constructor(props: Props){
        super(props);
        this.state = {

        }
    }

    goBack = () => {
        this.props.history.goBack()
    };

    render(){
        return (
            <div className={style['notfound-wrapper']}>
                <img style={{width:600,marginTop:'-200px'}} src="/img/404.png" alt=""/>
                <p className={style['notfound-notice']}>你访问的页面上天啦， 请点击<span onClick={this.goBack} className={style['link-text']}>返回</span></p>
            </div>
        )
    }
}

export default withRouter(NotFound);
