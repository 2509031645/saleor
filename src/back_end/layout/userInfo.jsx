/*
*   fileName: userInfo
*   author: 宋均辉
*   time: 2019/8/26
*/
// @flow
import React, {Component} from 'react';
import {connect} from "react-redux";
import style from './index.module.scss';
import {withRouter} from "react-router-dom";
import type {RouterHistory} from "react-router-dom";

type Props = {
    history: RouterHistory,
    logout(): void,
    login_result: any
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
        this.props.logout();
        localStorage.removeItem('user_info');
        localStorage.removeItem('user_menu_list');
    };

    componentWillMount(): void {
        // this.props.get_user_from_local(JSON.parse(localStorage.getItem('user_info')))
    }



    render(){
        const {login_result} = this.props;
        return (
            <div>
                <b>{login_result.data.msg.username}</b>
                <span className={style['exit-btn']} onClick={this.logout}>退出登录</span>
            </div>
        )
    }
}

const mapStateToProps:any = state => ({
    login_result: state.login_result
});

const mapDispatchToProps:any = dispatch => ({
    logout: () => {
        dispatch({
            type: 'logout'
        });
    },
    get_user_from_local: (user: any) => {
        dispatch({
            type: 'get_user_from_local',
            payload: user
        })
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserInfo));
