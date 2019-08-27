/*
*   fileName: userInfo
*   author: 宋均辉
*   time: 2019/8/26
*/
// @flow
import React, {Component} from 'react';
import {connect} from "react-redux";
import style from './index.module.scss';
import {withRouter, RouterHistory} from "react-router-dom";

type Props = {
    history: RouterHistory
}

type State = {

}
class UserInfo extends Component<Props,State>{
    constructor(props: Props){
        super(props);
        this.state = {

        }
    }

    logout = () => {
        this.props.logout({test:'abc'});
        this.props.history.push('/login')
    };

    componentWillReceiveProps(nextProps: Props, nextContext: *): * {
        // fixme: 更具redux返回的状态去判断是否跳转登录页
        // return super.componentWillReceiveProps(nextProps, nextContext);
    }

    render(){
        console.log(this.props);
        return (
            <div>
                <b>2509031645@qq.com</b>
                <span className={style['exit-btn']} onClick={this.logout}>退出登录</span>
            </div>
        )
    }
}

const mapStateToProps:any = state => ({
    login_result: state.login_result
});

const mapDispatchToProps:any = dispatch => ({
    logout: param => {
        dispatch({
            type: 'logout',
            payload: param
        });
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserInfo));
