/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/21
*/
// @flow

import React, {Component} from 'react';
import style from './index.module.scss';
import PopOver from '../../../components/popover';
import {withRouter} from "react-router-dom";
import type {RouterHistory} from "react-router-dom";

type Props = {
    history: RouterHistory
}

type State = {
    iconClassName: string
}

const content = ({logout}): React.Node => {
    return (
        <ul className={style['info-content']}>
            <li className={style['info-cell']}>修改密码</li>
            <li className={style['info-cell']} onClick={logout}>退出</li>
        </ul>
    );
};

class UserInfo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            iconClassName:'iconicon-test2'
        }
    }

    toggleIcon = () => {
        this.setState(val => ({
            iconClassName: val.iconClassName === 'iconicon-test4' ? 'iconicon-test2' : 'iconicon-test4'
        }))
    };

    logout = () => {
        this.props.history.push('/login')
    };

    render() {
        const {iconClassName} = this.state;
        return (
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div>
                        <img className={style.logo} src="/img/logo.jpg" alt=""/>
                    </div>
                    <div>
                        你好：
                        <span>
                            <PopOver width={150} onChange={this.toggleIcon} content={content({logout: this.logout})}>
                                <span>
                                    <span className={style['user-name']}>2509031645@qq.com</span>
                                    <i className={`${iconClassName} iconfont ${style['down-icon']}`}/>
                                </span>
                            </PopOver>
                        </span>

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserInfo);
