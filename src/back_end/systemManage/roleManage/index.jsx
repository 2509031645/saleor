/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/20
*/
// @flow
import React, {Component} from 'react';
import FormGenerator from '@/components/form/formGenerator';
import FormScheme from '@/components/form/formScheme';
import {Button, Table, Divider, Modal, message} from 'antd';
import AddRole from './addRole';
import Api from "@/common/api";
import AddMenu from "@/back_end/systemManage/menuManage/addMenu";

type Props = {
    search(): void,
    tableConfig(): any,
    role_list: Array<any>
}
type State = {
    fieldList: Array<Object>,
    modalInfo: any
}

class RoleManage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            fieldList: [
                {
                    filedName: '关键字',
                    paramName: 'keywords',
                    type: 'input',
                    attr: {
                        placeholder: '角色名/编码',
                        onKeyDown: e => {
                            e.nativeEvent.keyCode === 13 && props.search('sys_get_role_list')
                        }
                    }
                }
            ],
            modalInfo: {
                visible:false,
                title:'',
                attr: {
                    type:'' // add or edit
                }
            }
        };
    }

    searchForm = null;
    addFormIns = null;

    onFormInit = (form: any) => {
        this.searchForm = form;
    };

    formatFields = fieldList => fieldList;

    componentDidMount(): * {

        //return super.componentDidMount();
    }

    componentDidCatch(error, info) {
        debugger;
    }

    columns = [
        {
            title: '角色名',
            dataIndex: 'name',
            key: 'name',
            width:150
        },
        {
            title: '编码',
            dataIndex: 'code',
            key: 'code',
            width:150
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            key: 'enabled',
            width:150,
            render: text => <span>{text ? '可用' : '禁用'}</span>
        },
        {
            title: '顺序',
            dataIndex: 'orderIndex',
            key: 'orderIndex',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width:200,
            render: (text, record) => (<div>
                <a onClick={() => this.openEditModal(record)}>编辑角色</a>
                <Divider type="vertical"/>
                <a onClick={() => this.props.history.push('/BE/systemManage/authManage',{
                    role_data:record
                })}>编辑权限</a>
            </div>)
        },
    ];

    openAddModal = () => {
        this.setState(val => ({
            modalInfo:{
                ...val.modalInfo,
                visible: true,
                title: '添加用户',
                attr: {
                    type: 'add'
                }
            }
        }))
    };

    openEditModal = (data:Object) => {
        this.setState(val => ({
            modalInfo:{
                ...val.modalInfo,
                visible: true,
                title: '添加用户',
                attr: {
                    data,
                    type: 'edit'
                }
            }
        }))
    };

    modalConfirm = () => {
        this.addFormIns.searchForm.validateFields((errList, fieldList) => {
            if (!errList) {
                const {enabled, code, ...resFields} = fieldList;
                const {type,data} = this.state.modalInfo.attr;
                let param = {
                    ...resFields,
                    enabled: enabled ? 1 : 0,
                    code: 'ROLE_' + code
                };
                let apiKey = 'addRole';

                if(type === 'edit'){
                    param.id = data.id;
                    apiKey = 'editRole'
                }
                Api.system[apiKey](param).then(res => {
                    if (res.data.status === 'success') {
                        message.success(res.data.msg);
                        this.props.search();
                        this.modalCancel()
                    }
                }).finally(() => {
                })
            }
        });
    };

    modalCancel = () => {
        this.setState(val => ({
            modalInfo:{
                ...val.modalInfo,
                visible: false
            }
        }))
    };

    render() {
        const { fieldList, modalInfo:{title,visible,attr} } = this.state;
        const {search, role_list, tableConfig} = this.props;
        return (
            <div>
                <FormGenerator fieldList={fieldList} onFormInit={this.onFormInit}/>
                <div className="btn-container">
                    <Button type={'primary'} onClick={() => {
                        search('sys_get_role_list')
                    }}>查询</Button>
                    <Button style={{marginLeft: 20}} onClick={this.openAddModal}>添加角色</Button>
                </div>
                <div className="table-container">
                    <Table {...tableConfig(['rowSelection'], {
                        list: role_list.list,
                        total: role_list.total,
                        loading: role_list.loading
                    })} columns={this.columns}/>
                </div>

                <Modal
                    title={title}
                    visible={visible}
                    onOk={this.modalConfirm}
                    onCancel={this.modalCancel}
                    destroyOnClose={true}
                >
                    <AddRole role_list={role_list} {...attr} ref={ins => this.addFormIns = ins} />
                </Modal>
            </div>
        )
    }
}

export default FormScheme({
    stateKeys: ['role_list'],
    actionKeys: ['sys_get_role_list']
})(RoleManage);
