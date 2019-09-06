/*
*   fileName: addUser
*   author: 宋均辉
*   time: 2019/8/29
*/
// @flow
import * as React from 'react';
import FromGenerator from '@/components/form/formGenerator';

type Props = {
    type: string,
    data?: Object,
    valid_user_list: any
}

class AddUser extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            fieldList: [
                {
                    filedName: '中文名',
                    paramName: 'name',
                    type: 'input',
                    initialValue: props.data && props.data.name,
                    rules: [
                        {
                            required: true
                        }
                    ],
                    span: 20
                },
                {
                    filedName: '用户名',
                    paramName: 'username',
                    type: 'input',
                    initialValue: props.data && props.data.username,
                    rules: [
                        {
                            required: true
                        }
                    ],
                    attr: {
                        disabled: props.type !== 'add'
                    },
                    span: 20
                },
                props.type === 'add' && {
                    filedName: '密码',
                    paramName: 'password',
                    type: 'input',
                    rules: [
                        {
                            required: true
                        }
                    ],
                    span: 20
                },
                {
                    filedName: '手机',
                    paramName: 'telephone',
                    type: 'input',
                    initialValue: props.data && props.data.telephone,

                    span: 20
                },
                {
                    filedName: '电话',
                    paramName: 'phone',
                    type: 'input',
                    initialValue: props.data && props.data.phone,
                    span: 20
                },
                {
                    filedName: '邮箱',
                    paramName: 'email',
                    type: 'input',
                    initialValue: props.data && props.data.email,
                    span: 20
                },
                {
                    filedName: '地址',
                    paramName: 'address',
                    type: 'input',
                    initialValue: props.data && props.data.address,
                    span: 20
                },
                {
                    filedName: '备注',
                    paramName: 'remark',
                    type: 'input',
                    initialValue: props.data && props.data.remark,
                    span: 20
                },
                {
                    filedName: '推荐人',
                    paramName: 'recommenderid',
                    type: 'select',
                    option: props.valid_user_list.list.map(item => ({key: item.name, value: item.id})),
                    initialValue: props.data && props.data.recommenderid,
                    span: 20
                },
                {
                    filedName: '可登陆端',
                    paramName: 'pagetype',
                    type: 'select',
                    option: [
                        {
                            key:'前端',
                            value:1
                        },
                        {
                            key:'后端',
                            value:2
                        },
                        {
                            key:'全部',
                            value:3
                        }
                    ],
                    initialValue: props.data ? props.data.pagetype : 1,
                    span: 20
                },
                {
                    filedName: '状态',
                    paramName: 'enabled',
                    type: 'switch',
                    initialValue: props.data ? props.data.enabled : true,
                    span: 20
                },

            ]
        }
    }

    searchForm = null;

    onFormInit = form => {
        this.searchForm = form;
    };

    formatOption = data => {
        data.forEach(item => {
            item.title = item.name;
            item.value = item.id;
            item.key = item.name;
            item.children && item.children.length && this.formatOption(item.children)
        });
        return data;
    };

    render() {
        const {fieldList} = this.state;
        return (<div style={{paddingRight: 50}}>
            <FromGenerator fieldList={fieldList} formConfig={{layout: 'Horizontal'}} onFormInit={this.onFormInit}/>
        </div>)
    }
}

export default AddUser;


