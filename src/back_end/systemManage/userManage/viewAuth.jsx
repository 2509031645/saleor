/*
*   fileName: viewAuth
*   author: 宋均辉
*   time: 2019/9/5
*/
// @flow

import * as React from 'react';
import Api from '@/common/api';
import {Table} from "antd";

type Props = {
    data: Object
}
type State = {
    menuList: Array<Object>
}

class ViewAuth extends React.Component<Props,State> {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            loading: false
        }
    }

    async componentWillMount(): * {
        this.setState({
            loading: true
        });
        let res = await Api.common.getMenuByUserId({userId: this.props.data.id});
        if (res.data.status === 'success') {
            this.setState({
                menuList: res.data.data.dataInfo
            })
        }
        this.setState({
            loading: false
        });
        // return super.componentWillMount();
    }

    columns = [
        {
            title: '菜单名',
            dataIndex: 'name',
            key: 'name'
        }
    ];

    render() {
        const {menuList, loading} = this.state;
        console.log(menuList);
        return (
            <div>
                <Table
                    dataSource={menuList}
                    columns={this.columns}
                    rowKey={'id'}
                    key={menuList.length}
                    scroll={{y: 650}}
                    defaultExpandAllRows
                    pagination={false}
                    size={'small'}
                    loading={loading}
                />
            </div>
        )
    }
}


export default ViewAuth;