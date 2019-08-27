/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/20
*/
// @flow
import React, {Component} from 'react';
import Navigator from './navigator';
import UserInfo from './userInfo';
import FrontEndRouter from "../router";
import {withRouter} from "react-router-dom";
import type {LocationShape} from "react-router-dom";
import style from './index.module.scss'

type Props = {
    location:LocationShape
}
type State = {

}
class Home extends Component<Props,State>{
    constructor(props:Props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <UserInfo />
                <Navigator />
                <div className={style['main-box']} >
                    <FrontEndRouter key={this.props.location.pathname} />
                </div>
            </div>
        )
    }
}

export default withRouter(Home);