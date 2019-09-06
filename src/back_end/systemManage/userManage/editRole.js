/*
*   fileName: editRole
*   author: 宋均辉
*   time: 2019/9/3
*/
// @flow
import * as React from 'react';
import FormScheme from "@/components/form/formScheme";
import {Table} from "antd";

class EditRole extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    componentWillMount(): * {
        this.props.get_role_by_id({userId: this.props.data.id});
        this.props.search('get_available_role_list')
        //return super.componentWillMount();
    }

    formatFields = () => ({});

    columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            key: 'enabled',
            render: text => <span>{text ? '可用' : '禁用'}</span>
        }
    ];

    render(){
        const {tableConfig, available_role_list, selectedRowKeys, user_role_list} = this.props;
        this.props.getSelectedRoles(selectedRowKeys);
        return (
            <div>
                <Table {...tableConfig([], {
                    list: available_role_list.list,
                    total: available_role_list.length,
                    rowSelection: {
                        defaultSelectedKeys:user_role_list.list
                    }
                })} columns={this.columns}/>
            </div>
        )
    }
}

export default FormScheme({stateKeys:['available_role_list','user_role_list'],actionKeys:['get_available_role_list','get_role_by_id']})(EditRole);