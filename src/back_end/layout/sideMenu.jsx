/*
*   fileName: SideMenu
*   author: 宋均辉
*   time: 2019/8/23
*/
// @flow
import React, {Component} from 'react';
import style from "./index.module.scss";
import {Layout, Icon, Menu} from "antd";
import menuArr from '../../config/staticMenu';
import {withRouter} from "react-router-dom";

const {Sider} = Layout;
const {SubMenu} = Menu;

type Props = {
    history:any,
    collapsed: boolean
}
type State = {

}

class SideMenu extends Component<Props,State> {
    constructor(props) {
        super(props);
    }

    switchRoute = (pathObject:any) => {
        this.props.history.push(pathObject.path);
    };

    // 递归菜单数据
    recursionMenu = (menuArr) => {
        return menuArr.map(item => {
                let isRoot = !!(item.children && item.children.length);
                return isRoot ?
                    <SubMenu
                        key={item.menuId}
                        title={
                            <span>
                                <Icon type={item.icon}/>
                                <span>{item.name}</span>
                              </span>
                        }>
                        {
                            this.recursionMenu(item.children)
                        }
                    </SubMenu> :
                    <Menu.Item key={item.menuId} onClick={() => this.switchRoute(item)}><Icon type={item.icon}/><span>{item.name}</span></Menu.Item>
            }
        );
    };

    render() {
        const {collapsed} = this.props;
        return (
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className={style.logo}/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    {
                        this.recursionMenu(menuArr)
                    }
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(SideMenu);