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
import {connect} from 'react-redux';
import staticMenu from "@/config/staticMenu";

type Props = {
    history: RouterHistory,
    location: LocationShape
}
type State = {}

class Navigator extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            showMenuId: [],
            disabledMenuId: [],
            pathMatchMenuId: []
        }
    }

    componentWillMount(): * {
        this.setState({
            pathMatchMenuId: this.matchUrl(staticMenu.concat(this.props.user_menu_list.list), this.props.location.pathname)
        });
        this.props.history.listen(location => {
            this.setState({
                pathMatchMenuId: this.matchUrl(staticMenu.concat(this.props.user_menu_list.list), location.pathname)
            })
        })
        // return super.componentWillMount();
    }

    matchUrl = (menuList, pathname) => {
        let selMenus = [];
        let isMatched = false;
        let matchMenu = (list, id) => {
            selMenus.push(id);
            let len = list.length;
            let index = 0;
            for (; index < len; index++) {
                if (isMatched) break;
                if (list[index].frontPath === pathname) {
                    selMenus.push(list[index].id);
                    isMatched = true;
                    break;
                } else if (list[index].children && list[index].children.length) {
                    matchMenu(list[index].children, list[index].id);
                } else {
                    selMenus.length = 1;
                }
            }
        };
        for (let len = menuList.length,index = 0;index < len; index++){
            if(menuList[index].frontPath === pathname){
                selMenus.push(menuList[index].id);
                break;
            }else if(menuList[index].children && menuList[index].children.length){
                matchMenu(menuList[index].children, menuList[index].id);
            }
        }

        return selMenus;

    };

    componentWillReceiveProps(nextProps: Props, nextContext: *): * {

        // return super.componentWillReceiveProps(nextProps, nextContext);
    }

    switchRoute = (routeObj) => {
        if ((routeObj.children && routeObj.children.length) || !routeObj.frontPath) {
            return;
        }
        this.props.history.push(routeObj.frontPath);
    };

    showMenuId = ids => {
        this.setState({
            showMenuId: ids
        }, () => setTimeout(() => {
            this.setState({
                disabledMenuId: ids
            })
        }, !ids.length && 200))
    };

    timer = null;

    render() {
        const {location, user_menu_list} = this.props;
        const {showMenuId, disabledMenuId, pathMatchMenuId} = this.state;
        return (
            <div className={style.wrapper}>
                <div className={style.container}>
                    {
                        staticMenu.concat(user_menu_list.list).map(item => {
                            if ([0, 1, 3].indexOf(item.pagetype) === -1) return null;
                            return <div
                                key={item.id}
                                className={showMenuId.concat(pathMatchMenuId).indexOf(item.id) > -1 ? style['tab-active'] : style.tab}
                                onMouseEnter={() => {
                                    clearTimeout(this.timer);
                                    this.showMenuId([item.id])
                                }}
                                onMouseLeave={() => {
                                    clearTimeout(this.timer);
                                    this.timer = setTimeout(() => this.showMenuId([]), 200)
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    this.switchRoute(item)
                                }}>
                                <i className={`iconfont ${item.frontIcon} ${style['nav-icon']}`}/>{item.name}
                                {
                                    disabledMenuId.indexOf(item.id) > -1 &&
                                    <ul className={`animated faster ${showMenuId.indexOf(item.id) > -1 ? 'fadeIn' : 'fadeOut'} ${style['sub-tab']}`}>
                                        {
                                            item.children && !!item.children.length && item.children.map(itemIn => {
                                                if ([0, 1, 3].indexOf(itemIn.pagetype) === -1) return null;
                                                return <li
                                                    key={itemIn.id}
                                                    className={pathMatchMenuId.indexOf(itemIn.id) > -1 ? style['sub-tab-cell-active'] : style['sub-tab-cell']}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        this.switchRoute(itemIn)
                                                    }}
                                                    onMouseEnter={() => {
                                                        clearTimeout(this.timer);
                                                        this.showMenuId([item.id, itemIn.id])
                                                    }}
                                                >
                                                    <div style={{display:'flex',justifyContent:'space-between',alignItems: 'center'}}>
                                                        <span>{itemIn.name}</span>{!!itemIn.children && !!itemIn.children.length && <i className="iconfont iconicon-test5" style={{fontWeight:'bold',fontSize:20}}></i>}
                                                    </div>
                                                    {
                                                        disabledMenuId.indexOf(itemIn.id) > -1 &&
                                                        <ul className={`animated faster ${showMenuId.indexOf(itemIn.id) > -1 ? 'fadeIn' : 'fadeOut'} ${style['pop-tab']}`}>
                                                            {
                                                                itemIn.children && !!itemIn.children.length && itemIn.children.map(itemInner => {
                                                                    if ([0, 1, 3].indexOf(itemInner.pagetype) === -1) return null;
                                                                    return <li
                                                                        key={itemInner.id}
                                                                        className={pathMatchMenuId.indexOf(itemInner.id) > -1 ? style['pop-tab-cell-active'] : style['pop-tab-cell']}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            this.switchRoute(itemInner)
                                                                        }}
                                                                    >{itemInner.name}</li>
                                                                })
                                                            }
                                                        </ul>
                                                    }
                                                </li>
                                            })
                                        }
                                    </ul>
                                }

                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user_menu_list: state.user_menu_list
});

const mapDispatchToProps = dispatch => ({
    get_user_info_by_id: (param: any) => {
        dispatch({
            type: 'get_user_info_by_id',
            payload: param
        })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigator));
