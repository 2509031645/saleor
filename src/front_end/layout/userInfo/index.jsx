/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/21
*/
// @flow

import * as React from 'react';
import style from './index.module.scss';
import PopOver from '../../../components/popover';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import type {RouterHistory} from "react-router-dom";

type Props = {
    history: RouterHistory,
    logout(): void,
    openModal(): void
}

type State = {
    iconClassName: string
}

const content = ({logout,openModal}): React.Node => {
    return (
        <ul className={style['info-content']}>
            <li className={style['info-cell']} onClick={openModal}>编辑个人信息</li>
            <li className={style['info-cell']}>修改密码</li>
            <li className={style['info-cell']} onClick={logout}>退出</li>
        </ul>
    );
};

class UserInfo extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            iconClassName:'iconicon-test2'
        }
    }

    timer = null;

    componentWillMount(): void {
        this.props.get_user_from_local(JSON.parse(localStorage.getItem('user_info')))
    }

    toggleIcon = () => {
        this.setState(val => ({
            iconClassName: val.iconClassName === 'iconicon-test4' ? 'iconicon-test2' : 'iconicon-test4'
        }))
    };

    logout = () => {
        this.props.logout();
        localStorage.removeItem('user_info');
        localStorage.removeItem('user_menu_list');
    };

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        clearTimeout(this.timer);
        if(nextProps.login_result.data.status !== 'success'){
            this.timer = setTimeout(() => {
                localStorage.removeItem('user_info');
                localStorage.removeItem('user_menu_list');
                this.props.history.push('/login');
            })
        }
    }

    render() {
        const {iconClassName} = this.state;
        const {login_result} = this.props;
        return (
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div>
                        <img className={style.logo} src="/img/logo.jpg" alt=""/>
                    </div>
                    <div>
                        你好：
                        <span>
                            <PopOver width={150} onChange={this.toggleIcon} content={content({logout: this.logout,openModal: this.props.openModal})}>
                                <span>
                                    <span className={style['user-name']}>{login_result.data.msg.name}</span>
                                    <i className={`${iconClassName} iconfont ${style['down-icon']}`}/>
                                </span>
                            </PopOver>
                        </span>
                        <img src={login_result.data.msg.userface || '/img/logo.jpg'} style={{width:50,height:50,borderRadius:'50%'}} alt=""/>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    login_result: state.login_result
});

const mapDispatchToProps = dispatch => ({
    logout: () => {
        dispatch({
            type: 'logout'
        })
    },
    get_user_from_local: (user: any) => {
        dispatch({
            type: 'get_user_from_local',
            payload: user
        })
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserInfo));
