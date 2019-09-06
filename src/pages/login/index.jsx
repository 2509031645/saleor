/*
*   fileName:
*   author: 宋均辉
*   time: 2019/8/19
*/
// @flow
import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import query from "../../config/query";
import {Form, Icon, Input, Button, Modal} from 'antd';
import style from './index.module.scss';
import type {RouterHistory} from 'react-router-dom';
import type {WrappedFormUtils} from 'antd';
import CopyRight from "../../components/copyright";
import Loading from '@/components/widgets/loading';

type Props = {
    login(param: any): void,
    form: WrappedFormUtils,
    login_result: any,
    history: RouterHistory
}
type State = {
    modalInfo: any
}

class Login extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            modalInfo: {
                visible: false,
                title: '',
            }
        }
    }

    handleSubmit = (e: SyntheticEvent<>) => {
        e.preventDefault();
        this.props.form.validateFields((errList, fieldList) => {
            if (!errList) {
                this.props.login({username: fieldList.username, password: fieldList.password})
            }
        });
    };

    componentWillMount(): * {
        // return super.componentWillMount();
        this.props.get_user_from_local(JSON.parse(localStorage.getItem('user_info')));
        this.props.get_menu_from_local(JSON.parse(localStorage.getItem('menu_list')));
        this.loginTyped(this.props);
    }

    componentWillReceiveProps(nextProps: Props, nextContext: *): * {
        // fixme: 超时登陆的暂时处理方法
        if(nextProps.user_menu_list.status === 'error'){
            localStorage.removeItem('user_info');
            localStorage.removeItem('menu_list')
        }
        // 如果登陆成功去获取菜单
        if (nextProps.login_result.data.status === 'success' && nextProps.user_menu_list.status !== 'success') {
            this.props.get_menu_by_user_id({userId: nextProps.login_result.data.msg.id})
        } else {
            this.loginTyped(nextProps);
        }
        // return super.componentWillReceiveProps(nextProps, nextContext);
    }

    loginTyped = ({user_menu_list, login_result}) => {
        if (login_result.data.status === 'success' && user_menu_list.status === 'success') {
            switch (login_result.data.msg.pagetype) {  //页面展示类型 默认1 前端 2后端 3前后端可选
                case 1:
                    this.toPage('/FE/home');
                    break;
                case 2:
                    this.toPage('/BE/home');
                    break;
                case 3:
                    this.openLoginTypeModal();
                    break;
            }
            localStorage.setItem("user_info", JSON.stringify(login_result.data));
            localStorage.setItem("user_menu_list", JSON.stringify(user_menu_list))
        }
    };

    openLoginTypeModal = () => {
        this.setState(val => ({
            modalInfo: {
                ...val.modalInfo,
                visible: true,
                title: '登录成功，请选择平台',
                footer: []
            }
        }))
    };

    modalClose = () => {
        this.setState(val => ({
            modalInfo: {
                ...val.modalInfo,
                visible: false
            }
        }))
    };

    toPage = (path: string) => {
        this.props.history.push(path)
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {modalInfo: {title, visible, ...config}} = this.state;
        const {login_result, location} = this.props;
        return (
            <div className={style.wrapper}>
                {login_result.loading && <Loading/>}
                <div className={style.container}>
                    <Form onSubmit={this.handleSubmit} className={style['login-form']}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: '请输入用户名'}],
                                initialValue: location.state ? location.state.userName : ''
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="用户名"
                                    autoComplete="off"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码'}],
                                initialValue: location.state ? location.state.password : ''
                            })(
                                <Input.Password
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="密码"
                                    autoComplete="off"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {/*{getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住我</Checkbox>)}
                            <a className="login-form-forgot" href="">
                                忘记密码
                            </a>*/}
                            <Button type="primary" htmlType="submit" className={style['login-form-button']}>
                                登录
                            </Button>
                        </Form.Item>
                        <div>还不是saloer用户 <a href="" onClick={() => this.toPage('/register')}>立即注册</a></div>
                    </Form>
                </div>
                <CopyRight/>
                <Modal
                    title={title}
                    visible={visible}
                    onCancel={this.modalClose}
                    {...config}
                    closable={false}
                    maskClosable={false}
                >
                    <div className={style['platform-switch']}>
                        <div className={style['platform-cell']} onClick={() => this.toPage('/FE/home')}>
                            <i className={`iconfont iconhandle ${style['platform-icon']}`}/>
                            <p>前台</p>
                        </div>
                        <div className={style['platform-cell']} onClick={() => this.toPage('/BE/home')}>
                            <i className={`iconfont iconhoutai ${style['platform-icon']}`}/>
                            <p>后台</p>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps: any = state => ({
    login_result: state.login_result,
    user_menu_list: state.user_menu_list
});

const mapDispatchToProps: any = dispatch => ({
    login: param => {
        dispatch({
            type: 'login',
            payload: param
        });
    },
    get_menu_by_user_id: param => {
        dispatch({
            type: 'get_menu_by_user_id',
            payload: param
        })
    },
    get_user_from_local: (user: any) => {
        dispatch({
            type: 'get_user_from_local',
            payload: user
        })
    },
    get_menu_from_local: (menu: any) => {
        dispatch({
            type: 'get_menu_from_local',
            payload: menu
        })
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Form.create({name: 'login'})(Login)));

