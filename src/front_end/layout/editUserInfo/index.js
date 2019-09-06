/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/9/3
*/
// @flow
import * as React from 'react';
import style from './index.module.scss';
import FormGenerator from "@/components/form/formGenerator";
import {Button, message} from 'antd';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Api from '@/common/api';
import {getBase64} from "@/common/utils";

class EditUserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldList: [
                {
                    filedName: '头像',
                    paramName: 'userface',
                    type: 'uploadIcon',
                    imageUrl: props.login_result.data.msg.userface,
                    initialValue: props.login_result.data.msg.name,
                    attr: {
                        beforeUpload: () => false,
                        onChange: (info) => {
                            getBase64(info.fileList[0].originFileObj, imageUrl => {
                                    this.setAvatar(imageUrl)
                                }
                            );
                        }
                    }
                },
                {
                    filedName: '昵称',
                    paramName: 'name',
                    type: 'input',
                    initialValue: props.login_result.data.msg.name
                },
                {
                    filedName: '用户名',
                    paramName: 'username',
                    type: 'input',
                    initialValue: props.login_result.data.msg.username,
                    attr: {
                        disabled: true
                    }
                },
                {
                    filedName: '手机',
                    paramName: 'telephone',
                    type: 'input',
                    initialValue: props.login_result.data.msg.telephone
                },
                {
                    filedName: '电话',
                    paramName: 'phone',
                    type: 'input',
                    initialValue: props.login_result.data.msg.phone
                },
                {
                    filedName: '邮箱',
                    paramName: 'email',
                    type: 'input',
                    initialValue: props.login_result.data.msg.email
                },
                {
                    filedName: '住址',
                    paramName: 'address',
                    type: 'input',
                    initialValue: props.login_result.data.msg.address
                }
            ],
            preIcon: '',
            imageUrl: props.login_result.data.msg.userface,
            showCrop: false,
            loading: false
        }
    }

    searchForm = null;

    onFormInit = form => {
        this.searchForm = form;
    };

    // 保存裁切头像到表单
    setAvatar = imageUrl => {
        this.setState(val => ({
            fieldList: val.fieldList.map(item => {
                if (item.paramName === 'userface') {
                    item.imageUrl = imageUrl
                }
                return item;
            }),
            imageUrl,
            showCrop: true
        }))
    };

    editInfo = () => {
        this.searchForm.validateFields(async (errList, fieldList) => {
            if (!errList) {
                const {userface,...restParam} = fieldList;
                this.setState({
                    loading: true
                });
                let res = await Api.system.editUser({...restParam, id: this.props.login_result.data.msg.id,userface:this.state.imageUrl,enabled: true});
                this.setState({
                    loading: false
                });
                if (res.data.status === 'success') {
                    message.success(res.data.msg);
                    this.props.cancelModal();
                    this.props.get_user_info_by_id({userId: this.props.login_result.data.msg.id});
                }
            }
        })
    };

    componentWillReceiveProps(nextProps: Props, nextContext: *): * {
        localStorage.setItem('user_info', JSON.stringify(nextProps.login_result.data))
        // return super.componentWillReceiveProps(nextProps, nextContext);
    }

    _crop() {
        setTimeout(() => {
            this.setState({
                preIcon: this.refs.cropper.getCroppedCanvas().toDataURL()
            })
        });
        // console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
    }

    setIcon = () => {
        this.setAvatar(this.refs.cropper.getCroppedCanvas().toDataURL());
    };

    render() {
        const {fieldList, preIcon, imageUrl, showCrop, loading} = this.state;
        const {cancelModal} = this.props;
        return (
            <div className={style.wrapper}>
                <p className={style.title}>编辑用户信息</p>
                {
                    showCrop && <div style={{width: '90%',margin: '0 auto',paddingBottom:20}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Cropper
                                ref='cropper'
                                src={imageUrl}
                                style={{height: 150, width: 150}}
                                autoCropArea={1}
                                // Cropper.js options
                                aspectRatio={9 / 9}
                                guides={false}
                                crop={this._crop.bind(this)}
                            />
                            <img src={preIcon} style={{width: 150, height: 150, marginLeft: 80, border: '1px solid #ccc'}}
                                 alt=""/>
                        </div>
                        <Button onClick={this.setIcon} type={'danger'} style={{marginTop:20,width:'100%'}}>裁切</Button>
                    </div>
                }

                <div style={{paddingRight: 50, width: '80%', margin: '0 auto'}}>
                    <FormGenerator fieldList={fieldList} formConfig={{layout: 'Horizontal'}} formItemLayout={{
                        labelCol: {
                            xs: {span: 8},
                            sm: {span: 6}
                        },
                        wrapperCol: {
                            xs: {span: 16},
                            sm: {span: 18}
                        }
                    }} onFormInit={this.onFormInit}/>
                </div>
                <div className={style['btn-group']}>
                    <Button type={'primary'} loading={loading} onClick={this.editInfo}>确定</Button>
                    <Button style={{marginLeft: 20}} onClick={cancelModal}>取消</Button>
                </div>

            </div>
        )
    }
}

export default EditUserInfo;