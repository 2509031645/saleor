/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/20
*/
// @flow
import React, {Component} from 'react';
import FormGenerator from '@/components/form/formGenerator';
import FormScheme from '@/components/form/formScheme';
import {Button, Table, Divider, Modal, message, Switch} from 'antd';
import AddMenu from './addMenu';
import style from './index.module.scss';
import Api from '@/common/api';

type Props = {
    search(): void,
    tableConfig(): any,
    user_menu_list: Array<any>
}
type State = {
    fieldList: Array<Object>,
    modalInfo: any
}

class MenuList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            fieldList: [
                /*{
                    filedName: '用户名',
                    paramName: 'username',
                    type: 'input'
                },
                {
                    filedName: '姓名',
                    paramName: 'name',
                    type: 'input'
                },
                {
                    filedName: '邮箱',
                    paramName: 'email',
                    type: 'input'
                }*/
            ],
            modalInfo: {
                visible: false,
                title: '',
                attr: {
                    type: '' // add or edit
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
            title: '菜单名',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            key: 'enabled',
            width: 100,
            render: text => <span>{text ? '可用' : '禁用'}</span>
        },
        {
            title: '状态',
            dataIndex: 'pagetype',
            key: 'pagetype',
            width: 100,
            render: text => <span>{text === 1 ? '前台' : text === 2 ? '后台' : '全部'}</span>
        },
        {
            title: '前台路由',
            dataIndex: 'frontPath',
            key: 'frontPath',
            width: 250
        },
        {
            title: '前台组件',
            dataIndex: 'frontCom',
            key: 'frontCom',
            width: 250
        },
        {
            title: '前台图标',
            dataIndex: 'frontIcon',
            key: 'frontIcon',
            width: 100
        },
        {
            title: '后台路由',
            dataIndex: 'path',
            key: 'path',
            width: 250
        },
        {
            title: '后台组件',
            dataIndex: 'component',
            key: 'component',
            width: 250
        },
        {
            title: '后台图标',
            dataIndex: 'iconCls',
            key: 'iconCls',
            width: 100
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 200,
            fixed: 'right',
            render: (text, record) => (<div>
                <a onClick={() => this.openEditModal(record)}>编辑菜单</a>
                {record.preId && <>
                    <Divider type="vertical"/>
                    <a className={style.red}
                       onClick={() => this.changeMenuIndex({id1: record.preId, id2: record.id})}>↑</a>
                </>}
                {record.nextId && <>
                    <Divider type="vertical"/>
                    <a className={style.red}
                       onClick={() => this.changeMenuIndex({id1: record.nextId, id2: record.id})}>↓</a>
                </>}
            </div>)
        },
    ];

    changeMenuIndex = async param => {
        let res = await Api.system.changeMenuIndex(param);
        if (res.data.status === 'success') {
            this.props.search()
        }
    };

    openAddModal = () => {
        this.setState(val => ({
            modalInfo: {
                ...val.modalInfo,
                visible: true,
                title: '添加菜单',
                attr: {
                    type: 'add'
                }
            }
        }))
    };

    openEditModal = (data: Object) => {
        this.setState(val => ({
            modalInfo: {
                ...val.modalInfo,
                visible: true,
                title: '编辑菜单',
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
                const {...resFields} = fieldList;
                const {type, data} = this.state.modalInfo.attr;
                let param = {
                    ...resFields
                };
                let apiKey = 'addMenu';

                if (type === 'edit') {
                    param.id = data.id;
                    apiKey = 'editMenu'
                }
                Api.system[apiKey](param).then(res => {
                    if (res.data.status === 'success') {
                        message.success(res.data.msg);
                        this.props.search('sys_get_menu_list');
                        this.modalCancel();
                    }
                }).finally(() => {
                })
            }
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

    operateMenuData = menuList => {
        let len = menuList.length;
        let index = 0;
        for (; index < len; index++) {
            switch (index) {
                case 0:
                    menuList[index].preId = '';
                    menuList[index].nextId = len > 1 ? menuList[index + 1].id : '';
                    break;
                case len - 1:
                    menuList[index].preId = len > 1 ? menuList[index - 1].id : '';
                    menuList[index].nextId = '';
                    break;
                default :
                    menuList[index].preId = len > 1 ? menuList[index - 1].id : '';
                    menuList[index].nextId = len > 1 ? menuList[index + 1].id : '';
            }
            menuList[index].children && menuList[index].children.length && this.operateMenuData(menuList[index].children);
        }
        return menuList;
    };

    render() {
        const {fieldList, modalInfo: {title, visible, attr}} = this.state;
        const {search, menu_list, tableConfig} = this.props;
        return (
            <div>
                <FormGenerator fieldList={fieldList} onFormInit={this.onFormInit}/>
                <div className="btn-container">
                    <Button type={'primary'} onClick={() => {
                        search('sys_get_menu_list')
                    }}>查询</Button>
                    <Button style={{marginLeft: 20}} onClick={this.openAddModal}>添加菜单</Button>
                </div>
                <div className="table-container">
                    <Table {...tableConfig(['rowSelection', 'pagination'], {
                        list: this.operateMenuData(menu_list.list),
                        total: menu_list.total,
                        loading: menu_list.loading
                    })}
                           columns={this.columns}
                           rowKey={'id'}
                           key={menu_list.list.length}
                           scroll={{x: 1800, y: 650}}
                           defaultExpandAllRows
                    />
                </div>

                <Modal
                    title={title}
                    visible={visible}
                    onOk={this.modalConfirm}
                    onCancel={this.modalCancel}
                    destroyOnClose={true}
                >
                    <AddMenu menu_list={menu_list} {...attr} ref={ins => this.addFormIns = ins}/>
                </Modal>
            </div>
        )
    }
}

export default FormScheme({
    stateKeys: ['menu_list'],
    actionKeys: ['sys_get_menu_list']
})(MenuList);
