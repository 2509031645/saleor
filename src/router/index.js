/*
*   fileName:
*   author: 宋均辉
*   time: 2019/8/19
*/
// @flow
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NoMatch from '../components/widgets/404'

function AppRouter() {
    return (
        <Router>
            <Route render={({location}) => {
                return location.state && location.state.is404
                    ? <NoMatch/>
                    : <Switch>
                        <Route path="/login" exact component={require('../pages/login/index').default}/>
                        <Route path="/register" exact component={require('../pages/register/index').default}/>
                        <Route path="/FE" component={require('../front_end/layout/index').default}/>
                        <Route path="/BE" component={require('../back_end/layout/index').default}/>
                        <Route component={require('../pages/login/index').default}/>
                        <Route component={require('../components/widgets/404').default}/>
                    </Switch>
            }}/>
        </Router>
    );
}

export default AppRouter;