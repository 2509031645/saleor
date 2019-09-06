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
import AddUser from './addUser';
import EditRole from './editRole';
import ViewAuth from './viewAuth';
import Api from "@/common/api";

type Props = {
    search(): void,
    tableConfig(): any,
    user_list: Array<any>,
    get_valid_user(): any, // 获取推荐人列表
    valid_user_list: any
}
type State = {
    fieldList: Array<Object>,
    modalInfo: any
}

class UserList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            fieldList: [
                {
                    filedName: '关键字',
                    paramName: 'keywords',
                    type: 'input',
                    attr: {
                        placeholder: '姓名/用户名/邮箱/手机号',
                        style: {
                            width: 200
                        },
                        onKeyDown: e => {
                            e.nativeEvent.keyCode === 13 && props.search('sys_get_user_list')
                        }
                    }
                }
            ],
            modalInfo: {
                visible: false,
                title: '',
                attr: {
                    type: '' // add or editUser editRole
                }
            },
            selRoles: []
        };
    }

    searchForm = null;
    addFormIns = null;
    editRoleFormIns = null;

    onFormInit = (form: any) => {
        this.searchForm = form;
    };

    formatFields = fieldList => fieldList;

    componentDidMount(): * {
        this.props.get_valid_user();
        //return super.componentDidMount();
    }

    componentDidCatch(error, info) {
    debugger;
    }

    columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            width: 150
        },
        {
            title: '中文名',
            dataIndex: 'name',
            key: 'name',
            width: 150
        },
        {
            title: '手机',
            dataIndex: 'telephone',
            key: 'phone',
            width: 150
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            width: 180
        },
        {
            title: '权限',
            dataIndex: 'roleName',
            key: 'roleName',
            width: 300
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            key: 'enabled',
            width: 150,
            render: text => <span>{text ? '可用' : '禁用'}</span>
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 250,
            fixed: 'right',
            render: (text, record) => (<div>
                <a onClick={() => this.openEditUserModal(record)}>编辑用户</a>
                <Divider type="vertical"/>
                <a onClick={() => this.openEditRoleModal(record)}>编辑角色</a>
                <Divider type="vertical"/>
                <a onClick={() => this.openViewAuthModal(record)}>查看权限</a>
            </div>)
        },
    ];

    openAddModal = () => {
        this.setState(val => ({
            modalInfo: {
                ...val.modalInfo,
                visible: true,
                title: '添加用户',
                attr: {
                    type: 'add'
                }
            }
        }))
    };

    openEditUserModal = (data: string) => {
        this.setState(val => ({
            modalInfo: {
                ...val.modalInfo,
                visible: true,
                title: '编辑用户',
                attr: {
                    data,
                    type: 'editUser'
                }
            }
        }))
    };
    openEditRoleModal = (data: string) => {
        this.setState(val => ({
            modalInfo: {
                ...val.modalInfo,
                visible: true,
                title: '添加角色',
                attr: {
                    data,
                    type: 'editRole'
                }
            }
        }))
    };

    openViewAuthModal = (data) => {
        this.setState(val => ({
            modalInfo: {
                ...val.modalInfo,
                visible: true,
                title: '查看权限',
                attr: {
                    data,
                    type: 'viewAuth'
                },
                config: {
                    footer:[]
                }
            }
        }))
    };

    modalConfirm = () => {
        if (this.state.modalInfo.attr.type === 'editRole') {
            Api.system.editRoleById({
                userId: this.state.modalInfo.attr.data.id,
                roleIds: this.state.selRoles.join(',')
            }).then(res => {
                if (res.data.status === 'success') {
                    message.success(res.data.msg);
                    this.modalCancel();
                    this.props.search();
                }
            })

        } else {
            this.addFormIns.searchForm.validateFields((errList, fieldList) => {
                if (!errList) {
                    const {...resFields} = fieldList;
                    const {type, data} = this.state.modalInfo.attr;
                    let param = {
                        ...resFields,
                    };
                    let apiKey = 'addUser';

                    if (type === 'editUser') {
                        param.id = data.id;
                        apiKey = 'editUser'
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
        }

    };

    getSelectedRoles = selRoles => {
        this.setState({
            selRoles
        });
    };

    modalCancel = () => {
        this.setState(val => ({
            modalInfo: {
                ...val.modalInfo,
                visible: false
            }
        }))
    };

    render() {
        const {fieldList, modalInfo: {title, visible, attr, config}} = this.state;
        const {search, user_list, tableConfig, valid_user_list} = this.props;
        return (
            <div>
                <FormGenerator fieldList={fieldList} onFormInit={this.onFormInit}/>
                <div className="btn-container">
                    <Button type={'primary'} onClick={() => {
                        search('sys_get_user_list')
                    }}>查询</Button>
                    <Button style={{marginLeft: 20}} onClick={this.openAddModal}>添加用户</Button>
                </div>
                <div className="table-container">
                    <Table {...tableConfig(['rowSelection'], {
                        list: user_list.list,
                        total: user_list.total,
                        loading: user_list.loading
                    })} scroll={{x: 1600, y: 580}} columns={this.columns}/>
                </div>

                <Modal
                    title={title}
                    visible={visible}
                    onOk={this.modalConfirm}
                    onCancel={this.modalCancel}
                    destroyOnClose={true}
                    {...config}
                >
                    {
                        attr.type === 'editRole' ? <EditRole {...attr} getSelectedRoles={this.getSelectedRoles}/> :
                            ['add', 'editUser'].indexOf(attr.type) > -1 ? <AddUser valid_user_list={valid_user_list} {...attr} ref={ins => this.addFormIns = ins}/> :
                                <ViewAuth {...attr} />
                    }
                </Modal>
            </div>
        )
    }
}

export default FormScheme({
    stateKeys: ['user_list', 'valid_user_list'],
    actionKeys: ['sys_get_user_list', 'get_valid_user']
})(UserList);
