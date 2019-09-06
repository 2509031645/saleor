/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/23
*/
// @flow

import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import staticMenu from "@/config/staticMenu";

type Props = {
    user_menu_list: Array<any>
}

const getPathList = (user_menu_list) => {
    let routeArr = [];
    const recursionRoute = (routeList) => {
        routeList.forEach(item => {
            [2,3].indexOf(item.pagetype) > -1 && routeArr.push({
                path: item.path,
                component: item.component,
                exact: !(item.children && item.children.length)
            });
            item.children && item.children.length && recursionRoute(item.children)
        })
    };
    recursionRoute(user_menu_list);
    return routeArr;
};

const RedirectAs404 = ({location}) => {
    return <Redirect to={Object.assign({}, location, {state: {is404: true}})}/>
};


function BackgroundEndRouter({user_menu_list}: Props) {
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


export default BackgroundEndRouter;