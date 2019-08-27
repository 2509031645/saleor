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
import { Form, Icon, Input, Button, Modal } from 'antd';
import style from './index.module.scss';
import type {RouterHistory} from 'react-router-dom';
import type {WrappedFormUtils} from 'antd';
import CopyRight from "../../components/copyright";

type Props = {
    login(param:any): void,
    form:WrappedFormUtils,
    login_result:any,
    history: RouterHistory
}
type State = {
    modalInfo:any
}
class Login extends Component<Props,State>{
    constructor(props){
        super(props);
        this.state = {
            modalInfo:{
                visible: false,
                title:''
            }
        }
    }
    handleSubmit = (e:SyntheticEvent<>) => {
        e.preventDefault();
        this.props.form.validateFields((errList,fieldList) => {
            if(!errList){
                this.openLoginTypeModal(); // fixme:有接口了以后要写到返回状态里
                this.props.login({"operationName":"TokenAuth","query":query.login,variables:{email: fieldList.email, password: fieldList.password}})
            }
        });
    };
    componentWillMount(): * {
        // return super.componentWillMount();
    }

    componentWillReceiveProps(nextProps: Props, nextContext: *): * {
        /*if(nextProps.login_result.token && nextProps.login_result.isStaff){
            this.props.history.push('/FE/home');
        }
        if(nextProps.login_result.token && !nextProps.login_result.isStaff){
            this.props.history.push('/BE/home');
        }*/
        // return super.componentWillReceiveProps(nextProps, nextContext);
    }

    openLoginTypeModal = () => {
        this.setState(val => ({
            modalInfo:{
                ...val.modalInfo,
                visible: true,
                title: '请选择平台',
                footer:[]
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

    render(){
        const { getFieldDecorator } = this.props.form;
        const { modalInfo:{title,visible,...config} } = this.state;
        return(
            <div className={style.wrapper}>
                <div className={style.container}>
                    <Form onSubmit={this.handleSubmit} className={style['login-form']}>
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: '请输入邮箱' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="邮箱"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }],
                            })(
                                <Input.Password
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
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
                <CopyRight />
                <Modal
                    title={title}
                    visible={visible}
                    onCancel={this.modalClose}
                    {...config}
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

const mapStateToProps:any = state => ({
    login_result: state.login_result
});

const mapDispatchToProps:any = dispatch => ({
    login: param => {
        dispatch({
            type: 'login',
            payload: param
        });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Form.create({ name: 'login' })(Login)));

