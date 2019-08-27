/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/23
*/
// @flow

import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import staticMenu from "../../config/staticMenu";

const getPathList = () => {
    let routeArr = [];
    const recursionRoute = (routeList) => {
        routeList.forEach(item => {
            routeArr.push({
                path: item.path,
                component: item.component,
                exact: !(item.children && item.children.length)
            });
            item.children && item.children.length && recursionRoute(item.children)
        })
    };
    recursionRoute(staticMenu);
    return routeArr;
};

const RedirectAs404 = ({location}) => {
    return <Redirect to={Object.assign({}, location, {state: {is404: true}})}/>
};

function FrontEndRouter() {
    return (
        <Switch>
            {
                getPathList().map(item => item.path ? <Route path={item.path} key={item.path} exact={item.exact} component={require(`../${item.component}/index`).default}/> : null)
            }
            <Route component={RedirectAs404}/>
        </Switch>
    );
}

export default FrontEndRouter;