/*
*   fileName: navigator
*   author: 宋均辉
*   time: 2019/8/21
*/
// @flow

import React, {Component} from 'react';
import style from './index.module.scss';
import {withRouter} from "react-router-dom";
import type {RouterHistory, LocationShape} from 'react-router-dom';

type Props = {
    history: RouterHistory,
    location: LocationShape
}
type State = {

}
class Navigator extends Component<Props,State>{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    switchRoute = (routeName) => {
        this.props.history.push('/FE/' + routeName);
    };

    render(){
        const {location} = this.props;
        return (
            <div className={style.wrapper}>
                <div className={style.container} >
                    <span
                        className={location.pathname.split('/').reverse()[0] === 'home' ? style['tab-active'] : style.tab}
                        onClick={() => this.switchRoute('home')}>
                        <i className={`iconfont iconshouyex ${style['nav-icon']}`} style={{fontSize:18}}/>首页
                    </span>
                    <span
                        className={location.pathname.split('/').reverse()[0] === 'tag_design' ? style['tab-active'] : style.tab}
                        onClick={() => this.switchRoute('tag_design')}>
                        <i className={`iconfont iconbiaoqian ${style['nav-icon']}`} style={{fontSize:18}}/>定制标签
                    </span>
                    <span
                        className={location.pathname.split('/').reverse()[0] === 'my_info' ? style['tab-active'] : style.tab}
                        onClick={() => this.switchRoute('my_info')}>
                        <i className={`iconfont iconziliao ${style['nav-icon']}`}/>我的资料
                    </span>
                    <span
                        className={location.pathname.split('/').reverse()[0] === 'my_order' ? style['tab-active'] : style.tab}
                        onClick={() => this.switchRoute('my_order')}>
                        <i className={`iconfont icondingdan ${style['nav-icon']}`}/>我的订单
                    </span>
                    <span
                        className={location.pathname.split('/').reverse()[0] === 'help' ? style['tab-active'] : style.tab}
                        onClick={() => this.switchRoute('help')}>
                        <i className={`iconfont iconbangzhu ${style['nav-icon']}`}/>帮助中心
                    </span>
                    <span
                        className={location.pathname.split('/').reverse()[0] === 'hahahaha' ? style['tab-active'] : style.tab}
                        onClick={() => this.switchRoute('hahahaha')}>
                        <i className={`iconfont iconbangzhu ${style['nav-icon']}`}/>404
                    </span>
                </div>
            </div>
        )
    }
}

export default withRouter(Navigator);
