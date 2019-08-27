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

type Props = {

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

    render(){
        const {collapsed} = this.state;
        return (
            <Layout style={{height:'100%'}}>
                <SiderMenu collapsed={collapsed} />
                <Layout>
                    <Header className={style.header}>
                        <Icon
                            className={style.trigger}
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <UserInfo />
                    </Header>
                    <Content className={style.content}>
                        <BERouter />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default BEApp;
