/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/20
*/
// @flow
import React, {Component} from 'react';
import {Table, message, Button} from 'antd';
import Api from "@/common/api";
import {connect } from 'react-redux';

type Props = {
    auth_list: Array<any>
}
type State = {
}

class RoleManage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount(): * {
        this.props.sys_get_auth_list({
            roleId: this.props.history.location.state.role_data.id
        });
        this.props.sys_get_menu_list()
        // return super.componentWillMount();
    }

    componentDidCatch(error, info) {
        debugger;
    }

    columns = [
        {
            title: '菜单名称',
            dataIndex: 'name',
            key: 'name',
            width: 200
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            key: 'enabled',
            render: text => <span>{text ? '可用' : '禁用'}</span>
        }
    ];

    saveAuth = () => {
        Api.system.editMenuAuth({
            roleId: this.props.history.location.state.role_data.id,
            menuIds: this.props.auth_list.list.join(',')
        }).then(res => {
            if(res.data.status === 'success'){
                message.success(res.data.msg);
                this.props.history.goBack();
            }
        })
    };

    selectRelation = (id,selected,selectedRowKeys) => {
        let calcKeys = [];
        let getIdFromList = (ids,pid) => {
            ids.forEach(item => {
                if(item.id === id){
                    if(item.children && item.children.length){
                        calcKeys = selectedRowKeys;
                        // selected ? calcKeys = Array.from(new Set(selectedRowKeys.concat(getAllSubId(item.children)))) : calcKeys = arrayMinus(selectedRowKeys,getAllSubId(item.children));
                        !selected && (calcKeys = arrayMinus(selectedRowKeys,getAllSubId(item.children)));
                    }else{
                        calcKeys = selectedRowKeys;
                        // isCheckAll(ids) ? calcKeys.push(pid) : (pid && calcKeys.indexOf(pid) > -1 && calcKeys.splice(calcKeys.indexOf(pid),1));
                        isCheckAll(ids) && calcKeys.push(pid);
                    }
                }
                if(item.children && item.children.length){
                    getIdFromList(item.children,item.id)
                }
            })
        };

        let getAllSubId = (menuArr) => {
            return menuArr.map(item => {
                if(item.children && item.children.length){
                    return getAllSubId(item.children)
                }else{
                    return item.id
                }
            })
        };

        let isCheckAll = (menuArr) => {
            // return selected ? menuArr.length === selectedRowKeys.filter(item => menuArr.map(itemIn => itemIn.id).indexOf(item) > -1).length : false
            return selected;
        };

        let arrayMinus = (arr1,arr2) => {
            let arr = [];
            arr1.forEach((item) => {
                if(arr2.indexOf(item) === -1){
                    arr.push(item)
                }
            });
            return arr;
        };

        getIdFromList(this.props.menu_list.list);

        return calcKeys;

    };

    render() {
        const { auth_list, menu_list} = this.props;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                //this.props.set_auth_list(selectedRowKeys);
            },
            onSelect: (record, selected, selectedRows, nativeEvent) => {
                this.props.set_auth_list(this.selectRelation(record.id,selected,selectedRows.map(item => item.id)));
            },
            selectedRowKeys: auth_list.list,
        };
        return (
            <div>
                <div className="btn-container">
                    <Button onClick={() => {
                        this.props.history.goBack();
                    }}>返回</Button>
                    <Button type={'primary'} style={{marginLeft: 20}} onClick={this.saveAuth}>保存</Button>
                </div>
                <div className="table-container">
                    <Table
                        dataSource={menu_list.list}
                        rowKey={'id'}
                        columns={this.columns}
                        rowSelection={rowSelection}
                        key={menu_list.list.length}
                        defaultExpandAllRows
                        loading={menu_list.loading}
                        scroll={{y: 580}}
                        size={'small'}
                        pagination={false}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps: any = state => ({
    auth_list: state.auth_list,
    menu_list: state.menu_list
});

const mapDispatchToProps: any = dispatch => ({
    sys_get_auth_list: param => {
        dispatch({
            type: 'sys_get_auth_list',
            payload: param
        })
    },
    set_auth_list: list => {
        dispatch({
            type: 'set_auth_list',
            payload: list
        })
    },
    sys_get_menu_list: () => {
        dispatch({
            type: 'sys_get_menu_list',
        })
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(RoleManage);
