/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/21
*/
// @flow

import {Redirect, Route, Switch} from "react-router-dom";
import React from "react";
import staticMenu from "@/config/staticMenu";

const RedirectAs404 = ({location}) => {
    return <Redirect to={Object.assign({}, location, {state: {is404: true}})}/>
};

const getPathList = (user_menu_list) => {
    let routeArr = [];
    const recursionRoute = (routeList) => {
        routeList.forEach(item => {
            [1,3].indexOf(item.pagetype) > -1 && routeArr.push({
                path: item.frontPath,
                component: item.frontCom,
                exact: !(item.children && item.children.length)
            });
            item.children && item.children.length && recursionRoute(item.children)
        })
    };
    recursionRoute(user_menu_list);
    return routeArr;
};

function FrontEndRouter({user_menu_list}) {
    console.log(getPathList(user_menu_list.concat(staticMenu)));
    return (
        <Switch>
            {
                getPathList(user_menu_list.concat(staticMenu)).map(item => item.path && item.component ?
                    <Route
                        path={item.path}
                        key={item.path}
                        exact={item.exact}
                        component={require(`../${item.component}/index`).default}
                    /> : null)
            }
            <Route component={RedirectAs404}/>
        </Switch>
    );
}

export default FrontEndRouter;