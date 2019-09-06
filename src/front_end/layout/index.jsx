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
import ModalBox from '@/components/modalBox';
import EditUserInfo from './editUserInfo';
import style from './index.module.scss';
import {connect} from 'react-redux';

type Props = {
    location:LocationShape
}
type State = {

}
class Home extends Component<Props,State>{
    constructor(props:Props){
        super(props);
        this.state = {
            modalInfo: {
                visible: false
            }
        }
    }

    openModal = () => {
        this.setState({
            modalInfo: {
                visible: true
            }
        })
    };

    componentWillMount(): void {
        this.props.get_menu_from_local(JSON.parse(localStorage.getItem('user_menu_list')));
        this.props.get_user_from_local(JSON.parse(localStorage.getItem('user_info')));
    }

    cancelModal = () => {
        this.setState({
            modalInfo: {
                visible: false
            }
        })
    };

    render(){
        const { modalInfo: {visible} } = this.state;
        const {login_result,get_user_info_by_id, user_menu_list} = this.props;
        return(
            <div>
                <UserInfo openModal={this.openModal} />
                <Navigator />
                <div className={style['main-box']} >
                    {
                        user_menu_list.list.length && <FrontEndRouter user_menu_list={user_menu_list.list} key={this.props.location.pathname} />
                    }
                </div>
                <ModalBox
                    visible={visible}
                    onModalCancel={this.cancelModal}
                >
                    <EditUserInfo key={visible} cancelModal={this.cancelModal} get_user_info_by_id={get_user_info_by_id} login_result={login_result} />
                </ModalBox>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    login_result: state.login_result,
    user_menu_list: state.user_menu_list
});

const mapDispatchToProps = dispatch => ({
    get_user_info_by_id: (param: any) => {
        dispatch({
            type: 'get_user_info_by_id',
            payload: param
        })
    },
    get_menu_from_local: (menu: any) => {
        dispatch({
            type: 'get_menu_from_local',
            payload: menu
        })
    },
    get_user_from_local: (menu: any) => {
        dispatch({
            type: 'get_user_from_local',
            payload: menu
        })
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Home));