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
import {Form, Icon, Input, Button, message} from 'antd';
import type {RouterHistory} from 'react-router-dom';
import style from './index.module.scss';

type Props = {
    login(param: any): void,
    form: any,
    login_result: any,
    history: RouterHistory
}
type State = {}

class Register extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleSubmit = (e: SyntheticEvent<>) => {
        e.preventDefault();
        this.props.form.validateFields((errList, fieldList) => {
            if (!errList) {
                const {password_retype} = fieldList;
                if (password_retype !== fieldList.password) {
                    message.warn('两次输入的密码不一致');
                    return;
                }
                this.props.register(fieldList)
            }
        });
    };

    componentWillReceiveProps(nextProps: Props, nextContext: *): * {
        if (nextProps.register_result && nextProps.register_result.status === 'success') {
            message.success('注册成功，即将跳转登录页');
            setTimeout(() => {
                const {username, password} = this.props.form.getFieldsValue();
                this.props.history.push('/',{
                    userName:username,
                    password
                });
            }, 2000);
        }
        // return super.componentWillReceiveProps(nextProps, nextContext);
    }

    toLogin = () => {
        this.props.history.push('/login')
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={style.wrapper}>
                <div className={style.container}>
                    <Form onSubmit={this.handleSubmit} className={style['login-form']}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    {required: true, message: '请输入用户名'},
                                    {pattern: /^[a-zA-Z0-9_-]{4,16}$/, message: '请输入合法用户名'}
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="4~16个字符，不可输入特殊字符"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码'}],
                            })(
                                <Input.Password
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password_retype', {
                                rules: [{required: true, message: '请确认密码'}],
                            })(
                                <Input.Password
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="确认密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={style['login-form-button']}>
                                注册
                            </Button>
                        </Form.Item>
                        <div>
                            已经注册，现在 <a href="" onClick={this.toLogin}>登录</a>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    register_result: state.register_result
});

const mapDispatchToProps = dispatch => ({
    register: param => {
        dispatch({
            type: 'register',
            payload: param
        });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Form.create({name: 'register'})(Register)));

