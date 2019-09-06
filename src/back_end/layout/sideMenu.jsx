/*
*   fileName: SideMenu
*   author: 宋均辉
*   time: 2019/8/23
*/
// @flow
import React, {Component} from 'react';
import style from "./index.module.scss";
import {Layout, Icon, Menu} from "antd";
import {withRouter} from "react-router-dom";
import staticMenu from "@/config/staticMenu";

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
        if(!pathObject.path) return;
        document.title = pathObject.name;
        this.props.history.push(pathObject.path || '/404');
    };

    // 递归菜单数据
    recursionMenu = (menuArr) => {
        return menuArr.map(item => {
                let isRoot = !!(item.children && item.children.length);
                if([0,2,3].indexOf(item.pagetype) === -1){
                    return null;
                }
                return isRoot ?
                    <SubMenu
                        key={item.id}
                        title={
                            <span>
                                {item.iconCls && <Icon type={item.iconCls}/>}
                                <span>{item.name}</span>
                              </span>
                        }>
                        {
                            this.recursionMenu(item.children)
                        }
                    </SubMenu> :
                    <Menu.Item key={item.path} onClick={() => this.switchRoute(item)}>{item.iconCls && <Icon type={item.iconCls}/>}<span>{item.name}</span></Menu.Item>
            }
        );
    };

    render() {
        const {collapsed,user_menu_list} = this.props;
        return (
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className={style.logo}/>
                <Menu theme="dark" mode="inline" defaultOpenKeys={[this.props.match.url]} defaultSelectedKeys={[this.props.location.pathname]}>
                    {
                        this.recursionMenu(staticMenu.concat(user_menu_list).filter(item => !item.hideInMenu))
                    }
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(SideMenu);