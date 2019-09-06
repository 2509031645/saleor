/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/23
*/
// @flow

import React, {Component} from 'react';
import { Layout, Icon } from 'antd';
import style from './index.module.scss';
import BERouter from '../router';
import SiderMenu from './sideMenu'
import UserInfo from "./userInfo";
import {connect} from "react-redux";
import staticMenu from "@/config/staticMenu";

type Props = {
    get_menu_from_local(): void,
    get_user_from_local(): void
}

type State = {
    collapsed: boolean
}

const { Header, Content } = Layout;
class BEApp extends Component<Props,State>{
    constructor(props: Props){
        super(props);
        this.state = {
            collapsed: false
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentWillMount(): * {
        this.props.get_user_from_local(JSON.parse(localStorage.getItem('user_info')));
        this.props.get_menu_from_local(JSON.parse(localStorage.getItem('user_menu_list')))
        // return super.componentWillMount();
    }

    timer = null;

    componentWillReceiveProps(nextProps: Props, nextContext: *): * {
        clearTimeout(this.timer);
        if(nextProps.login_result.data.status !== 'success'){
            this.timer = setTimeout(() => {
                localStorage.removeItem('user_info');
                localStorage.removeItem('user_menu_list');
                this.props.history.push('/login')
            })
        }
        // return super.componentWillReceiveProps(nextProps, nextContext);
    }

    getPathList = (user_menu_list) => {
        let routeArr = [];
        const recursionRoute = (routeList) => {
            routeList.forEach(item => {
                routeArr.push({
                    path: item.path,
                    component: item.component,
                    name: item.name
                });
                item.children && item.children.length && recursionRoute(item.children)
            })
        };
        recursionRoute(user_menu_list);
        return routeArr;
    };

    render(){
        const {collapsed} = this.state;
        const {user_menu_list,location} = this.props;
        let matchUrl = this.getPathList(user_menu_list.list).concat(staticMenu).filter(item => item.path === location.pathname);
        console.log(matchUrl);
        return (
            <Layout style={{height:'100%'}}>
                {
                    !!user_menu_list.list.length && <>
                        <SiderMenu collapsed={collapsed} user_menu_list={user_menu_list.list} />
                        <Layout>
                            <Header className={style.header}>
                                <div>
                                    <Icon
                                        className={style.trigger}
                                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                                        onClick={this.toggle}
                                    />
                                    <b>{matchUrl && !!matchUrl.length && matchUrl[0].name}</b>
                                </div>

                                <UserInfo />
                            </Header>
                            <Content className={`${style.content} ${location.pathname.indexOf('home') === -1 && style.bg}`}>
                                <BERouter user_menu_list={user_menu_list.list} />
                            </Content>
                        </Layout>
                    </>
                }

            </Layout>
        )
    }
}

const mapStateToProps = (state) => ({
    user_menu_list: state.user_menu_list,
    login_result: state.login_result
});

const mapDispatchToProps = dispatch => ({
    get_user_from_local: (user: any) => {
        dispatch({
            type: 'get_user_from_local',
            payload: user
        })
    },
    get_menu_from_local: (menu: Array<any>) => {
        dispatch({
            type: 'get_menu_from_local',
            payload: menu
        })
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(BEApp);
