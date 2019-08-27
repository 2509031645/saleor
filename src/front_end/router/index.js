/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/21
*/
// @flow

import {Redirect, Route, Switch} from "react-router-dom";
import React from "react";

const RedirectAs404 = ({location}) => {
    return <Redirect to={Object.assign({}, location, {state: {is404: true}})}/>
};

function FrontEndRouter() {
    return (
        <Switch>
            <Route path="/FE/home" exact component={require('../home/index').default}/>
            <Route path="/FE/tag_design" exact component={require('../tagDesign/index').default}/>
            <Route path="/FE/my_info" exact component={require('../myInfo/index').default}/>
            <Route path="/FE/my_order" exact component={require('../myOrder/index').default}/>
            <Route path="/FE/help" exact component={require('../helpPage/index').default}/>
            <Route component={RedirectAs404}/>
        </Switch>
    );
}

export default FrontEndRouter;